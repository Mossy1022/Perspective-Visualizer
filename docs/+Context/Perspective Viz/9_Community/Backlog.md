_(prioritised, ready for sprint board)_

- **intent_parser_dataset.md** – sampling plan, annotation rubric
    
- **credibility_rubric.json** – source‑type weights, recency decay, provenance length multipliers
    
- **weight_bounds.ts** – clamp ±100, UI warning at ±50
    
- **abuse_report.yaml** – governance workflow ➜ moderator queue
    
- **docker.env.example** – show telemetry off, key‑backup dir, max_upload_size
    
- **ZeroStateTour.tsx** – 5‑step coach‑mark overlay behind `onboarding` flag
    
- **wasm_monte_carlo.rs** – compile to `pkg/monte_carlo_bg.wasm`; JS wrapper `runSim`
    
- **global_variables.yml** – schema for stress‑scenario slider registry
    
- **ci_matrix.yml** – GitHub Actions: Chrome, Firefox, Edge, Safari, VoiceOver, NVDA
    
- **seed_canvases/** – three MIT‑licensed JSON snapshots + thumbnails
    
- **security/threat_model.md** – STRIDE table, mitigation mapping

- **docker.env.example** – add `DEFAULT_MEMORY_LIMIT`, `SBOM_POLICY`, `ENABLE_NO_NEW_PRIVILEGES`  
- **container_security_baseline.md** – author baseline doc (see 5_DevOps)  
- **ci_sbom_scan.yml** – GitHub Action generating SBOM, failing on critical CVEs  
- **compose_hardening** – inject `mem_limit` and `security_opt` into all services