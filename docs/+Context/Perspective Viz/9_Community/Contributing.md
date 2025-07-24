<!-- phase:1 -->
# Contributing Guide

| Topic              | Rule |
|--------------------|------|
| **Branch naming**  | `dev/<feature>` or `dev/<fix>` only. |
| **Commit style**   | Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `ci:` |
| **DCO sign‑off**   | All commits must include `Signed-off-by: Your Name <email>` (`git commit -s`) acknowledging the [Developer Certificate of Origin](CLA.md). |
| **Style lint**     | Run `npm run lint:md` (no trailing spaces, heading‑sentence case). |
| **Docs vs Code**   | Pure‑Markdown changes target `docs/` and need only 1 reviewer; code touches need 2. |
| **Issue labels**   | Use `good-first-issue` for <2 h tasks; `help‑wanted` otherwise. |

*See `ci_matrix.yml` for test coverage goals.*


Git can add this automatically:


git commit -s -m "feat: concise description of change"

Every commit in a pull‑request must carry a valid Signed-off-by line
matching the submitter’s real name and email.