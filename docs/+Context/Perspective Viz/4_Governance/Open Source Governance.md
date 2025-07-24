This doc details Dimension 8 : Governance Badges

> Governance layer MVP ships in **Phase 1** with fork/PR flow, reputation, and spam throttles.  
> **Phase 2** surfaces identity-tier badges in the UI.  
> **Phase 3** adds Bot-Likelihood overlay & AI throttle (see [[Roadmap]]).

### Why Governance Is Needed
Open data without process invites spam and power grabs.  
Our governance layer guarantees that every voice can fork and remix while the shared canvases remain usable.

### Core Principles
- **Fork first, merge with consent**  
- **Provenance over anonymity** (you can be pseudonymous, but every edit is signed)  
- **Reputation is earned, never purchased**  
- **Majority is not truth**: evidence credibility gates weight, not vote count  

---

## Identity Tiers  *(key-pair groundwork ships in Phase 1; visual badges arrive Phase 2)*

| Tier | Who uses it | Verification | Ledger record | UI badge (Phase 2) |
|------|-------------|--------------|---------------|--------------------|
| **Anonymous** | whistle-blowers, at-risk citizens | none | salted hash of IP + timestamp | hollow circle |
| **Pseudonymous** | most casual users | email or WebAuthn device challenge | public key stored in vault; nickname displayed | solid circle |
| **Verified** | lobbyists, officials, corp spokes-people | gov-ID or corp-domain SSO + optional KYC | DID written to on-chain registry | shield badge |
| License Badge Cluster | `<LicenseBadge>` | `snapshot.meta.license_code` | Shape = square/circle/triangle per license |
| Governance Badges | `<GovernanceBadges>` | `snapshot.agent.identity_tier`, `snapshot.badges.reputation` | Icons: identity tier (circle/shield) + star |

---

### Mechanics

#### Fork Flow
- One-click fork of any public perspective  
- Child inherits full history and `fork_of` pointer  
- Divergent snapshots tracked so upstream can cherry-pick or bulk-merge  
- PR diff viewer groups changes by criterion and evidence  
- Reputation = accuracy + peer endorsements + explain-back ratio  
- Rate limits & credibility quorum mitigate spam  

#### Pull Requests
- Diff viewer groups changes by criterion and evidence  
- Reviewers leave inline comments or open a Bridge Lens session  
- After merge, all commits preserve original authorship for academic credit  

#### Reputation Score
Composite of  
1. predictive accuracy of past criteria after new evidence  
2. peer endorsements on clarity and sourcing  
3. explain-back completeness (ratio of weight edits with rationale)  

Scores decay if users go dormant to prevent static hierarchies.

#### Spam & Abuse Throttles
- Criteria-add rate limit per account per hour  
- Credibility-weighted quorum required to publish a brand-new public canvas  
- Automatic quarantine of edits from accounts < 0.2 reputation until review  

#### License Matrix

| License        | Downstream rights        | Upstream merge rules                         |
| -------------- | ------------------------ | -------------------------------------------- |
| MIT            | free fork, commercial OK | no restriction                               |
| CC-BY-SA-4.0   | share-alike required     | upstream perspective must adopt same license |
| Proprietary    | view only                | cannot be merged into public canvases        |
