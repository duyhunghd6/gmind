# Ralph Loop Skill Technical Decisions

<!-- beads-id: br-skill-ralph-loop-decisions -->

## Decision 1: Use Claude Code Skills as Slash Command Entry Points

<!-- beads-id: br-skill-ralph-loop-decisions-s1 -->

Use `.claude/skills/<skill-name>/SKILL.md` for Ralph Loop commands instead of creating new `.claude/commands/*.md` files.

**Why:** Claude Code now supports project-local skills as command entry points, and the requested workflow should follow the modern skill layout.

**How to apply:** Add new Ralph Loop entry points under `.claude/skills/`. Do not add new legacy command files. If an existing `.claude/commands/*` file must remain, treat it as a compatibility shim only.

## Decision 2: Keep the Master Skill as a Thin Dispatcher

<!-- beads-id: br-skill-ralph-loop-decisions-s2 -->

`ralph-loop` should orchestrate init, Stage 1, Stage 2, Gate A, and Gate B handoffs without generating contracts, scoring artifacts, or writing implementation code inline.

**Why:** Subagents get fresh context per dispatch, and Ralph Loop convergence depends on explicit disk artifacts plus scorecards passed between iterations.

**How to apply:** Put artifact generation in Stage 1 generator subagents, implementation in Stage 2 builder subagents, and scoring in evaluator/auditor/QA subagents. The skill should route and summarize.

## Decision 3: Make `ui-contract.md` the Stage 1 Source of Truth

<!-- beads-id: br-skill-ralph-loop-decisions-s3 -->

The canonical Stage 1 contract is `docs/design/contracts/{feature}/ui-contract.md`, containing exactly one YAML View Blueprint fenced block and exactly one Mermaid Logic Machine fenced block.

**Why:** A single schema-driven contract reduces drift between separate YAML, wireframe, flow, and storyboard artifacts.

**How to apply:** Generate `review-diagrams.mmd`, `flow.mmd`, `storyboards.json`, `layout-rules.json`, `component-map.json`, conflict reports, assertion checklists, and preview output as derived artifacts. Do not treat legacy `contract.yaml`, ASCII wireframes, or ASCII user flows as canonical.

## Decision 4: Python Preview Script Is for Human Verification Only

<!-- beads-id: br-skill-ralph-loop-decisions-s4 -->

The converter skill should generate a simple static preview from YAML and Mermaid blocks, not production Next.js, Go codegen, or final UI implementation.

**Why:** The requested goal is a human-checkable bridge for Gate A, not deterministic production UI generation.

**How to apply:** Keep `.claude/skills/ralph-ui-contract-to-ui/scripts/contract_to_ui.py` small and mechanical. Prefer warnings and manifest output over hidden inference. Stage 2 builders still own final UI implementation.

## Decision 5: RFT Data Should Be Logged Separately From Contract Artifacts

<!-- beads-id: br-skill-ralph-loop-decisions-s5 -->

RFT session traces, scorecards, and labels should live in dataset/log locations, not inside `docs/design/contracts/{feature}/`.

**Why:** Training traces are evidence about agent behavior, while contract artifacts are the product design source and derived review package.

**How to apply:** Use `docs/rft-dataset/`, `docs/eval-dataset/`, or `.claude/rft-session-logs/` for traces and labels. Do not let training logs become inputs to Stage 2 implementation unless a human explicitly asks for debugging context.

## Decision 6: Session Logging Hook Must Be Opt-In

<!-- beads-id: br-skill-ralph-loop-decisions-s6 -->

The hook helper at `.claude/skills/ralph-loop/hooks/rft_session_logger.py` is provided but not enabled automatically.

**Why:** Claude session hooks can capture prompts, tool names, file paths, and workflow metadata. That can be useful for RFT, but it can also capture sensitive data if enabled globally.

**How to apply:** If a human approves session logging, add hook entries to the appropriate Claude Code settings file and start with metadata-only logging. Enable full prompt excerpts only for controlled eval runs.

Example opt-in settings shape:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 .claude/skills/ralph-loop/hooks/rft_session_logger.py"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 .claude/skills/ralph-loop/hooks/rft_session_logger.py"
          }
        ]
      }
    ]
  }
}
```

Before enabling this hook, decide whether logs should be ignored by git, retained under `docs/rft-dataset/`, or uploaded to an external RFT pipeline.
