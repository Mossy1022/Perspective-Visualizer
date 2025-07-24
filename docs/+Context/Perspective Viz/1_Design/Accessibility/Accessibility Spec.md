<!-- phase:1 -->
# Accessibility Specification (WCAG 2.1 AA baseline)

## 1. Focus Order & Keyboard Navigation
| Element                     | ARIA role      | Tab order  | Key bindings                                                                  |
| --------------------------- | -------------- | ---------- | ----------------------------------------------------------------------------- |
| Criteria Grid               | `grid`         | 1          | `← → ↑ ↓` move cell • `Enter` edit                                            |
| Row header (“Option”)       | `rowheader`    | 2          | `Space` open row menu                                                         |
| Column header (“Criterion”) | `columnheader` | 3          | `Space` open column menu                                                      |
| Weight Cell                 | `gridcell`     | 4‑n        | `F2` edit in‑place • `Alt+Enter` **or** `␍` on focused cell → open drill‑down |
| Bridge‑Lens sliders         | `slider`       | on open    | `← / →` 1 % • `Home/End` 10 % jumps                                           |
| Monte‑Carlo “Run” button    | `button`       | modal      | `Enter`                                                                       |
| Timeline scrubber           | `slider`       | modal      | `← / →` frame step                                                            |
| Breadcrumb link             | `link`         | after grid | `Esc` back, `Home` root                                                       |

*All actionable items expose a visible focus ring (2 px #005FCC).*

## 2. Colour & Contrast Tokens
| Token variable  | Foreground | Background | Contrast ratio |
| --------------- | ---------- | ---------- | -------------- |
| `--fg-default`  | #1A1A1A    | #FFFFFF    | 15.9 : 1       |
| `--heat-high`   | #D1495B    | #FFFFFF    | 4.5 : 1        |
| `--heat-low`    | #0077B6    | #FFFFFF    | 4.7 : 1        |
| `--halo`        | #FFDD00 40 % opacity | N/A | meets non‑text req.|

*Colour‑blind safe palette v2 is documented in `design/colour-palette.png`.*

## 3. Screen‑reader Annotations
* Weight cells announce:  
  `"<Option> cost weight minus thirty‑two, confidence eighty percent"`  
* Fork badge: `“Fork ahead by 3 commits, press Space to open diff”`.

## 4. Testing Matrix
| AT / Browser      | Status |
| ------------------| -------|
| NVDA 2025 + Firefox latest | ✅ |
| VoiceOver macOS 15 + Safari TP | ✅ |
| JAWS 2025 + Edge latest | ✅ |
