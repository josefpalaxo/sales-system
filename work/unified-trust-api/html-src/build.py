#!/usr/bin/env python3
"""Refresh this pack using the repository's reusable Markdown HTML skill."""

from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
REPOSITORY = ROOT.parent.parent
GENERATOR = REPOSITORY / ".agents/skills/markdown-html-pack/scripts/build.py"

if __name__ == "__main__":
    subprocess.run([
        sys.executable, str(GENERATOR), str(ROOT),
        "--config", str(ROOT / "html-src/reader-config.json"),
        "--output", str(ROOT / "unified-trust-api.html"),
        *sys.argv[1:],
    ], check=True)
