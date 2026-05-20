---
name: ralph-ui-contract-to-ui
description: Convert a schema-driven ui-contract.md YAML View Blueprint and Mermaid Logic Machine into a simple static HTML preview for human verification.
argument-hint: "--contract <path/to/ui-contract.md> --out <preview-dir>"
---

<!-- beads-id: br-skill-ralph-ui-contract-to-ui -->

# Ralph UI Contract to UI Preview

Use this skill when the user or Ralph Loop Stage 1 needs a quick human-checkable UI preview from `ui-contract.md`.

## Script

Run:

```bash
python3 .claude/skills/ralph-ui-contract-to-ui/scripts/contract_to_ui.py --contract docs/design/contracts/{feature}/ui-contract.md --out docs/design/contracts/{feature}/preview
```

## Inputs

The contract file must contain:

- exactly one fenced YAML block for the View Blueprint
- exactly one fenced Mermaid block for the Logic Machine

## Outputs

- `index.html` — static human preview of screens, states, components, actions, and transitions
- `preview-manifest.json` — parsed summary and warnings

## Constraints

- This is not a production Next.js generator.
- The preview exists to support Gate A review and Stage 1 QA.
- If parsing fails, fix the contract instead of bypassing the preview.
