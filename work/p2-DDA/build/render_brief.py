"""Use the packaged renderer while keeping its scratch files inside the authorized folder."""
import importlib.util, tempfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('doc_renderer','/Users/josefneumann/.codex/plugins/cache/openai-primary-runtime/documents/26.909.61513/skills/documents/render_docx.py')
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
tempfile.tempdir=str(root/'build/tmp')
mod._default_macos_tmpdir_for_soffice=lambda:None
print(mod.rasterize(str(root/'outputs/dda-business-case/DDA-executive-brief.docx'),str(root/'build/brief-render'),144,True,True))
