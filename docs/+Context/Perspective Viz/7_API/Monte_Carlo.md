### <!-- phase:1 -->

A self‑contained specification for the Phase 1 Monte‑Carlo engine compiled to WebAssembly  
(_file lives next to Perspective API docs; referenced by Requirements (MVP) step 4_)

## Purpose

- Run **10 k+ randomized perturbations** of all active weights and global variables
    
- Surface **fragility metrics** and a **histogram** fast enough for real‑time UX
    
- Provide a **stable ABI** so Rust, TypeScript, Python, or another WASM host can interop without breaking binary compatibility between releases
    

---

## Exported WASM Symbols

|export|kind|description|
|---|---|---|
|`run_sim`|func|core entry point (takes config Json via pointer/len, returns result Json ptr)|
|`alloc`, `dealloc`|func|linear‑memory helpers (see ABI)|
|`get_version`|func|returns major.minor.patch string for cache‑bust checks|

_All other symbols are private to allow Rust refactors without wrapper churn._

---

## Memory & ABI

- Little‑endian u8 linear memory
    
- Caller allocates input buffer through `alloc`, copies UTF‑8 Json, then passes `ptr,len` into `run_sim`
    
- `run_sim` allocates output buffer; caller must free with `dealloc` after reading
    
- Buffers **must** start 8‑byte aligned for Wasm‑bindgen compatibility
    

```ts
// TypeScript helper (ESM)
export async function run_sim(
  wasm: WebAssembly.Instance,
  config: SimConfig
): Promise<SimResult> {
  const enc = new TextEncoder()
  const raw = enc.encode(JSON.stringify(config))
  const ptr = wasm.exports.alloc(raw.length)
  const mem = new Uint8Array(wasm.exports.memory.buffer, ptr, raw.length)
  mem.set(raw)
  const outPtr = (wasm.exports.run_sim as Function)(ptr, raw.length)
  const outLen = new Uint32Array(wasm.exports.memory.buffer, outPtr, 1)[0]
  const outView = new Uint8Array(wasm.exports.memory.buffer, outPtr + 4, outLen)
  const res = JSON.parse(new TextDecoder().decode(outView))
  ;(wasm.exports.dealloc as Function)(ptr, raw.length)
  ;(wasm.exports.dealloc as Function)(outPtr, outLen + 4)
  return res as SimResult
}
```


---

## Input schema (`SimConfig`)

|Key|type|notes|
|---|---|---|
|`num_runs`|u32|1 – 100 000 (default 10 000)|
|`seed`|u64|optional; repeatable results when provided|
|`bins`|u16|histogram buckets (default 20)|
|`perspective`|`PerspectiveV1`|full Data Model V1 snapshot (see docs)|
|`global_vars`|Record<string, number>|baseline values (e.g. `steel_price`, `interest_rate`)|
|`perturbations`|`VariablePerturbation[]`|stochastic rules (below)|

### `VariablePerturbation`

|Key|type|description|
|---|---|---|
|`key`|string|dot‑path into `perspective` or `global_vars`|
|`dist`|`'normal'|'uniform'|
|`mu`|f64|mean (normal, triangular)|
|`sigma`|f64|std‑dev (normal) or spread (uniform half‑range)|
|`low` / `high`|f64|inclusive bounds clamp (optional)|

_All numbers are f64; engine automatically clamps cell weights to ±100 before scoring._

---

## Output schema (`SimResult`)

|Key|type|description|
|---|---|---|
|`histogram`|u32[]|bucket counts length == `bins`|
|`min`|f64|lowest total score across runs|
|`max`|f64|highest total score|
|`mean`|f64|arithmetic mean|
|`std_dev`|f64|population σ|
|`p05` / `p95`|f64|two‑sided 90 % interval|
|`fragility_score`|f64|% of runs where **top option changed** vs baseline|
|`option_win_counts`|Record<string, u32>|wins per `option_id`|
|`runtime_ms`|u32|wall‑clock in ms inside WASM|
|`version`|string|echo from `get_version` for traceability|

---

## Deterministic scoring rule

Total score per run = Σ (weight × loc_conf) across all cells in each `option_id` row  
Higher score == better (aligns with Bridge Lens slider logic)

_No other heuristics (e.g. credibility, emotion) applied inside the engine; the host may post‑process._

---

## Rust façade (excerpt)

```rust
/// SimConfig: de/ser via serde_json (snake_case, no optional fields omitted)
#[derive(Deserialize)]
pub struct SimConfig {
  pub num_runs:        u32,
  pub seed:            Option<u64>,
  pub bins:            Option<u16>,
  pub perspective:     PerspectiveV1,
  pub global_vars:     HashMap<String, f64>,
  pub perturbations:   Vec<VariablePerturbation>,
}

#[derive(Deserialize)]
pub struct VariablePerturbation {
  pub key:   String,
  pub dist:  DistKind,
  pub mu:    f64,
  pub sigma: Option<f64>,
  pub low:   Option<f64>,
  pub high:  Option<f64>,
}
```



---

## Error handling

The engine **panics** with a descriptive string that bubbles to JS as a `RuntimeError` for:

- malformed Json (serde error)
    
- unknown distribution kind
    
- `num_runs` > 100 000
    
- non‑finite weight inputs
    

Hosts **must** catch and surface the message via UI toast to meet the MVP guard‑rail KPI.

---

## Example minimal call

```ts
import init, { run_sim } from './pkg/monte_carlo_bg.js'
const wasm = await init()
const result = await run_sim(wasm, {
  num_runs: 10_000,
  bins: 20,
  perspective: snapshot,          // Data Model V1 object
  global_vars: { steel_price: 900 },
  perturbations: [
    { key: 'global_vars.steel_price', dist: 'normal', mu: 900, sigma: 180 },
    { key: 'grid[0].cells[2].weight', dist: 'uniform', mu: 0, sigma: 10 }
  ]
})
console.log(result.fragility_score)

```

---

## Performance target

- 10 k runs on Apple M2 or Chrome v124 desktop ≤ 2 s (90 th percentile), aligning with _Requirements (MVP)_ KPI
    
- WASM SIMD and fixed‑block RNG (Xoshiro256**) compiled with `-C target-feature=+simd128`
    

---

## Versioning

- Follows repo semver `major.minor.patch`; **major bumps** may change ABI
    
- `get_version` allows JS wrapper to gate features or prompt hot‑reload
    

---

## Changelog anchor

- **v1.0.0** – first public spec (this document): stable function names, Json payloads, deterministic scoring rule
    

_Additions like alternative distributions or Monte‑Carlo per‑criterion deltas will bump **minor** only if backward compatible._