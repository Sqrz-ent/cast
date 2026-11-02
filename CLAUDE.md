# CLAUDE.md — sqrz-cast

See the root `CLAUDE.md` (one level up, shared across all SQRZ repos) for cross-repo/DB context.

## Branches
- Will works from main. Cloud sessions start on a claude/... branch — that is fine while working, but every task ends with: merge into main, push main, delete the claude/ branch (remote and local).
- Only stay on a branch if Will explicitly says "keep it on a branch".
- If a merge conflicts, stop and report — don't push.
- Last line of every report: "Branch: <name> · Commit: <hash> · Pushed to main: yes/no"

## 2026-11-09 — VenueFindr web page removed
`src/routes/venues/` (the VenueFindr venue browser, incl. its `venue_contributors` upsert and `get_random_venues`/`venues`/`locations` reads) deleted; `/venues` removed from the root layout's `standaloneRoutes`. No redirect — `/venues` now 404s. It had no nav links and was not in the sitemap. The privacy page's VenueFindr (iOS app) section is unchanged.
