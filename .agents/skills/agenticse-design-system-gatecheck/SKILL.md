---
name: design-system-gatecheck
description: UI/UX QA pipeline skill with formal gate checks. Guides agents through a schema-driven 12-step process from PRD intake through ui-contract.md validation, visual diff, accessibility audit, and scoring, gated by Gate A and Gate B human approvals. Supports Web, Mobile Web, and Native App targets.
license: Proprietary
metadata:
  author: agent
  version: "1.1.0"
---

<!-- beads-id: br-skill-gatecheck-01 -->

# Design System Gatecheck Skill (V1.1)
> **Architecture Layer:** LAYER 3 (The Details / Execution Rules)  
> **Role:** The Evaluator Agent  
> **Reference:** `spike-design-system-ralph-loop-agent.md`

## Ecosystem Position

```text
LAYER 1: ROOT METHODOLOGY
  spike-design-system-ralph-loop-agent.md

LAYER 2: ORCHESTRATION
  Ralph Loop skills and Stage 1/Stage 2 subagents

LAYER 3: EXECUTOR
  design-system-gatecheck/        Evaluator
  agenticse-design-system/        Implementor
```

## Skill-Internal Map

```text
[ INTAKE ]
  Step 0: Normalize PRD              -> rules/g0-intake-normalize.md
  Step 1: UI Contract Generation     -> rules/g1-contract-generation.md
  Step 2: Contract Compile           -> rules/g2-contract-compile.md
  Gate A: Human UX Approval          -> rules/gate-a-plan-approval.md

[ AUDIT ]
  Step 3: Setup Env                  -> rules/g3-env-deterministic.md
  Step 4: Conformance                -> rules/g4-conformance-test.md
  Step 5: Visual Diff                -> rules/g5-visual-diff.md
  Step 6: Flow & Nav                 -> rules/g6-flow-navigation.md
  Step 7: A11y & Contrast            -> rules/g7-a11y-contrast.md

[ SCORE & RELEASE ]
  Step 8: 100-pt Scoreboard          -> rules/g8-scoring-policy.md
  Step 9: Baseline Sync              -> rules/g9-baseline-governance.md
  Gate B: Human Result Approval      -> rules/gate-b-result-approval.md
```

This skill evaluates the schema-driven Ralph Loop contract model. Stage 1 source of truth is `docs/design/contracts/{feature}/ui-contract.md`, which contains exactly one YAML View Blueprint and exactly one Mermaid Logic Machine. Review diagrams, storyboard review pages, conflict reports, preview HTML, summaries, and scorecards are human/LLM review artifacts. JSON artifacts are machine-executable evidence; evaluator prompts should consume compact failures, `artifact-index.json`, and `context-slices/**/*.yaml` rather than monolithic JSON payloads.

## When to Apply

Trigger this skill when the user asks to:

- Validate a live UI against a UI Contract.
- Generate or evaluate the Stage 1 Gate A contract package.
- Generate visual diff reports across viewport, theme, locale, and state matrix.
- Perform accessibility/contrast audits.
- Set up deterministic UI snapshot testing.
- Score and gate a UI implementation with P0/P1/P2 severity policies.
- Approve or reject UI changes at Gate A or Gate B.

## Pipeline Overview

```text
PRD
  -> ui-contract.md (YAML View Blueprint + Mermaid Logic Machine)
  -> Derived Gate A artifacts
       review-diagrams.md
       flow.md
       storyboards.json
       layout-rules.json
       component-map.json
       artifact-index.json
       context-slices/**/*.yaml
       storyboards-review.html
       prd-ds-conflicts.md
       preview/index.html
  -> Stage 2 implementation
  -> Test runner + browser render artifacts
  -> Scoring & policy engine
  -> Gate B decision
```

## Quick Reference

| Step | Rule File | Description |
| ---- | --------- | ----------- |
| 0 | `g0-intake-normalize` | PRD intake, parsing, gap detection |
| 1 | `g1-contract-generation` | Generate schema-driven `ui-contract.md` and derived Gate A artifacts |
| 2 | `g2-contract-compile` | Compile YAML/Mermaid contract into executable rules and checklist |
| 3 | `g3-env-deterministic` | Lock browser/fonts, disable animations, seed mock data |
| 4 | `g4-conformance-test` | Component existence, hierarchy, geometry, overlap |
| 5 | `g5-visual-diff` | Screenshot comparison across viewport/theme/locale/state |
| 6 | `g6-flow-navigation` | Mermaid/storyboard navigation graph testing |
| 7 | `g7-a11y-contrast` | axe-core/pa11y WCAG audit + contrast checks |
| 8 | `g8-scoring-policy` | Unified scoring and convergence policy |
| 9 | `g9-baseline-governance` | Baseline versioning, historical diff, contract evolution |

## Artifact Directory Convention

```text
docs/design/contracts/{feature}/
  ui-contract.md
  review-diagrams.md
  review-diagrams/*.md
  flow.md
  storyboards.json
  layout-rules.json
  component-map.json
  artifact-index.json
  context-slices/**/*.yaml
  storyboards-review.html
  prd-ds-conflicts.md
  preview/index.html
  preview/preview-manifest.json

docs/design/test-plans/
  {feature}.assertion-checklist.md
  {feature}-qa-stage1.md
  {feature}-qa-stage1-results.md

docs/design/reports/
  {feature}-uiux-report.html
  {feature}-scorecard.json
  {feature}-approval-log.md
```

`contract.yaml`, ASCII wireframes, and ASCII user flows are legacy artifacts and must not be treated as Stage 1 sources of truth.

## Component ID Convention

Every testable component must use the standard Design System ID convention in both the YAML View Blueprint and the implementation:

```html
<nav data-ds-id="ds:comp:top-nav-001">...</nav>
<button data-ds-id="ds:comp:primary-cta-001">...</button>
```

Never use dynamic CSS classes as primary test selectors.

## How to Use

For deep requirements, read only the rule file for the current pipeline step. Do not read all rules at once unless modifying the skill itself.

## Context Budget Rules

- Treat `ui-contract.md` as the source for LLM reasoning.
- Treat JSON artifacts as machine evidence; run full JSON checks mechanically and summarize only counts, mismatches, failed paths, failed rule/trajectory IDs, and owner routing.
- Require large machine artifacts to appear in `artifact-index.json` with `lookup_only` or `summary_only` load policies and matching `context-slices/` or review HTML.
- Prefer YAML/TOON slices for any compiled artifact content that must enter an agent prompt.
- Keep QA feedback diff-only so implementors receive the smallest actionable fix context.

## Full Compiled Document

For the complete explanation across the full pipeline, read `AGENTS.md`.
