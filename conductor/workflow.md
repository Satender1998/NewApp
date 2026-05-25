# Workflow - newApp

## TDD Policy

**Moderate.** Tests are encouraged but not blocking. Write tests for non-trivial
logic (e.g. data aggregation, error handling) where they add confidence; small or
purely presentational changes do not require tests before implementation.

## Commit Strategy

**Conventional Commits.** Use structured prefixes:

- `feat:` — a new feature
- `fix:` — a bug fix
- `chore:` — tooling, deps, config
- `docs:` — documentation only
- `refactor:`, `test:`, `style:` — as appropriate

Example: `feat: add /api/welcome endpoint`

## Code Review Requirements

**All changes require review** before merge. Open a pull request for every change,
regardless of size, and obtain approval before merging.

## Verification Checkpoints

**At track completion.** Manual verification is required once, when the entire track
is complete — not after each task or phase. Verify the running app behaves as
specified before closing the track.

## Task Lifecycle

1. **Plan** — a track defines a spec and a phased implementation plan.
2. **Implement** — work through tasks; write tests for non-trivial logic.
3. **Commit** — use Conventional Commit messages, scoped per task.
4. **Review** — open a PR; all changes reviewed before merge.
5. **Verify** — manual verification at track completion.
6. **Close** — mark the track complete in `tracks.md`.
