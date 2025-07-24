<!-- phase:2 --><!-- draft -->
# Extension / Plug‑in API (Early Draft)

*Phase 2 will open a stable surface for third‑party modules.*

| Area | Hook | Example |
|------|------|---------|
| Ontology Workbench | `registerConceptLibrary(libManifest)` | Domain‑specific vocab for medical ethics. |
| Evidence import | `onEvidenceDrop(file)` | Auto‑parse PDF tables into criteria. |
| Simulation engine | `runCustomSim(fn)` | Climate scenario model replacing Monte‑Carlo kernel. |

All hooks exposed via **tRPC** namespaces; plugins isolated in iframes with postMessage + signature checks.
