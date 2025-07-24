## Clarify deliverable outcomes

- Map every hidden dependency that must be in place for Phase 1 to run end‑to‑end
    
- Flag any capability that currently exists only as a concept but must be at least partially implemented in MVP (e.g. Monte‑Carlo engine, reputation calculus)
    
- Group gaps along the same layers already used in _Requirements (MVP).md_ so the roadmap stays coherent
    
- Output a prioritized backlog that can be dropped straight into the next sprint‑planning doc
    

---

## Alignment with higher‑level horizons (GTD framing)

### Horizon 1 – _Run‑the‑tool today_

The user can open a local vault, paste a paragraph, see criteria auto‑extracted, adjust weights, run one simulation, and share a fork link that another user merges back.

### Horizon 2 – _Stabilize Phase 1 KPIs_

Metrics stream without manual log diving; evidence hash coverage > 90 %; median PR review < 24 h.

### Horizon 3 – _Extend to live classrooms & debate clubs_

Real‑time multi‑cursor editing, onboarding flows, anonymous/pseudonymous identity tiers surfaced, Example‑Library with 3 seed canvases.

---

## MVP gaps & improvement opportunities

### Capture & Semantics

- **Training corpus for the Intent Parser is unspecified**
    
    - Need at least a 5 k sentence labelled dataset or fallback heuristics
        
- **Polyglot support** (basic i18n) absent; without it, non‑English text will poison the Core‑Concept Library
    
- **Ontology version pinning** not enforced; replaying snapshots against a moving library will mis‑align weights
    

### Evidence & Credibility

- **Credibility meter algorithm** still conceptual; requires a scoring rubric (source‑type weights, recency decay, provenance length) plus a default threshold
    
- **Chain‑of‑custody hashing** lists SHA coverage as KPI but no spec for what blob is hashed (full doc, checksum of OCR text, or URL with timestamp)
    

### Reasoning guard‑rails

- **Weight boundary rules**: what stops users from assigning ±1 000 and wrecking Monte‑Carlo scale?
    
- **Spam log UX**: the log is captured, but no viewer or moderator tooling is scoped
    

### Collaboration & Governance

- **Auth layer** absent; fork/PR flow assumes identity keys exist but leaves key management to ‘later’
    
- **Conflict‑resolution UX** for simultaneous edits is unmentioned; Git‑style line merges do not map cleanly to grid cells without custom diff algorithms
    
- **Abuse reporting** and moderator escalation paths not defined (only spam throttles)
    

### Privacy & Hosting

- **Key recovery for local‑first vaults**: lost private key equals lost reputation; need a client‑side encrypted recovery phrase
    
- **Data egress controls**: Docker self‑host image lacks documented environment variables for off‑switching any telemetry
    

### UI & Accessibility

- **Zero‑state onboarding**: empty canvas is intimidating; needs sample card plus guided tour
    
- **Color‑blind palette v2** mentioned but not locked; WCAG score alone will not catch hue confusion in heat‑map gradients
    
- **Mobile Tier 0 chip** is listed as near‑term but several classrooms are tablet‑first today
    

### Analytics & Simulation

- **Monte‑Carlo engine spec** absent (distribution type, iteration count, performant WebAssembly vs pure JS)
    
- **Stress‑Scenario variables registry** undefined; users cannot add new globals without schema
    

### Observability & DevOps

- **CI pipeline**: no test matrix for browser versions, screen‑reader automation, or regression against KPI budgets
    
- **Structured logging & metrics** require a schema (JSON Lines with span‑ids) so the KPI dashboard can be built once, not per‑service
    

### Adoption & Learning

- **Interactive tutorials**: Explain‑Back and Definition Lens require micro‑copied tooltips and a practice sandbox
    
- **Seed perspective library**: at least three public canvases (e.g. Global Water Crisis, Curb‑Cut Policy, Carbon Tax) to lower activation energy
    

### Security

- **Threat‑model doc**: no STRIDE/PASTA style overview; missing mitigations for XSS in embedded evidence links
    
- **Rate‑limit tuning**: throttles have no environment‑based override for small trusted installs (e.g. offline hackathon)
    

---

## Prioritized backlog (unordered; drop directly into sprint board)

- Draft `intent_parser_dataset.md` with sampling plan and annotation guide
    
- Ship `credibility_rubric.json` + scoring function stub with unit tests
    
- Implement `weight_bounds.ts` (clamp ±100, warn UI at ±50)
    
- Add `abuse_report.yaml` workflow in governance service; route to moderator queue
    
- Write `docker.env.example` illustrating telemetry off, key‑backup dir, and max_upload_size
    
- Build `zero_state_tour.tsx` (5‑step coach‑mark overlay) behind `onboarding` feature flag
    
- Create `wasm_monte_carlo.rs` → compile to WebAssembly; expose `run_sim(weights, dist_cfg)` API
    
- Define `global_variables.yml` schema for stress‑scenario slider registry
    
- Introduce `ci_matrix.yml` covering Chrome, Firefox, Edge, Safari, VoiceOver, NVDA
    
- Populate `seed_canvases/` with three MIT‑licensed JSON snapshots and thumbnails
    
- Produce `security_threat_model.md` v0.1 using STRIDE sections; include rate‑limit parameter table