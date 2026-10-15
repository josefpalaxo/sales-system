#!/usr/bin/env python3
"""Observable conversion checks using temporary sources; requires local Pandoc."""

import base64
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import sys
from tempfile import TemporaryDirectory
from urllib.parse import unquote, urlsplit
import unittest
import re
import xml.etree.ElementTree as ET

GENERATOR = Path(__file__).resolve().parent.parent / "scripts/build.py"
PIXEL = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII=")


class Inspect(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.ids, self.links, self.assets, self.data, self.scripts = [], [], [], {}, []
        self.wordmarks = []
        self.folders, self.folder_stack, self.link_folders = [], [], {}
        self.current_script = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))
            if attrs.get("data-document"):
                self.link_folders[attrs["data-document"]] = [p for p in self.folder_stack if p is not None]
        if tag == "details":
            self.folder_stack.append(attrs.get("data-folder"))
            if "data-folder" in attrs:
                self.folders.append(attrs["data-folder"])
        if "wordmark" in attrs.get("class", "").split():
            self.wordmarks.append((tag, attrs))
        if tag in {"img", "script", "link", "iframe", "video", "audio"}:
            self.assets.extend(attrs[k] for k in ("src", "href") if k in attrs)
        if tag == "script":
            self.scripts.append(attrs)
            self.current_script = attrs.get("id")

    def handle_data(self, data):
        if self.current_script:
            self.data[self.current_script] = self.data.get(self.current_script, "") + data

    def handle_endtag(self, tag):
        if tag == "details":
            self.folder_stack.pop()
        if tag == "script":
            self.current_script = None


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = TemporaryDirectory()
        self.root = Path(self.temp.name) / "example"
        self.root.mkdir()
        self.output = Path(self.temp.name) / "reader.html"

    def tearDown(self):
        self.temp.cleanup()

    def source(self, name, content):
        path = self.root / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(content.encode("utf-8") if isinstance(content, str) else content)
        return path

    def run_build(self, *arguments, inputs=None, success=True):
        result = subprocess.run([sys.executable, str(GENERATOR), *(inputs or [str(self.root)]), "--output", str(self.output), *arguments], capture_output=True, text=True)
        self.assertEqual(result.returncode == 0, success, result.stdout + result.stderr)
        return result

    def test_discovery_fidelity_links_and_images(self):
        original = self.source("README.md", "---\r\ntitle: Example résumé\r\nstatus: draft\r\nclassification: internal\r\nevidence_state: contradicted\r\nreview_due: '2026-10-01'\r\n---\r\n# Example\r\n\r\n[First](a/topic.md#details) [Second](b/topic.md#details) [Excluded](private/notes.md) [Missing](a/topic.md#absent)\r\n\r\n![Pixel](images/pixel.png) ![Remote](https://example.com/image.png) ![Omitted](images/private.png) ![Outside](images/outside.png)\r\n\r\n<script>window.sourceRan=true</script>\r\n[Unsafe](javascript:alert%281%29)\r\n\r\n</script>\r\n")
        first = self.source("a/topic.md", "# First\n\n## Details\n\n[Guide](../README.md)\n")
        second = self.source("b/topic.md", "---\nstatus: reviewed\nclassification: confidential\n---\n# Second\n\n## Details\n")
        self.source("private/notes.md", "PRIVATE-SOURCE-MARKER")
        self.source("node_modules/dependency/readme.md", "DEPENDENCY-MARKER")
        self.source("images/pixel.png", PIXEL)
        self.source("images/private.png", PIXEL + b"EXCLUDED-ASSET-MARKER")
        external = Path(self.temp.name) / "external.png"
        external.write_bytes(PIXEL + b"EXTERNAL-ASSET-MARKER")
        (self.root / "images/outside.png").symlink_to(external)
        before = {p: p.read_bytes() for p in (original, first, second)}
        result = self.run_build("--exclude", "private/**", "--exclude", "images/private.png")
        html = self.output.read_text(encoding="utf-8")
        inspected = Inspect(html)
        sources = json.loads(inspected.data["source-data"])
        self.assertEqual(len(sources), 3)
        by_name = {source["name"]: (identifier, source) for identifier, source in sources.items()}
        for path, raw in before.items():
            self.assertEqual(path.read_bytes(), raw)
            source = by_name[path.relative_to(self.root).as_posix()][1]
            self.assertEqual(source["markdown"].encode("utf-8"), raw)
            self.assertEqual(source["sha256"], sha256(raw).hexdigest())
        self.assertEqual(by_name["README.md"][1]["label"], "Example résumé")
        self.assertEqual(by_name["README.md"][1]["status"], "draft · internal · contradicted · Review: 2026-10-01")
        self.assertEqual(by_name["b/topic.md"][1]["status"], "reviewed · confidential")
        self.assertNotEqual(by_name["a/topic.md"][0], by_name["b/topic.md"][0])
        for name in ("a/topic.md", "b/topic.md"):
            self.assertIn("#" + by_name[name][0] + "--details", inspected.links)
        self.assertIn("#" + by_name["README.md"][0], inspected.links)
        self.assertEqual(len(inspected.ids), len(set(inspected.ids)))
        for link in inspected.links:
            if link.startswith("#"):
                self.assertIn(link[1:], inspected.ids)
        self.assertTrue(all(asset.startswith("data:image/") for asset in inspected.assets))
        self.assertEqual(len(inspected.assets), 1)
        self.assertEqual(base64.b64decode(inspected.assets[0].split(",", 1)[1]), PIXEL)
        self.assertFalse(any(link.startswith("javascript:") for link in inspected.links))
        self.assertEqual(len(inspected.scripts), 3)  # Two inert data blocks and reader code.
        for marker in ("PRIVATE-SOURCE-MARKER", "DEPENDENCY-MARKER", "Circularo"):
            self.assertNotIn(marker, html)
        self.assertIn("https://example.com/image.png", result.stdout)
        self.assertIn("outside.png", result.stdout)

    def test_config_drift_and_output_guard(self):
        self.source("one.md", "# One\n")
        config = Path(self.temp.name) / "config.json"
        config.write_text(json.dumps({"title": "Sample", "groups": [{"label": "Read", "documents": [{"path": "one.md", "id": "doc-one"}]}]}))
        self.output.write_text("existing unrelated artifact")
        self.run_build("--config", str(config), success=False)
        self.assertEqual(self.output.read_text(), "existing unrelated artifact")
        self.run_build("--config", str(config), "--force")
        first_output = self.output.read_bytes()
        self.source("new.md", "# Newly added\n")
        result = self.run_build("--config", str(config), success=False)
        self.assertIn("unaccounted files", result.stderr)
        self.assertEqual(self.output.read_bytes(), first_output)
        self.run_build("--config", str(config), "--exclude", "new.md")

    def test_selected_files_and_include_patterns(self):
        first = self.source("intro.md", "A document without a heading.\n")
        second = self.source("nested/other.md", "# Other\n")
        self.source("not-selected.md", "DO-NOT-SELECT-MARKER")
        self.run_build(inputs=[str(first), str(second)])
        inspected = Inspect(self.output.read_text())
        sources = json.loads(inspected.data["source-data"])
        self.assertEqual(len(sources), 2)
        self.assertEqual({s["label"] for s in sources.values()}, {"intro", "Other"})
        self.assertEqual({s["status"] for s in sources.values()}, {""})
        self.run_build("--include", "**/other.md", "--title", "Chosen", "--brand", "Example")
        inspected = Inspect(self.output.read_text())
        self.assertEqual(len(json.loads(inspected.data["source-data"])), 1)
        self.assertEqual(json.loads(inspected.data["pack-settings"])["title"], "Chosen")

    def test_folder_navigation_and_group_override(self):
        self.source("README.md", "# Home\n\n[Deep](company/nested/brief.md)\n")
        self.source("company/README.md", "# Company\n")
        self.source("company/nested/brief.md", "# Nested brief\n\nUniqueNavigatorTerm\n")
        self.source("product/README.md", "# Product\n")
        self.source("private/notes.md", "Excluded\n")
        self.run_build("--exclude", "private/**", "--brand", "Example")
        inspected = Inspect(self.output.read_text())
        self.assertEqual(set(inspected.folders), {".", "company", "company/nested", "product"})
        sources = json.loads(inspected.data["source-data"])
        nested = next(id for id, s in sources.items() if s["name"] == "company/nested/brief.md")
        self.assertEqual(inspected.link_folders[nested], ["company", "company/nested"])
        home = next(id for id, s in sources.items() if s["name"] == "README.md")
        self.assertEqual(inspected.link_folders[home], ["."])
        browser_check = GENERATOR.parent.parent / "evals/check_navigation.mjs"
        result = subprocess.run(["node", str(browser_check), str(self.output)], capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        config = Path(self.temp.name) / "config.json"
        settings = {"groups": [{"label": "Curated", "documents": [{"path": source["name"]} for source in sources.values()]}]}
        config.write_text(json.dumps(settings))
        self.run_build("--config", str(config), "--exclude", "private/**")
        inspected = Inspect(self.output.read_text())
        self.assertEqual(inspected.folders, [])
        self.assertIn('<summary>Curated</summary>', self.output.read_text())
        settings["navigation"] = "folders"
        config.write_text(json.dumps(settings))
        self.run_build("--config", str(config), "--exclude", "private/**")
        self.assertEqual(set(Inspect(self.output.read_text()).folders), {".", "company", "company/nested", "product"})
        settings["navigation"] = "invalid"
        config.write_text(json.dumps(settings))
        before = self.output.read_bytes()
        self.run_build("--config", str(config), "--exclude", "private/**", success=False)
        self.assertEqual(self.output.read_bytes(), before)

    def test_brand_home_link_is_portable_and_optional(self):
        self.source("README.md", "# Home\n")
        self.output = Path(self.temp.name) / 'Reader #1 résumé & "notes".html'
        self.run_build("--brand", 'Example & "Team"')
        inspected = Inspect(self.output.read_text())
        self.assertEqual(len(inspected.wordmarks), 1)
        tag, attrs = inspected.wordmarks[0]
        self.assertEqual(tag, "a")
        self.assertEqual(attrs["aria-label"], 'Example & "Team" — Home')
        home = urlsplit(attrs["href"])
        self.assertFalse(home.scheme or home.netloc or home.query or home.fragment)
        self.assertEqual(unquote(home.path), self.output.name)
        self.run_build()
        self.assertEqual(Inspect(self.output.read_text()).wordmarks, [])

    def test_presentation_and_source_are_not_template_code(self):
        raw = "# Literal\n\n__TITLE__\n</script><script>alert('source')</script>\n"
        self.source("source.md", raw)
        self.run_build("--title", '</title><script>alert("title")</script>')
        inspected = Inspect(self.output.read_text())
        self.assertEqual(len(inspected.scripts), 3)
        self.assertEqual(next(iter(json.loads(inspected.data["source-data"]).values()))["markdown"], raw)

    def test_multiple_mermaid_types_links_and_exact_source(self):
        raw = ('\ufeff---\r\nstatus: draft\r\nclassification: confidential\r\n---\r\n'
               '# Diagrams\r\n\r\n[Other](other.md#details)\r\n\r\n'
               '## Ownership\r\n\r\n```mermaid\r\nflowchart TB\r\n'
               'accTitle: Proposed ownership\r\naccDescr: Two owners supply the company.\r\n'
               'A["First owner\\nProposed"] -->|67%| B[Company]\r\n```\r\n\r\n'
               '```mermaid\r\ngraph LR\r\nA[Start] --> B[Finish]\r\n```\r\n\r\n'
               '```mermaid\r\nsequenceDiagram\r\nparticipant A as Seller\r\n'
               'participant B as Buyer\r\nA->>B: Draft offer\r\nB-->>A: Review\r\n```\r\n')
        path = self.source('diagrams.md', raw)
        self.source('other.md', '# Other\n\n## Details\n\n[Back](diagrams.md#ownership)\n')
        self.run_build()
        html = self.output.read_text()
        inspected = Inspect(html)
        sources = json.loads(inspected.data['source-data'])
        source = next(s for s in sources.values() if s['name'] == 'diagrams.md')
        self.assertEqual(source['markdown'].encode('utf-8'), path.read_bytes())
        self.assertEqual(source['sha256'], sha256(path.read_bytes()).hexdigest())
        self.assertEqual(len(inspected.assets), 3)
        all_ids = []
        for asset in inspected.assets:
            self.assertTrue(asset.startswith('data:image/svg+xml;base64,'))
            svg = ET.fromstring(base64.b64decode(asset.split(',', 1)[1]))
            self.assertGreater(float(svg.get('width')), 0)
            self.assertIn('viewBox', svg.attrib)
            svg_ids = [e.get('id') for e in svg.iter() if e.get('id')]
            all_ids.extend(svg_ids)
            for element in svg.iter():
                self.assertNotIn(element.tag.split('}')[-1], {'script', 'foreignObject', 'a', 'image'})
                for value in element.attrib.values():
                    for ref in re.findall(r'url\(#([^)]*)\)', value):
                        self.assertIn(ref, svg_ids)
            self.assertTrue(any(e.tag.endswith('text') for e in svg.iter()))
        self.assertEqual(len(all_ids), len(set(all_ids)))
        self.assertEqual(len(inspected.scripts), 3)
        self.assertEqual(html.count('<summary>Inspect Mermaid source</summary>'), 3)
        self.assertIn('Two owners supply the company.', html)
        self.assertIn('data-diagram-copy', html)
        self.assertNotRegex(html, r'<(?:script|link)[^>]+(?:src|href)=')
        self.assertNotRegex(html, r'@import|url\(https?://')
        for link in inspected.links:
            if link.startswith('#'):
                self.assertIn(link[1:], inspected.ids)

    def test_invalid_mermaid_diagnostics_and_atomic_preservation(self):
        path = self.source('broken.md', '# Working\n')
        self.run_build()
        previous = self.output.read_bytes()
        path.write_text('# Broken\n\n## Diagram\n\n```mermaid\nflowchart TB\nA[unclosed\n```\n')
        result = self.run_build(success=False)
        self.assertIn(str(path), result.stderr)
        self.assertIn('diagram 1 (line 6)', result.stderr)
        self.assertIn('Parse error', result.stderr)
        self.assertEqual(self.output.read_bytes(), previous)
        self.assertEqual(list(self.output.parent.glob('*.tmp')), [])

    def test_mermaid_security_inputs_fail_closed(self):
        self.source('source.md', '# Safe\n')
        self.run_build()
        previous = self.output.read_bytes()
        payloads = [
            '%%{init: {"securityLevel":"loose"}}%%\nflowchart TB\nA-->B',
            '---\nconfig:\n  securityLevel: loose\n---\nflowchart TB\nA-->B',
            'flowchart TB\nA["<img src=https://example.com/pixel>"]',
            'flowchart TB\nA["<script>alert(1)</script>"]',
            'flowchart TB\nA["&lt;img src=x&gt;"]',
            'flowchart TB\nA["#60;img src=x#62;"]',
            'flowchart TB\nA-->B\nclick A "https://example.com"',
            'flowchart TB\nA-->B\nclick A callback',
            'sequenceDiagram\nparticipant A\nlink A: Visit @ https://example.com',
            'flowchart TB\nA-->B\nclassDef default fill:url(https://example.com/pixel)',
            'flowchart TB\nA@{ img: "https://example.com/pixel" }',
            'flowchart TB\nA["javascript:alert(1)"]',
            'pie\n"Unsupported": 10',
        ]
        for payload in payloads:
            with self.subTest(payload=payload):
                self.source('source.md', '# Source\n\n```mermaid\n' + payload + '\n```\n')
                result = self.run_build(success=False)
                self.assertIn('source.md: diagram 1', result.stderr)
                self.assertEqual(self.output.read_bytes(), previous)

    def test_svg_sanitizer_rejects_active_or_remote_output(self):
        sys.path.insert(0, str(GENERATOR.parent))
        from diagrams import sanitize_svg
        payloads = [
            '<script>alert(1)</script>', '<foreignObject><div>HTML</div></foreignObject>',
            '<image href="https://example.com/pixel"/>',
            '<path onload="alert(1)"/>', '<a href="https://example.com">link</a>',
            '<style>@import "https://example.com/font";</style>',
            '<path fill="url(https://example.com/pixel)"/>',
            '<path marker-end="url(#missing)"/>', '<g id="same"/><g id="same"/>',
        ]
        for payload in payloads:
            with self.subTest(payload=payload), self.assertRaises(ValueError):
                sanitize_svg('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">' + payload + '</svg>', 'test')


if __name__ == "__main__":
    unittest.main(verbosity=2)
