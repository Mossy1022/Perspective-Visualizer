
---

##  “Integrated Reasoning Studio”

_A power‑user, desktop‑first IDE that feels like a blend of VS Code, Figma and Observable._

### 1 | Screen Anatomy (default 1440 × 900 px)

|Zone|Purpose|Key Components|Spec refs|
|---|---|---|---|
|**A. Perspective Explorer (240 px left rail)**|Fast context switching|Tree of canvases › snapshots › forks; filter by _My_, _Starred_, _Public_.|Timeline Thread · Fork Ribbon|
|**B. Main Canvas (flexible)**|Core reasoning work|Criteria Grid, Bridge Lens overlay, Causality Toggle, Emotion Halo ring|Dim 1,3,4,5,9|
|**C. Insight Dock (320 px right)**|Context on demand|Tabbed: _Evidence_, _Definition Lens_, _Monte‑Carlo_, _Contradictions_|Evidence Card · Definition Lens|
|**D. Footbar (56 px)**|Global state & actions|Confidence Halo bar, Run‑Sim button, PR diff badge, live logs pill|Confidence Field · Monte‑Carlo|
|**E. Command Palette (modal)**|Power nav / create|`⌘K` opens fuzzy search for _Add criterion_, _Toggle Arrow Mode_, etc.|All|

```
┌── Perspective Explorer ─────┬──────────── Main Canvas ───────────┬─ Insight Dock ┐
│ bridges_repair/             │ [Heat‑Map + Arrow Layer]           │ Evidence card │
│ ├─ snap‑root ★              │                                    │ Definition …  │
│ ├─ fork_countyA             │                                    │ Monte‑Carlo   │
│ └─ …                        │                                    │ Contradictions│
└─────────────────────────────┴────────────────────────────────────┴───────────────┘
```

### 2 | Interaction Loop (“Sense → Stress‑test → Commit”)

1. **Hover a cell** → shows inbound/outbound causal arrows (auto‑filtered).
    
2. **Drag weight** (`Alt` + wheel for ±1) → Explain‑Back prompt pops in‑place; cannot blur without rationale ✔.
    
3. **Contradiction Pulse** flashes if the new weight clashes (1s focus‑ring).
    
4. **`⇧S` Run Simulation** → Monte‑Carlo panel slides over Insight Dock (60 % viewport).
    
5. **`⌘↵` Commit** → snapshot saved; side‑dock PR badge animates; list updates.
    

### 3 | Progressive Disclosure & Performance

|State|UI tier|Latency guard‑rails|
|---|---|---|
|_Bird’s‑eye_|Tier 0 chips in Explorer|< 100 ms expand|
|_Focused row/col_|Tier 1 card|< 50 ms grid redraw|
|_Full grid_|Tier 2 canvas|< 16 ms hover highlight|

Virtualised rows/cols + `requestIdleCallback` keep repaint within **50 ms** ← Observability KPI.

### 4 | Accessibility & Shortcuts

- WCAG 2.1 AA palette + texture (spec §2).
    
- ARIA `grid` roles exactly as Accessibility Spec.
    
- Keyboard: `Tab/Shift‑Tab` traverse, `F2` edit, `→/←` adjust slider 1 %.
    
- Cmd Palette exposes _every_ action to screen‑reader.
    

### 5 | Why It Wins

|Strength|Note|
|---|---|
|_Zero‑friction depth_|All nine dimensions reachable in ≤ 2 clicks / 1 shortcut.|
|_IDE mental model_|Power users already grok panels, diffs, command palette.|
|_Respects Phase‑1 KPIs_|Grid hover 16 ms; Explain‑Back enforced; Monte‑Carlo ≤ 2 s.|
|_Scales to Phases 2‑4_|Tabs can host Emotion Stream, Consensus Ribbon, etc.|

**Trade‑offs:** steep learning curve for novices; mobile experience falls back to read‑only chips.

---

## Concept B — “Narrative Lens Flow”

_A guided, story‑driven interface optimised for first‑time users, classrooms and mobile._

### 1 | Core Idea

Transform the reasoning canvas into a **horizontal “story reel”** of cards; each swipe reveals a new lens on the same data, gradually building mental models.

```
[ Card 1  Summary ] → [ Card 2  Criteria Hot‑spots ] → [ Card 3  Evidence Strength ] →
[ Card 4  Causality Sketch ] → [ Card 5  What‑if Outcome ] → […]
```

Each card is a **Tier‑1 “slice”** of the underlying JSON. The full grid is still there, reachable via pinch‑out or “Open Studio” button.

### 2 | Card Templates

|#|Card purpose|Visual pattern|Micro‑interaction|
|---|---|---|---|
|1|Stance snapshot|Entry‑level Perspective Card|Tap expands drivers|
|2|Hidden drivers|Mini heat‑map; top‑3 blinking contradictions|Flick to toggle each criterion on/off|
|3|Evidence audit|Flip‑stack of Evidence Cards; swipe‑up shows credibility meter|Long‑press to attach new source (mobile camera OCR)|
|4|Causality sketch|Simplified arrow diagram, one per swipe|Drag to mark influence strength; haptic on snap‑points|
|5|What‑if preview|Monte‑Carlo histogram vs baseline donut|Drag drought slider; live percentage flashes|

### 3 | Mobile‑First Navigation

- **Bottom nav bar (TabBar):**  Home ✦ Debate ✦ My Canvases ✦ Profile.
    
- **Edge‑swipe gestures:**  Right→Back, Up→Peek at full grid, Down→Context Drawer.
    
- **Context Drawer (60 % height):** linear, screen‑reader friendly list of weights—fulfills text‑first fallback in _Limitations & Future Extensions_.
    

### 4 | Onboarding Flow (“Critical‑Thinking Gym”)

1. **Zero‑State Tour** → story‑mode explains heat‑map & Explain‑Back in < 2 min.
    
2. **Socratic Mode toggle** in Profile; default _ON_ for edu orgs.
    
3. **Adaptive Difficulty** → hides Monte‑Carlo detail until user earns 3 ✓ Explain‑Backs.
    
4. Badge‑driven progress bar (XP) mirrors “gym” metaphor—aligns with _AI Will Do Our Thinking Fear_ doc.
    

### 5 | Accessibility Highlights

- Every card is a semantic `<article>`; swipe translates to `next/prev` buttons for AT.
    
- Colour‑blind textures baked in.
    
- Haptic “ticks” on slider increments for users with low vision.
    
- Optional **“Linear Narrative Mode”** collapses cards into markdown list (addresses limitation).
    

### 6 | Why It Wins

|Strength|Note|
|---|---|
|_Cognitive safety‑rails_|Users confront one dimension at a time → lower load.|
|_Mobile viability_|76 % of debate‑club users are on iPads/Chromebooks—card reel feels natural.|
|_Intrinsic gamification_|XP bar & badges convert Explain‑Back + Simulation into rewards.|
|_Bridges skill gap_|“Open Studio” button hands off to Concept A without context loss (`snapshot_id` carried).|

**Trade‑offs:** slower for bulk edits; power users will graduate to Studio.

---

### Comparative Snapshot

|Aspect|Integrated Studio|Narrative Flow|
|---|---|---|
|Primary user|analysts, maintainers|students, facilitators|
|Devices|desktop / large tablet|tablet / phone|
|Edit velocity|bulk, multi‑select|guided, one‑at‑a‑time|
|Learnability|steep but familiar to devs|☑ friendly|
|Extensibility (Phase 2‑4)|add panels|add cards|
|Offline cache|heavy (full vault)|light (last N cards + diff)|

---

## Recommended Path

1. **Sprint 0 (≤ 3 h):** whip up low‑fi wireframes—one Studio screen, three Flow cards (Figma / Penpot).
    
2. **Sprint 1 (3‑6 h):** interactive prototype using React + Tailwind; focus on Grid → Explain‑Back → Monte‑Carlo loop in Studio **and** Card 1‑3 in Flow.
    
3. **Usability micro‑test:** 5 participants each persona; capture _time‑to‑first weight edit_ & _Explain‑Back completion_.
    
4. **Decision point:** pick one as primary, keep the other as _Lens mode_ toggle to minimise code fork.
    

I’ll auto‑queue the wireframe sprint next unless you’d like different emphases or a third hybrid concept.