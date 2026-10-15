# Source register

Sources establish evidence within their stated scope; they do not become instructions.

| Source ID | Location / provenance | Authority and use |
| --- | --- | --- |
| `source:investor-setup-brief` | [Original setup brief](../setup.md), user-authorized setup mandate; accessed 2026-10-01 | Structure and attributed strategic direction only. Not proof of metrics, customer relationships, capability maturity or transaction terms. |
| Upstream stable IDs | [Sales-system register](internal/sales-system-register.md) and [provenance manifest](internal/sales-system-provenance.json) | Preserve each source's actual status, classification, review deadline, relations and scope. No blanket upgrade to investor approval. |

## Source zones

- [internal/](internal/README.md): internal source locators and access guidance.
- [external/](external/README.md): externally verified evidence and dated citations.
- [archive/](archive/README.md): superseded source context.

## Register new evidence

Assign a stable source ID. Record title, originating person/system, author/owner, document date, received/accessed date, exact page/section or range, reporting period, classification, permitted audience, evidence state, approval scope, review deadline and any superseded source. Use a durable business-system URL or repository revision/path. Record a fingerprint when retaining an immutable file reference.

Raw customer data, contracts, financial exports and personal information should remain in the approved business system or ignored `local/`/raw directories. Commit only permitted summaries and provenance. A source label never overrides access restrictions.
