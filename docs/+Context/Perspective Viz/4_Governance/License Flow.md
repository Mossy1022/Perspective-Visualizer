## Supported licenses

| License        | Badge shape     | Fill colour | Tooltip                              |
| -------------- | --------------- | ----------- | ------------------------------------ |
| MIT            | rounded square  | teal        | "MIT: free to fork, incl. commercial" |
| CC-BY-SA       | solid circle    | amber       | "CC-BY-SA: must share alike"         |
| Proprietary    | triangle        | red         | "Proprietary: read-only"             |
| License Badge Cluster | `<LicenseBadge>` | `snapshot.meta.license_code` | Shape = square/circle/triangle per license |
| Governance Badges | `<GovernanceBadges>` | `snapshot.agent.identity_tier`, `snapshot.badges.reputation` | Icons: identity tier (circle/shield) + star |

_These follow the Dimension 8 governance visual language._  
_All badge shapes are shared between license & identity tiers to preserve scan‑ability._
_All badge shapes & colors match the **Governance Badges** spec (Dimension 8) so users can scan license **and** identity tiers at a glance._

## Fork + PR decision tree
1. **User clicks Fork**  
   fork inherits parent `license_code`.
2. **User changes `license_code`** in fork settings  
   - **Allowed**: MIT → CC-BY-SA, MIT → PROPRIETARY, CC-BY-SA → PROPRIETARY  
   - **Forbidden**: CC-BY-SA → MIT, PROPRIETARY → anything
3. **Pull-request opened**  
   - Engine compares `license_code` values.  
   - If child is **PROPRIETARY** and parent **public** → auto-block, warn author.  
   - If child is **CC-BY-SA** and parent **MIT** → bot comments “parent must adopt CC-BY-SA to merge”.
4. **Maintainer merges**  
   merge script updates parent `meta.license_code` if required; badge colour animates for 1 s.

## Badge UI spec
| state | fill colour | tooltip |
| ----- | ----------- | ------- |
| MIT | teal | 'MIT: free to fork, incl. commercial' |
| CC-BY-SA | amber | 'CC-BY-SA: must share alike' |
| PROPRIETARY | red | 'Proprietary: read-only' |

_The license badge cluster is part of **Dimension 8 – Governance Badges** and therefore shares the same provenance chain as reputation stars._
