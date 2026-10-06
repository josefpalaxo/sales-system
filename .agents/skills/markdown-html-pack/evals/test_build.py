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
import unittest

GENERATOR = Path(__file__).resolve().parent.parent / "scripts/build.py"
PIXEL = base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aL1sAAAAASUVORK5CYII=")


class Inspect(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.ids, self.links, self.assets, self.data, self.scripts = [], [], [], {}, []
        self.current_script = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.append(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag in {"img", "script", "link", "iframe", "video", "audio"}:
            self.assets.extend(attrs[k] for k in ("src", "href") if k in attrs)
        if tag == "script":
            self.scripts.append(attrs)
            self.current_script = attrs.get("id")

    def handle_data(self, data):
        if self.current_script:
            self.data[self.current_script] = self.data.get(self.current_script, "") + data

    def handle_endtag(self, tag):
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

    def test_presentation_and_source_are_not_template_code(self):
        raw = "# Literal\n\n__TITLE__\n</script><script>alert('source')</script>\n"
        self.source("source.md", raw)
        self.run_build("--title", '</title><script>alert("title")</script>')
        inspected = Inspect(self.output.read_text())
        self.assertEqual(len(inspected.scripts), 3)
        self.assertEqual(next(iter(json.loads(inspected.data["source-data"]).values()))["markdown"], raw)


if __name__ == "__main__":
    unittest.main(verbosity=2)
