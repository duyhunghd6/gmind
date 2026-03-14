# Generate Requirements Traceability Matrix (Satisfy Matrix)

Scan the codebase and documentation to generate an RTM.

**Scope / Filter:** $ARGUMENTS

## Steps

1. Identify all `br-prd` IDs in `docs/PRDs/`.
2. Identify all `br-plan` IDs in `docs/plans/` and their `satisfies` links.
3. Identify all `Beads-ID` trailers in recent git commits: `git log -50 --format='%H %s' --grep='Beads-ID'`.
4. Generate a matrix (Markdown table) showing the mapping from PRD Requirements → Plan Elements → Implementation Commits.
5. Save the report to `docs/design/prd-ds-coverage-matrix.md`.
