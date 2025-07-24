<!-- phase:1 --><!-- draft -->
# Theming & Modes

Supported modes: **light**, **dark**, **high‑contrast**, **reduced‑motion**.

| Mode | Activation | Overrides |
|------|------------|-----------|
| dark | `(prefers-color-scheme: dark)` or UI toggle | swap heat‑map reds to `#FF6B6B` for contrast |
| high‑contrast | user toggle | removes background gradients, adds 2 px outlines |
| reduced‑motion | `prefers-reduced-motion` | disables halo pulse animations |

CSS custom‑properties switch at `html[data-theme="dark"] { … }`.
