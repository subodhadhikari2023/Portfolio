# Project Title

> Set the one-line project description in the **GitHub repo → About (gear icon) → Description**
> field. The portfolio sync reads it from there — not from this README.

## Highlight

One sentence. A concrete stat, deployment fact, or achievement. Must end with `.`, `!`, or `?`.
This is the badge shown on the portfolio card.

Good examples:
- `194 automated tests covering all role-based access paths.`
- `Deployed to Railway via GitHub Actions CI/CD.`
- `Production system delivered for the Department of IT, Government of Sikkim.`
- `Dockerized and published to GHCR — zero paid APIs.`

## Tech Stack

- Technology 1
- Technology 2
- Technology 3

Use plain names as you want them shown on portfolio tags — e.g. `Spring Boot`, `Angular 14`,
`Docker`. One item per bullet. Frameworks, libraries, databases, and DevOps tools all go here.

## Features

- Feature 1
- Feature 2
- Feature 3

## Getting Started

```bash
git clone https://github.com/subodhadhikari2023/REPO_NAME.git
cd REPO_NAME
```

Add setup / run instructions here.

## Live Demo

[Live Demo](https://your-live-url.com)

Remove this entire section if there is no public URL.
For a container image use: `[View on GHCR](https://github.com/USER/REPO/pkgs/container/NAME)`

---

## Screenshots

Put screenshots in `docs/screenshots/` for the portfolio carousel.

**Rules:**
- Root-level files (`docs/screenshots/landing-page.png`) are always included
- Subdirectory files (`docs/screenshots/admin/`, `docs/screenshots/dashboard/` etc.)
  are included **up to 5 per subfolder**, in alphabetical order
- Commit to `main` — the sync reads them directly from GitHub

---

## What the portfolio sync reads from this README

| Field | Source |
|---|---|
| `customTitle` | First `# H1` heading (new entries only) |
| `customDescription` | GitHub repo **About → Description** field |
| `highlight` | First non-empty line under `## Highlight` |
| `tags` | Bullet items under `## Tech Stack` |
| `liveUrl` | Link inside `[Live Demo](url)` or `[View on GHCR](url)`, else repo homepage |
| `screenshots` | Images in `docs/screenshots/` or `screenshots/` |
