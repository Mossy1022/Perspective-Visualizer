<!-- phase:1 --><!-- draft -->
# Build & Release Pipeline

```pgsql
git push → GitHub Actions
├─ lint + unit tests
├─ axe a11y check
├─ Playwright headless smoke
├─ docker build # tags :sha and :edge
└─ provenance attestation (cosign)
```

* Promotion: merge to `main` triggers `:stable` tag + GitHub Release notes auto‑compiled from Conventional Commit messages.
* Canary docker images deployed to `canary.perspectiveviz.io` (volunteers opt‑in).


<!-- phase:1 -->
# Release Process  — CalVer `YYYY.M.patch`

| Stage | Actor | Tooling | Result |
|-------|-------|---------|--------|
| **Cut branch** | maintainer | `gh pr create -B release/<year>.<month>` | frozen code + docs |
| **Version bump** | CI | `npm version 2025.7.0 --no-git-tag` | package.json updated |
| **CI matrix** | GitHub Actions | `ci_matrix.yml` (all browsers + AT) | artefacts + SBOM |
| **Sign & publish** | CI | `cosign sign --key=env://SIG_KEY` | `pv-core:2025.7.0` pushed |
| **Git tag** | CI | `git tag 2025.7.0 && git push --tags` | immutable tag |
| **Draft notes** | maintainer | auto‑template pulls from merged PRs | CHANGELOG.md updated |
| **Release candidate** | community | Docker Hub `rc` tag | 1‑week soak |
| **GA** | admin | retag `latest` → GA, GitHub Release | notification in #announcements |

### Patch Rules

*Security fixes only* → bump third digit (`2025.7.1`).  
Minor feature behind flag → bump month when merged (`2025.8.0`).

### Upgrade Path

```bash
docker pull ghcr.io/pv/pv-core:2025.7.0
docker compose up -d --force-recreate db migrate
```

_DB migrations_ are Flyway‑versioned; never break backward reads.

### Deprecation Window

| Component   | Min support | Notes                    |
| ----------- | ----------- | ------------------------ |
| Postgres 14 | 12 months   | upgrade script provided  |
| Node 18 LTS | LTS period  | drop at Node 20 adoption |