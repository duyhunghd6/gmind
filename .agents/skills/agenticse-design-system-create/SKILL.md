---
name: agenticse-design-system
description: Design System engineering utilizing schema-driven Ralph Loop contracts. Builds Web/Mobile UI implementations from ui-contract.md plus targeted component/storyboard/layout slices, preview artifacts, and DS manifests; handles components, composite layouts, state matrices, accessibility, and storyboard demos.
license: Proprietary
metadata:
  author: agent
  version: "2.2.0"
---

<!-- beads-id: br-skill-agenticse-design-system -->

# AgenticSE Design System Skill (V2.2 - Web & Mobile)

> **Architecture Layer:** LAYER 3 (The Details / Execution Rules)  
> **Role:** The Implementor Agent  
> **Reference:** `spike-design-system-ralph-loop-agent.md`

## Ecosystem Position

```text
LAYER 1: ROOT METHODOLOGY
  spike-design-system-ralph-loop-agent.md

LAYER 2: ORCHESTRATION
  Ralph Loop Stage 2 skills and builder subagents

LAYER 3: EXECUTOR
  agenticse-design-system/        Implementor
  design-system-gatecheck/        Evaluator
```

## Skill-Internal Map

```text
IF TASK IS: Plan / Setup -> Branch W1 Discover & Plan
  Read: rules/w1-discover-plan.md, rules/enterprise-state-matrix.md

IF TASK IS: Build UI -> Branch W2 Create & Build
  Read: rules/w2-create-build.md, rules/enterprise-components.md

IF TASK IS: Fix QA Bug -> Branch W3 Refine & Align
  Read: rules/w3-refine-align.md, rules/element-diff-protocol.md

IF TASK IS: Ready Merge -> Branch W4 Handoff
  Read: rules/w4-handoff-release.md
```

This skill builds enterprise-grade UI from the Stage 1 schema-driven contract package. The LLM-facing implementation source is `ui-contract.md` with its YAML View Blueprint and Mermaid Logic Machine, plus `flow.md`, review diagrams, preview manifest, and DS manifest/tokens. `component-map.json`, `storyboards.json`, and `layout-rules.json` are compiled artifacts: use them through targeted slices or mechanical checks, not monolithic prompt context.

Do not treat legacy `contract.yaml`, ASCII wireframes, ASCII user flows, or compiled JSON as the source of truth.

## When to Apply

Trigger this skill when the user asks to:

- Plan, structure, or implement new 2D screens for Web or Mobile Apps.
- Build UI from a Ralph Loop Stage 1 Gate A package.
- Define UI components, design tokens, or composite layouts.
- Address accessibility, contrast, state coverage, or style drift.
- Display interactive user journeys and storyboards.
- Provide visual before/after review packages.
- Maintain the Design System Showcase Hub.

## Rule Categories by Priority

| Priority | Category | Impact | Description |
| --- | --- | --- | --- |
| 1 | Protocols | CRITICAL | Element diffing and Design System Hub operations |
| 2 | Workflows | HIGH | W1 to W4 workflows across Web and Mobile targets |
| 3 | Enterprise Standards | MODERATE | Layouts, tokens, components, states, storyboards |

## Quick Reference

- `w1-discover-plan` — plan declaration and contract ingestion.
- `w2-create-build` — build UI from schema-driven contract artifacts.
- `w3-refine-align` — apply prioritized QA/auditor fixes.
- `w4-handoff-release` — create handoff packages and release notes.
- `enterprise-state-matrix` — state coverage rules.
- `enterprise-storyboards` — interaction demo rules.

## DS ID Convention

Every Design System element has a unique ID for cross-referencing by agents and humans.

```text
ds:<type>:<name-NNN>
```

| Type | Example | Applies to |
| --- | --- | --- |
| `hub` | `ds:hub:overview-001` | Hub pages |
| `screen` | `ds:screen:terminal-001` | Full-page screens |
| `comp` | `ds:comp:button-001` | Components |
| `token` | `ds:token:colors-001` | Design tokens |
| `layout` | `ds:layout:grid-001` | Layout patterns |
| `state` | `ds:state:matrix-001` | State matrix entries |
| `flow` | `ds:flow:explore-001` | User flow definitions |

Implementation components must use `data-ds-id="ds:..."` values from the YAML View Blueprint, verified by targeted `component-map.json` slices.

## Context Budget Rules

- Prefer YAML/Mermaid over compiled JSON when deciding what to build.
- If a compiled artifact is needed, extract only the relevant screen/state/viewport/`ds_id` rows and restate them as compact YAML/TOON before coding.
- Query the DS registry by component ID or token name instead of injecting the entire registry.
- Feedback from QA/auditors should be diff-only: missing IDs, failed assertions, invalid tokens, and specific responsible builder routing.

## Key Files

- Stage 1 source: `docs/design/contracts/{feature}/ui-contract.md`
- Component map slices/checks: `docs/design/contracts/{feature}/component-map.json`
- Storyboard slices/checks: `docs/design/contracts/{feature}/storyboards.json`
- Layout rule slices/checks: `docs/design/contracts/{feature}/layout-rules.json`
- Preview manifest: `docs/design/contracts/{feature}/preview/preview-manifest.json`
- Registry: `<frontend-src-dir>/data/ds-registry.ts` or project DS registry equivalent

## Full Compiled Document

For the complete explanation across Web and Mobile workflows, read `AGENTS.md`.
