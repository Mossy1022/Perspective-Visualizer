<!-- phase:1 --><!-- draft -->

| UI Pattern (from *Core Visualization Patterns*) | React Component      | State slice (Zustand)                                        | Notes                                                       |
| ----------------------------------------------- | -------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| **Choice‑Criteria Heat‑Map**                    | `<HeatMapGrid>`      | `gridStore`                                                  | Virtualized rows, sRGB Canvas for colour. Main matrix       |
| **Breadcrumb Bar**                              | `<BreadcrumbBar>`    | `focusMode` in `perspectiveStore`                            | shows nested path; handles Esc/Home keys                    |
| **Nested Grid Wrapper**                         | `<NestedGrid>`       | uses `HeatMap` internally                                    | adds roll‑up cache + reducer. **TODO** Phase 1 / Req #6     |
| **Evidence Card**                               | `<EvidencePopover>`  | `evidenceStore`                                              | Portalled to body for a11y.                                 |
| **Confidence Halo**                             | `<ConfidenceHalo>`   | derived from `gridStore.globalConf`                          | Pure SVG filter.                                            |
| **Branch Timeline**                             | `<TimelineTree>`     | `historyStore`                                               | Re‑uses d3‑hierarchy + collapsible nodes.                   |
| **License Badge Cluster**                       | `<LicenseBadge>`     | `snapshot.meta.license_code`                                 | Shape = square / circle / triangle per license.             |
| **Governance Badges**                           | `<GovernanceBadges>` | `snapshot.agent.identity_tier`, `snapshot.badges.reputation` | Icons: identity-tier circle / shield + star.                |
| **Bridge Lens Overlay**                         | `<BridgeLensModal>`  | `lensStore`                                                  | **stub** – implement Req #9                                 |
| **Causality Overlay**                           | `<CausalityOverlay>` | `edgeStore`                                                  | **stub** – implement Req #9                                 |

> **Decision:** Global state managed by **Zustand** + Immer; no Redux boilerplate.  
> **Next:** map keyboard shortcuts in an Appendix once Accessibility Spec is final.
