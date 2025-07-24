<!-- phase:1 -->

![[Screenshot 2025-07-13 at 9.39.55 AM.png]]

Here’s one lightweight **“causality-overlay”** treatment, dropped onto the familiar choice × criteria heat-map:

_The arrows are simply painted over the existing grid; nothing about the underlying data model changes._

---

### What you’re looking at

1. **Heat-map stays primary.**  
    Each cell still encodes the signed weight (colour) and local confidence (alpha).
    
2. **Arrow network sits in a top layer.**  
    _Edges_ are drawn as straight or curved vectors that originate on the _source_ cell’s centre and land on the _target_ cell’s centre.
    
    - **Thickness** ⇒ magnitude of influence.
        
    - **Arrowhead direction** ⇒ causal flow (“Cost → Risk”).
        
    - **Dashing or colour-shift (optional)** could distinguish positive vs negative correlation, or empirical vs hypothetical links.
        
3. **Interactivity keeps clutter down.**
    
    - **Hover** a cell: highlight only inbound/outbound arrows for that node; fade the rest.
        
    - **Filter bar**: checkbox presets (“show only > 0.3 influence” or “toggle negative links”).
        
    - **Mini-legend** in the corner explains stroke width encoding and any colour semantics.
        
4. **Edge storage is already in the schema.**  
    In the backend you attach a small object to each “edge”:
    
    json
    
    CopyEdit
    
    `{   "from": { "row": "Option A", "col": "Cost" },   "to":   { "row": "Option A", "col": "Risk" },   "strength": -0.45,   "evidence_ref": "doi:10.1234/…",   "confidence": 0.68 }`
    

---

### Design tips for the production UI

|Problem|Treatment|
|---|---|
|**Visual overload on dense canvases**|Collapse arrows into a “causal mode” button. Default view shows none; click to animate them in.|
|**Edge crossings cause spaghetti**|Use _bundle_ logic: if multiple sources drive the same target, converge them into one curved spine, then fan out near the target.|
|**Mobile screens**|Replace arrows with **in-cell mini glyphs** (e.g., ↑, ↓, ↻) and show full vectors only on long-press zoom.|
|**Accessibility**|Pair arrow thickness with a numeric badge on hover (“+0.32”), so colour-blind or low-vision users can read exact influence.|

---

### How this relates to the _Nine Perspective Dimensions_

The **arrow network is Dimension 5: _Causal links between criteria_**.  
When toggled on, it complements:

1. **Criteria grid** (Dimension 1)
    
2. **Evidence texture** (Dim 2)
    
3. **Confidence alpha / halo** (Dim 3)
    
4. **Emotion halo** (Dim 4)
    
5. **↗ Causal arrows** (Dim 5) ← _you are here_
    
6. **Timeline threads** (Dim 6)
    
7. **Fork lineage ribbon** (Dim 7)
    
8. **License & provenance badges** (Dim 8)
    
9. **Reputation & bot signals** (Dim 9)
    

---

### Next step

If this sketch matches what you pictured, we can:

- refine the interaction spec (hover states, filtering UI)
    
- wire the `edge` object into the existing JSON schema (it’s just one more array)
    
- spin up a quick React prototype with SVG arrows positioned via `useLayoutEffect`—no fancy graph lib needed at MVP scale.
    

Let me know where you’d like to zoom in: implementation snippet, more accessibility details, or alternative layouts!