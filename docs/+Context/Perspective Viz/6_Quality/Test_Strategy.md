<!-- phase:1 --><!-- draft -->

| Layer | Framework | Coverage target |
|-------|-----------|-----------------|
| Pure functions (e.g. credibility score) | Vitest | ≥ 90 % |
| React components | React Testing Library + jest‑axe | ≥ 80 % lines |
| E2E flows | Playwright (chromium & firefox) | Happy‑path create → fork → merge |
| a11y regression | axe‑core GitHub Action | 0 critical violations |
| Perf budget | Lighthouse CI | FCP ≤ 1.5 s, CLS ≤ 0.1 |

Fail‑fast gates wired in `ci_matrix.yml`.
