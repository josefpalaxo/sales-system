#!/usr/bin/env python3
"""Validate investor scaffold, local links, source manifest and master metadata.

This is structural validation, not a business-truth or publication-approval check.
"""
from __future__ import annotations

from datetime import date
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "AGENTS.md",
    "GOVERNANCE.md",
    "README.md",
    "archive/README.md",
    "investors/_template/README.md",
    "investors/_template/analysis/README.md",
    "investors/_template/contacts.md",
    "investors/_template/correspondence/README.md",
    "investors/_template/deliverables/README.md",
    "investors/_template/interaction-log.md",
    "investors/_template/investor-profile.md",
    "investors/_template/meeting-prep.md",
    "investors/_template/meetings/README.md",
    "investors/_template/next-actions.md",
    "investors/_template/opportunity-map.md",
    "investors/_template/questions-and-objections.md",
    "investors/_template/research/README.md",
    "investors/_template/strategic-fit.md",
    "master/README.md",
    "master/business/business-model.md",
    "master/business/go-to-market.md",
    "master/business/pricing-and-commercial-model.md",
    "master/business/products-and-deployment-models.md",
    "master/company/company-history.md",
    "master/company/company-snapshot.md",
    "master/company/founders-and-team.md",
    "master/company/ownership-and-funding-history.md",
    "master/data-quality-and-open-questions.md",
    "master/financials/arr-analysis.md",
    "master/financials/forecasts.md",
    "master/financials/historical-financials.md",
    "master/financials/revenue-quality.md",
    "master/financials/valuation-context.md",
    "master/investor-materials-master.md",
    "master/market/competitive-landscape.md",
    "master/market/gcc-opportunity.md",
    "master/market/industry-trends.md",
    "master/market/market-opportunity.md",
    "master/product/agentic-trusted-execution.md",
    "master/product/edoc.md",
    "master/product/next-generation-architecture.md",
    "master/product/product-positioning.md",
    "master/product/product-roadmap.md",
    "master/product/trusted-records.md",
    "master/risks/due-diligence-issues.md",
    "master/risks/investor-questions.md",
    "master/risks/risks-and-mitigation.md",
    "master/strategy/growth-strategy.md",
    "master/strategy/investment-thesis.md",
    "master/strategy/sovereign-shared-services.md",
    "master/strategy/strategic-partnership-thesis.md",
    "master/strategy/strategic-vision.md",
    "master/traction/case-studies.md",
    "master/traction/customers.md",
    "master/traction/key-metrics.md",
    "master/traction/sovereign-deployments.md",
    "master/traction/strategic-partnerships.md",
    "master/transaction/long-term-exit-and-ipo.md",
    "master/transaction/strategic-investment-opportunity.md",
    "master/transaction/transaction-structure.md",
    "master/transaction/use-of-strategic-partner.md",
    "materials/README.md",
    "materials/data-room-index/README.md",
    "materials/faq/README.md",
    "materials/investment-memo/README.md",
    "materials/one-pager/README.md",
    "materials/pitch-deck/README.md",
    "materials/talking-points/README.md",
    "materials/teaser/README.md",
    "research/README.md",
    "research/competitors/README.md",
    "research/market/README.md",
    "research/strategic-investors/README.md",
    "research/transactions/README.md",
    "research/valuation/README.md",
    "setup.md",
    "sources/README.md",
    "sources/archive/README.md",
    "sources/external/README.md",
    "sources/internal/README.md",
    "sources/internal/sales-system-provenance.json",
    "sources/internal/sales-system-register.md"
]
FIELDS = {"id", "status", "revision", "classification", "owner", "updated_at", "review_by"}

def main() -> int:
    errors = []
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors.append(f"Missing required file: {relative}")

    # Respect Git exclusions so raw local evidence is never inspected.
    tracked = subprocess.run(
        ["git", "-C", str(ROOT), "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        capture_output=True, text=True, check=True,
    )
    paths = sorted({
        ROOT / name for name in tracked.stdout.split("\0")
        if name.endswith(".md")
    })
    ids = set()
    master_count = 0
    for path in paths:
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        text = path.read_text(encoding="utf-8")
        if relative.parts[0] == "master" and path.name != "README.md":
            master_count += 1
            match = re.match(r"\A---\n(.*?)\n---\n", text, re.S)
            if not match:
                errors.append(f"{relative}: missing frontmatter")
                continue
            metadata = dict(re.findall(r"^([a-z_]+):[ \t]*(.*)$", match.group(1), re.M))
            missing = FIELDS - metadata.keys()
            if missing:
                errors.append(f"{relative}: missing metadata {sorted(missing)}")
            record_id = metadata.get("id", "")
            if not re.fullmatch(r"investor-master:[a-z0-9-]+", record_id) or record_id in ids:
                errors.append(f"{relative}: invalid or duplicate ID {record_id!r}")
            ids.add(record_id)
            if metadata.get("status") not in {"draft", "reviewed", "approved", "deprecated"}:
                errors.append(f"{relative}: invalid status")
            if metadata.get("classification") not in {"public", "internal", "confidential", "restricted"}:
                errors.append(f"{relative}: invalid classification")
            if not metadata.get("revision", "").isdigit() or int(metadata.get("revision", "0")) < 1:
                errors.append(f"{relative}: revision must be a positive integer")
            try:
                updated = date.fromisoformat(metadata.get("updated_at", ""))
                if updated > date.today():
                    errors.append(f"{relative}: updated_at is in the future")
            except ValueError:
                errors.append(f"{relative}: invalid updated_at")
            if metadata.get("status") == "approved":
                for field in ("owner", "approved_by", "approval_ref", "review_by"):
                    if metadata.get(field, "") in {"", "unassigned", "pending"}:
                        errors.append(f"{relative}: approved record requires {field}")
                try:
                    if date.fromisoformat(metadata.get("review_by", "")) < date.today():
                        errors.append(f"{relative}: approved record review expired")
                except ValueError:
                    errors.append(f"{relative}: approved record requires a valid review date")

        # Check file targets in ordinary inline Markdown links, excluding code samples.
        prose = re.sub(r"```.*?```", "", text, flags=re.S)
        prose = re.sub(r"`[^`\n]*`", "", prose)
        for target in re.findall(r"\[[^\]\n]+\]\(([^)\n]+)\)", prose):
            target = target.strip().removeprefix("<").removesuffix(">")
            parsed = urlsplit(target)
            if parsed.scheme or target.startswith("#"):
                continue
            local = (path.parent / unquote(parsed.path)).resolve()
            if not local.is_relative_to(ROOT):
                errors.append(f"{relative}: local link escapes repository: {target}")
            elif not local.exists():
                errors.append(f"{relative}: broken local link: {target}")

    manifest_path = ROOT / "sources/internal/sales-system-provenance.json"
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        source_ids = set()
        for record in manifest["records"]:
            if record["id"] in source_ids:
                errors.append(f"Duplicate source ID: {record['id']}")
            source_ids.add(record["id"])
            if not re.fullmatch(r"[a-f0-9]{64}", record["sha256"]):
                errors.append(f"Invalid fingerprint: {record['id']}")
        brief_hash = hashlib.sha256((ROOT / "setup.md").read_bytes()).hexdigest()
        if brief_hash != manifest["setup_brief"]["sha256"]:
            errors.append("Original setup.md changed; review its provenance before updating the fingerprint")
    except (OSError, ValueError, KeyError) as exc:
        errors.append(f"Invalid source manifest: {exc}")

    if errors:
        print("\n".join(errors))
        return 1
    print(f"Validated {len(REQUIRED)} required files, {master_count} master records, "
          f"{len(paths)} Markdown files and {len(source_ids)} source locators.")
    print("Structure and local links pass. Business approval remains pending.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
