Patterns are grouped by roadmap phase. Refer to [[Roadmap]]

> **Phase Key**  • Phase 1 = MVP • Phase 2 = Collaborative Simulator, etc. Matches [[Roadmap]] numbering.

### MVP – ship with the first public beta
- **Entry‑level Perspective Card**  
  Small shareable widget with stance summary, three key drivers, and a confidence bar. Tap expands to the full canvas. *(multi‑dim overview)*

- **Choice‑Criteria Heat‑Map** _(Dim 1 – Criteria Grid)_ **＋ Nested Grid Icon**  
    • rows = options or stances  
    • columns = criteria  
    • cell = signed weight (−100…+100)  
    • mini‑sparklines on hover show weight drift  
    • **▦ glyph** in a cell means “click to open sub‑grid”.  
    Double‑border + breadcrumb bar signal depth.

- **Breadcrumb Bar** `<BreadcrumbBar>` (component extracted from v0 inline banner) 
	Appears whenever the user is inside a drill‑down.  Shows `Root › Sub‑criterion › …` `focusMode.depth > 0`. Keyboard • `Esc` climbs one level, `Home` snaps to root. and supports `Esc` to climb one level. ARIA role: `navigation`, labelled‑by `"Breadcrumb"`.

- **Confidence Halo** *(Dim 3 – Confidence Field)*  
  Radial gradient behind a card; radius ∝ confidence, opacity ∝ recency.

- **Bridge Lens** *(Dim 9 – Simulation Loop)*  
  Live sliders reveal overlap; corridor ribbon updates in real time. One‑click merge commits a new snapshot branch.

- **Contradiction Pulse** *(Dim 9 – Simulation Loop)*  
  Cells that conflict with parent criteria blink; dashboard badge shows unresolved count.

- **Evidence Card with Credibility Meter** *(Dim 2 – Evidence Layer)*  
  Hover opens source card with credibility bar, origin badge, quick links.

- **Monte‑Carlo Outcome Panel** *(Dim 9 – Simulation Loop)*  
  Histogram of scores after randomized perturbations; exposes fragile positions.

- **Stress‑Scenario Simulator** *(Dim 9 – Simulation Loop)*  
  Sidebar slider that perturbs one global variable (e.g. drought index) and re‑runs Monte‑Carlo live; outcome deltas auto‑log a snapshot.

- **Multi‑Agent Overlay** *(inter‑dimensional; anchors on Dim 1 grid)*  
  Stack or colour‑blend multiple perspective grids to reveal alignment & conflict zones. Hover shows agent names; click opens Bridge Lens.

- **Branch‑Merge Timeline (Git‑style)** *(Dim 6 – Timeline Thread)*  
  Slim tree of snapshots with text or audio annotations.

- **Fork Ribbon & Pull‑Request Overlay** *(Dim 7 – Fork Lineage)*  
  Ribbon on canvas edge (solid = ahead, dashed = behind). PR overlay shows green (compatible) / red (conflict) bars for review.

- **Definition Lens** *(semantic aid; complements Dim 1)*  
  Amber glow on ambiguous terms; side panel with canonical definitions, nuance sliders, and weight‑ripple preview.

- **License Badge Cluster** *(Dim 8 – Governance Badges)*  
  Rounded square = permissive, circle = copyleft, triangle = proprietary; click opens SPDX text.

- **Reputation Star** *(Dim 8 – Governance Badges)*  
  Five‑point star fills to percentile of composite contributor score.

- **Accessibility Layer** *(meta; spans all dims)*  
  Dual encoding (colour + texture), full keyboard navigation, logical reading order.

### Phase 2 – schedule once MVP is stable
- **Consensus Corridor Ribbon** *(Dim 9 – Simulation Loop)*  
  Horizontal bar above the grid shading the weight range where a configurable percentage already agrees.

- **Scenario Dial** *(Dim 9 – Simulation Loop)*  
  Rotary control that swaps global assumption presets (e.g. boom vs recession) and animates grid shifts.

- **Emotion Stream** *(Dim 4 – Emotion Halo)*  
  Ribbon above the heat‑map showing emotional tone over time.

- **Perspective Distance Network Mini‑Map** *(meta; built on Dim 1 data)*  
  (supersedes the older “Radar” concept) – points on spokes sized by contributor count; drag to open Bridge Lens.

- **Temporal Causal Filmstrip** *(Dim 5 – Causality Overlay)*  
  Scrubbable animation that replays causal arrow activations.

- **Mask & State Badges** *(Dim 4 – Emotion Halo / context)*  
  Icons for self‑censorship level, mood, substances (caffeine, fatigue, meditation) on each snapshot.

### Phase 3 – research or power‑user features
- **Emotional Gradient Overlay** *(Dim 4 – Emotion Halo)*  
  Crowd‑sourced sentiment gradient per criterion, useful for conflict prep.

- **Uncertainty Glare** *(Dim 3 – Confidence Field)*  
  Fog overlay when consensus cells rest on low‑credibility evidence.

- **Sandbox Replay GIF Export** *(Dim 9 – Simulation Loop)*  
  Clone a public perspective, run hypothetical shocks, export as animation.
