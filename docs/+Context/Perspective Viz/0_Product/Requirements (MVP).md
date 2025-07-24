## Phase 1 (MVP) Scope – v1.0

| Layer                     | Capability                                                                                                                                                                               | Phase‑1 KPI / Guard‑rail                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Capture**               | **AI‑assisted Intent Parser** (extract criteria / tags on paste or voice) • 5 k‑sentence open dataset ships with repo • Low‑confidence extractions enter a side‑by‑side _Review Overlay_ | ≥ 80 % correct criterion detection ≤ 10 s dataset‑training pipeline run‑time |
| **Semantics**             | **Core‑Concept Library ≈500** + forkable domain libs • Ontology snapshot pin per canvas                                                                                                  | Amber‑glow cue latency < 40 ms                                               |
| **Reasoning Guard‑rails** | **Explain‑Back Check** (block save if rationale blank) **Cred × Conf Threshold** **Weight‑Bounds Clamp ±100** **Weight‑Spam Log** (CSV)                                                  | < 3 % unsourced weight commits                                               |
| **Evidence**              | **Credibility Meter** (rubric JSON v0.1) **Chain‑of‑Custody SHA‑256** **Probable‑Fake Overlay**                                                                                          | ≥ 90 % evidence blobs hashed Credibility score visible in card hover         |
| **Nested Reasoning**      | Drill‑down Snapshot (depth ≤ 3); breadcrumb nav; roll‑up cache                                                                                                                           | Breadcrumb focus switch ≤ 20 ms                                              |
| **Collaboration**         | Git‑style Fork / PR flow Reputation Star Abuse‑Report YAML workflow                                                                                                                      | Median PR review < 24 h Abuse triage SLA < 12 h                              |
| **Privacy & Hosting**     | Local‑first vault (client AES‑GCM) Docker self‑host Encrypted key‑recovery phrase                                                                                                        | Offline‑only mode fully functional                                           |
| **UI Tiers**              | Tier 0 chip, Tier 1 card, Tier 2 canvas                                                                                                                                                  | Chip expand < 100 ms                                                         |
| **Accessibility Layer**   | dual colour + texture cues full keyboard nav screen‑reader linear mode                                                                                                                   | WCAG 2.1 AA ≥ 95 % Lighthouse                                                |
| **Analytics**             | Monte‑Carlo Panel (WASM) Stress‑Scenario Simulator Perspective‑Distance Trend (basic)                                                                                                    | First simulation < 2 s                                                       |
| **Observability**         | Structured JSON logs (span‑id, user‑id hash) Prom‑style metrics endpoint                                                                                                                 | KPI dashboard deploys via docker‑compose                                     |
| **Security**              | STRIDE threat model doc Rate‑limit env vars XSS sanitiser on evidence links                                                                                                              | 0 critical vulns in OWASP scan                                               |
| **Onboarding**            | Zero‑State Tour (coach‑marks) Three MIT‑licensed Seed Canvases                                                                                                                           | ≥ 70 % of new users complete tour                                            |

### Immediate Build Steps (Phase‑1 sprints)
1. Prototype Definition Lens with 25 seed terms ➜ iterate to 500.  
2. Ship Explain‑Back Check & Weight‑Spam Log behind a **`guardrails`** feature flag.  
3. Finish Docker compose for local‑first vault + self‑hosting docs.  
4. Compile Monte‑Carlo engine to WebAssembly; expose `run_sim()` API
5. Instrument phase‑1 KPI telemetry: `rationale_missing`, `unsourced_commit`, `sim_run_time_ms`.  
6. Publish **Ontology Contribution Guide v0.1** (matches Core‑Concept Library semver).
7. Publish **Intent Parser Dataset Guide v0.1** and dump `dataset.tsv`
8. Add `credibility_rubric.json` and scoring function stub
9. Integrate Zero‑State Tour; hide if `user.has_seen_tour === true`
10. Wire structured logs ➜ Grafana dashboard template
11. Drop `threat_model.md` in /docs/security

> **Out of Scope for Phase 1** – anything listed under Phase 2+ in [[Roadmap]].