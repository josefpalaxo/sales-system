#!/usr/bin/env python3
"""Build one portable Markdown reader. Python standard library + local Pandoc."""

import argparse
import base64
from dataclasses import dataclass
from fnmatch import fnmatchcase
from hashlib import sha256
from html import escape, unescape
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath
import re
import shutil
import subprocess
from urllib.parse import unquote, urlsplit

SKILL = Path(__file__).resolve().parent.parent
MARKER = '<meta name="generator" content="markdown-html-pack">'
SKIP = {".git", ".hg", ".svn", "node_modules", ".venv", "venv", "__pycache__", "dist", "build", ".next"}
IMAGE_TYPES = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp"}


def matches(name, patterns):
    return any(fnmatchcase(name, p) or PurePosixPath(name).match(p)
               or (p.startswith("**/") and fnmatchcase(name, p[3:])) for p in patterns)


def safe_json(value):
    return json.dumps(value, ensure_ascii=False).replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")


def meta_text(value):
    if not value:
        return ""
    kind, content = value.get("t"), value.get("c")
    if kind in {"MetaString", "Str"}:
        return content
    if kind in {"Space", "SoftBreak", "LineBreak"}:
        return " "
    if isinstance(content, list):
        return "".join(meta_text(item) for item in content if isinstance(item, dict)).strip() if kind == "MetaBlocks" else "".join(meta_text(item) for item in content if isinstance(item, dict))
    return ""


def literal_raw_nodes(value):
    """GFM can emit raw HTML even with raw_html disabled; render it as code."""
    if isinstance(value, dict):
        if value.get("t") in {"RawInline", "RawBlock"}:
            kind = "Code" if value["t"] == "RawInline" else "CodeBlock"
            return {"t": kind, "c": [["", [], []], value["c"][1]]}
        return {key: literal_raw_nodes(item) for key, item in value.items()}
    if isinstance(value, list):
        return [literal_raw_nodes(item) for item in value]
    return value


@dataclass
class Document:
    path: Path
    root: Path
    name: str
    identifier: str = ""
    label: str = ""
    description: str = ""
    markdown: str = ""
    raw_html: str = ""
    status: str = ""


def discover(inputs, include, exclude):
    documents = {}
    roots = []
    for supplied in inputs:
        path = Path(supplied).expanduser().resolve(strict=True)
        root = path if path.is_dir() else path.parent
        roots.append(root)
        candidates = sorted(path.rglob("*")) if path.is_dir() else [path]
        for candidate in candidates:
            relative = candidate.relative_to(root).as_posix()
            if not candidate.is_file() or candidate.is_symlink():
                continue
            if any(part in SKIP for part in candidate.relative_to(root).parts[:-1]):
                continue
            if candidate.suffix.lower() not in {".md", ".markdown"}:
                continue
            if (include and not matches(relative, include)) or matches(relative, exclude):
                continue
            resolved = candidate.resolve()
            if not resolved.is_relative_to(root):
                continue
            documents.setdefault(resolved, Document(resolved, root, relative))
    return sorted(documents.values(), key=lambda d: (d.name.lower() != "readme.md", d.name.lower(), str(d.path))), roots


def order_documents(documents, config):
    if not config.get("groups"):
        return [("Documents", documents)]
    by_name = {}
    for doc in documents:
        if doc.name in by_name:
            raise ValueError("Configured groups require unique relative paths across input folders: " + doc.name)
        by_name[doc.name] = doc
    groups, selected = [], set()
    for group in config["groups"]:
        items = []
        for item in group["documents"]:
            name = item["path"]
            if name not in by_name or name in selected:
                raise ValueError("Configured document missing, excluded or duplicated: " + name)
            selected.add(name)
            doc = by_name[name]
            doc.label, doc.description, doc.identifier = item.get("label", ""), item.get("description", ""), item.get("id", "")
            items.append(doc)
        groups.append((group["label"], items))
    missing = set(by_name) - selected
    if missing:
        raise ValueError("Update configured document list; unaccounted files: " + ", ".join(sorted(missing)))
    return groups


class Fragment(HTMLParser):
    def __init__(self, doc, ids, valid_ids, roots, exclude, warnings):
        super().__init__(convert_charrefs=False)
        self.doc, self.ids, self.valid_ids = doc, ids, valid_ids
        self.roots, self.exclude, self.warnings = roots, exclude, warnings
        self.parts, self.anchor_tags = [], []

    def local_target(self, parsed):
        return (self.doc.path.parent / unquote(parsed.path)).resolve()

    def warn(self, reference):
        self.warnings.add(self.doc.name + ": " + reference)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            attrs["id"] = self.doc.identifier + "--" + attrs["id"]
        if tag == "a":
            href = attrs.get("href", "")
            parsed = urlsplit(href)
            mapped_tag = "a"
            if not parsed.scheme and not parsed.netloc:
                target = self.local_target(parsed) if parsed.path else self.doc.path
                identifier = self.ids.get(target)
                if identifier:
                    new_href = identifier + ("--" + unquote(parsed.fragment) if parsed.fragment else "")
                    if new_href in self.valid_ids:
                        attrs["href"] = "#" + new_href
                    else:
                        mapped_tag = "span"
                else:
                    mapped_tag = "span"
            elif parsed.scheme in {"http", "https"}:
                attrs["target"], attrs["rel"] = "_blank", "noopener noreferrer"
            elif parsed.scheme != "mailto":
                mapped_tag = "span"
            if mapped_tag == "span":
                attrs.pop("href", None)
                attrs["class"], attrs["title"] = "omitted-source", "Reference outside this edition or unresolved heading"
                self.warn(href)
            self.anchor_tags.append(mapped_tag)
            tag = mapped_tag
        if tag == "img":
            reference = attrs.get("src", "")
            parsed = urlsplit(reference)
            image_path = self.local_target(parsed)
            allowed = not parsed.scheme and not parsed.netloc and image_path.suffix.lower() in IMAGE_TYPES
            allowed = allowed and any(image_path.is_relative_to(root) and not matches(image_path.relative_to(root).as_posix(), self.exclude) for root in self.roots)
            if allowed and image_path.is_file():
                attrs["src"] = "data:" + IMAGE_TYPES[image_path.suffix.lower()] + ";base64," + base64.b64encode(image_path.read_bytes()).decode("ascii")
            else:
                self.parts.append('<span class="omitted-source" title="Image not embedded">' + escape(attrs.get("alt", "") or reference) + '</span>')
                self.warn(reference)
                return
        if tag == "table":
            self.parts.append('<div class="table-wrap" role="region" aria-label="Scrollable table" tabindex="0">')
        attr_text = "".join(" " + key + ("" if value is None else '="' + escape(value, quote=True) + '"') for key, value in attrs.items())
        self.parts.append("<" + tag + attr_text + ">")

    def handle_endtag(self, tag):
        if tag == "a":
            tag = self.anchor_tags.pop()
        self.parts.append("</" + tag + ">")
        if tag == "table":
            self.parts.append("</div>")

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        self.parts.append(escape(data, quote=False))

    def handle_entityref(self, name):
        self.parts.append("&" + name + ";")

    def handle_charref(self, name):
        self.parts.append("&#" + name + ";")


def build(args):
    config = json.loads(Path(args.config).read_text(encoding="utf-8")) if args.config else {}
    include = config.get("include", []) + args.include
    exclude = config.get("exclude", []) + args.exclude
    documents, roots = discover(args.inputs, include, exclude)
    if not documents:
        raise ValueError("No Markdown documents selected")
    output = Path(args.output).expanduser().resolve()
    if output in {doc.path for doc in documents} or output.suffix.lower() != ".html":
        raise ValueError("Output must be an HTML file distinct from the source files")
    if output.exists() and not args.force and MARKER not in output.read_text(encoding="utf-8")[:1000]:
        raise ValueError("Refusing to replace unrelated output; inspect it and use --force if intended")
    pandoc = shutil.which("pandoc")
    if not pandoc:
        raise ValueError("Local Pandoc is required; the output itself has no runtime dependencies")
    groups = order_documents(documents, config)
    documents = [doc for _, items in groups for doc in items]
    identifiers = set()
    for doc in documents:
        doc.markdown = doc.path.read_bytes().decode("utf-8")
        ast = json.loads(subprocess.run([pandoc, "--from=gfm+yaml_metadata_block-raw_html", "--to=json"], input=doc.markdown, text=True, capture_output=True, check=True).stdout)
        metadata = ast.get("meta", {})
        doc.status = " · ".join(meta_text(metadata.get(key)) for key in ("status", "classification", "evidence_state") if meta_text(metadata.get(key)))
        review = meta_text(metadata.get("review_due")) or meta_text(metadata.get("review_date"))
        if review:
            doc.status += (" · " if doc.status else "") + "Review: " + review
        doc.raw_html = subprocess.run([pandoc, "--from=json", "--to=html5", "--wrap=none"], input=json.dumps(literal_raw_nodes(ast)), text=True, capture_output=True, check=True).stdout
        first_heading = re.search(r"<h[1-6][^>]*>(.*?)</h[1-6]>", doc.raw_html, re.S)
        heading_label = unescape(re.sub(r"<[^>]+>", "", first_heading[1])) if first_heading else ""
        doc.label = doc.label or meta_text(metadata.get("title")) or heading_label or Path(doc.name).stem
        slug = re.sub(r"[^a-z0-9]+", "-", doc.name.lower()).strip("-")[:70]
        doc.identifier = doc.identifier or "doc-" + slug + "-" + sha256(str(doc.path).encode()).hexdigest()[:8]
        if not re.fullmatch(r"[a-zA-Z][a-zA-Z0-9_-]*", doc.identifier) or doc.identifier in identifiers:
            raise ValueError("Document IDs must be unique simple identifiers: " + doc.identifier)
        identifiers.add(doc.identifier)
    ids = {doc.path: doc.identifier for doc in documents}
    valid_ids = set(identifiers)
    for doc in documents:
        valid_ids.update(doc.identifier + "--" + unescape(identifier) for identifier in re.findall(r'\bid="([^"]+)"', doc.raw_html))
    sources, articles, warnings = {}, [], set()
    for doc in documents:
        renderer = Fragment(doc, ids, valid_ids, roots, exclude, warnings)
        renderer.feed(doc.raw_html)
        rendered = "".join(renderer.parts)
        headings = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', rendered, flags=re.S)
        toc = "".join(f'<li><a href="#{identifier}">{title}</a></li>' for identifier, title in headings)
        contents = '<details class="section-contents"><summary>On this page</summary><ul>' + toc + '</ul></details>' if toc else ""
        identifier = doc.identifier
        sources[identifier] = {"name": doc.name, "label": doc.label, "description": doc.description, "status": doc.status, "markdown": doc.markdown, "sha256": sha256(doc.path.read_bytes()).hexdigest()}
        articles.append(f'<article id="{identifier}" class="document" aria-label="{escape(doc.label, quote=True)}" data-label="{escape(doc.label, quote=True)}">'
                        '<div class="document-tools"><span class="document-status">' + escape(doc.status or "Source document") + '</span>'
                        f'<div class="document-actions" data-js><button type="button" data-copy="{identifier}">Copy text</button>'
                        f'<button type="button" data-download="{identifier}">Download Markdown</button></div></div>'
                        + contents + '<div class="doc-body">' + rendered + '</div></article>')
    navigation = []
    for label, items in groups:
        links = "".join(f'<li><a class="document-link" data-document="{doc.identifier}" href="#{doc.identifier}">{escape(doc.label)}</a></li>' for doc in items)
        navigation.append('<section class="nav-group"><h2>' + escape(label) + '</h2><ul>' + links + '</ul></section>')
    title = args.title if args.title is not None else config.get("title", roots[0].name + " — Documents")
    brand = args.brand if args.brand is not None else config.get("brand", "")
    subtitle = args.subtitle if args.subtitle is not None else config.get("subtitle", "Offline document reader")
    edition = config.get("edition", "")
    footer = config.get("footer", "Downloaded Markdown preserves the original text and metadata. Rendering does not change a document's approval or evidence status.")
    notes = [f"{len(documents)} documents. This page works offline; external reference links require a connection."] + config.get("notes", [])
    notes_html = "".join("<p>" + escape(note) + "</p>" for note in notes)
    if exclude:
        notes_html += '<p>Exclusion patterns:</p><ul>' + ''.join('<li>' + escape(pattern) + '</li>' for pattern in exclude) + '</ul>'
    values = {"TITLE": escape(title, quote=True), "DESCRIPTION": escape(subtitle, quote=True), "BRAND": '<span class="wordmark">' + escape(brand) + '</span>' if brand else "",
              "SUBTITLE": escape(subtitle), "COUNT": str(len(documents)), "NOTES": notes_html, "FOOTER": escape(footer),
              "CONTEXT": escape(str(len(documents)) + " documents" + (" · " + edition if edition else "")),
              "NAVIGATION": "".join(navigation), "ARTICLES": "".join(articles), "SOURCE_DATA": safe_json(sources), "SETTINGS": safe_json({"title": title, "edition": edition})}
    template = (SKILL / "assets" / "template.html").read_text(encoding="utf-8")
    result = re.sub(r"__([A-Z_]+)__", lambda match: values[match[1]], template)
    output.parent.mkdir(parents=True, exist_ok=True)
    temporary = output.with_suffix(".html.tmp")
    try:
        temporary.write_text(result, encoding="utf-8")
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    print(f"Built {output}: {len(documents)} documents, {output.stat().st_size:,} bytes. No external assets.")
    if warnings:
        print(f"Marked {len(warnings)} omitted or unresolved references:")
        for warning in sorted(warnings):
            print("  " + warning)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", nargs="+", help="Markdown files or folders (recursive)")
    parser.add_argument("--output", required=True, help="Destination .html file")
    parser.add_argument("--config", help="Optional presentation, ordering and selection JSON")
    for key in ("title", "brand", "subtitle"):
        parser.add_argument("--" + key)
    parser.add_argument("--include", action="append", default=[], help="Select matching relative paths")
    parser.add_argument("--exclude", action="append", default=[], help="Omit matching relative paths/assets")
    parser.add_argument("--force", action="store_true", help="Replace an existing unrelated output")
    args = parser.parse_args()
    try:
        build(args)
    except (ValueError, OSError, subprocess.CalledProcessError, KeyError, TypeError) as error:
        parser.exit(1, "Build failed: " + str(error) + "\n")


if __name__ == "__main__":
    main()
