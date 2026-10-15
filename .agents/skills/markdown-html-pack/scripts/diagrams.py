"""Restricted Mermaid input and inert, self-contained SVG image output."""

import base64
from html import escape
import json
from pathlib import Path
import re
import shutil
import subprocess
import xml.etree.ElementTree as ET

SKILL = Path(__file__).resolve().parent.parent
SVG_NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', SVG_NS)
TAGS = {'svg', 'g', 'defs', 'marker', 'path', 'rect', 'circle', 'ellipse',
        'polygon', 'polyline', 'line', 'text', 'tspan', 'title', 'desc',
        'style', 'clipPath', 'symbol'}


def check_source(source, location):
    """Fail closed before parsing. Deliberately support a small, documented subset."""
    rules = [
        (r'%%\s*\{|^\s*---', 'configuration directives/frontmatter'),
        (r'<\s*[/!a-zA-Z]|&(?:#|[a-zA-Z]+;)|#(?:\d+|x[\da-fA-F]+);', 'HTML labels/entities'),
        (r'\b(?:click|links?|callback|href|classDef|style|image|icon)\b\s', 'links, callbacks, custom styles or assets'),
        (r'\b(?:https?|javascript|data|file|vbscript):|url\s*\(|@import|\\u[0-9a-fA-F]{4}', 'URLs, CSS resources or encoded markup'),
        (r'@\s*\{', 'extended shapes/assets'),
    ]
    for pattern, feature in rules:
        if re.search(pattern, source, re.I | re.M):
            raise ValueError(f'{location}: unsupported Mermaid {feature}')
    meaningful = re.sub(r'^\s*%%[^\n]*', '', source, flags=re.M).lstrip()
    if not re.match(r'(?:flowchart|graph)\s+(?:TB|TD|BT|LR|RL)\b|sequenceDiagram\b', meaningful):
        raise ValueError(f'{location}: supported Mermaid types are flowchart/graph and sequenceDiagram')
    if len(source) > 50000:
        raise ValueError(f'{location}: diagram exceeds 50,000 characters')


def sanitize_svg(svg, prefix):
    """Allow static geometry/text only and isolate every identifier/reference."""
    if '<!DOCTYPE' in svg.upper() or '<!ENTITY' in svg.upper():
        raise ValueError('SVG document declarations are unsupported')
    root = ET.fromstring(svg)
    if root.tag != '{' + SVG_NS + '}svg':
        raise ValueError('Renderer did not return an SVG')
    ids = {}
    for element in root.iter():
        if element.tag not in {'{' + SVG_NS + '}' + tag for tag in TAGS}:
            raise ValueError('Unsupported SVG element: ' + element.tag)
        identifier = element.get('id')
        if identifier:
            if identifier in ids:
                raise ValueError('Duplicate SVG identifier: ' + identifier)
            ids[identifier] = prefix + '-' + identifier

    def rewrite(value):
        if re.search(r'@import|(?:https?|data|file|javascript):|<', value, re.I):
            raise ValueError('Unsafe SVG attribute/style')
        for match in re.finditer(r'url\(\s*[\'"]?([^\s)\'"]+)', value, re.I):
            if not match[1].startswith('#') or match[1][1:] not in ids:
                raise ValueError('Nonlocal or unresolved SVG resource')
        # Match whole IDs, including CSS selectors and marker references.
        return re.sub(r'#([\w-]+)', lambda m: '#' + ids.get(m[1], m[1]), value)

    for element in root.iter():
        for key, value in list(element.attrib.items()):
            if key.lower().startswith('on') or 'href' in key.lower() or key in {'src', 'filter'}:
                raise ValueError('Active SVG attribute: ' + key)
            if key == 'id':
                element.set(key, ids[value])
            elif key in {'aria-labelledby', 'aria-describedby'}:
                if any(item not in ids for item in value.split()):
                    raise ValueError('Unresolved SVG accessibility reference')
                element.set(key, ' '.join(ids[item] for item in value.split()))
            else:
                element.set(key, rewrite(value))
        if element.tag == '{' + SVG_NS + '}style' and element.text:
            element.text = rewrite(element.text)
    viewbox = root.get('viewBox', '').split()
    if len(viewbox) != 4:
        raise ValueError('SVG needs a viewBox')
    width, height = float(viewbox[2]), float(viewbox[3])
    if not (0 < width <= 100000 and 0 < height <= 100000):
        raise ValueError('Invalid SVG dimensions')
    root.set('width', str(width))
    root.set('height', str(height))
    labels = [' '.join(e.itertext()).strip() for e in root.iter()
              if e.tag in {'{' + SVG_NS + '}' + t for t in ('title', 'desc', 'text')}]
    return ET.tostring(root, encoding='utf-8'), width, height, '; '.join(filter(None, labels))


def render(jobs):
    if not jobs:
        return []
    if len(jobs) > 100:
        raise ValueError('Pack exceeds 100 Mermaid diagrams; split the pack')
    node = shutil.which('node')
    if not node or not (SKILL / 'node_modules/mermaid').is_dir():
        raise ValueError('Mermaid needs Node.js 22+, Chrome and skill-local dependencies. Run npm ci --ignore-scripts in ' + str(SKILL))
    try:
        result = subprocess.run([node, str(SKILL / 'scripts/render-mermaid.mjs')],
                                input=json.dumps(jobs), text=True, capture_output=True, timeout=180, check=False)
    except subprocess.TimeoutExpired as error:
        raise ValueError('Mermaid render timed out; output preserved. Diagrams: ' + ', '.join(j['location'] for j in jobs)) from error
    if result.returncode:
        raise ValueError('Mermaid rendering failed: ' + result.stderr.strip())
    images = json.loads(result.stdout)
    if len(images) != len(jobs):
        raise ValueError('Renderer returned an incomplete diagram set')
    figures = []
    for index, (job, svg) in enumerate(zip(jobs, images)):
        try:
            raw, width, height, labels = sanitize_svg(svg, 'diagram-' + str(index))
        except (ValueError, ET.ParseError) as error:
            raise ValueError(job['location'] + ': ' + str(error)) from error
        alt = job['caption'] + '. ' + labels[:1800]
        data = base64.b64encode(raw).decode('ascii')
        # SVG-in-img is an inert image context. Internal IDs are additionally
        # namespaced; links/foreignObject/scripts/images are never admitted.
        figures.append('<figure class="diagram"><figcaption>' + escape(job['caption']) + '</figcaption>'
                       '<div class="diagram-scroll" role="region" tabindex="0" aria-label="Scrollable diagram">'
                       f'<img class="mermaid-diagram" src="data:image/svg+xml;base64,{data}" '
                       f'width="{width}" height="{height}" style="min-width:{min(width, 720):.0f}px" alt="{escape(alt, quote=True)}"></div>'
                       '<p class="diagram-hint">Scroll horizontally to inspect the full diagram.</p>'
                       '<details class="diagram-source"><summary>Inspect Mermaid source</summary>'
                       f'<button type="button" data-diagram-copy data-js>Copy diagram source</button>'
                       '<pre><code>' + escape(job['source']) + '</code></pre></details></figure>')
    return figures
