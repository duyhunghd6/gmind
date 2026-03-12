---
description: Ingest detailed chat sessions, extract essentials, and compact them into a structured AI Workflow JSON format.
---

# 📋 Workflow: AI Workflows Ingestion (Chat Session → JSON)

<!-- beads-id: br-workflow-aiworkflows-ingest -->

> **PURPOSE:** This workflow guides the Agent (acting as AI Agent Architect) to analyze
> a user's chat session or sample scenarios, extract the most critical action points,
> and structure them into a reusable AI Workflow JSON file.
>
> **STORAGE:** Current storage path is `apps/website/src/data/workflows/`
> **FORMAT:** JSON structure following the Flow Chart diagram model (tree/flowchart).
> **CONSTRAINT:** Cross-reference with `docs/PRDs/apps-website/PRD-01-Prompts-Library.md`
> when initializing categories and structure.

---

<!--
====================================================================
  LAYER 1 — THE SKELETON (Ecosystem Hierarchy)
  The Map. High-level context only. Orients the Agent on the
  overall architecture and category system.
====================================================================
-->

## Layer 1: Ecosystem Hierarchy (The Skeleton)

This workflow belongs to the **Prompt Palettes** system on the Gmind Showcase website.
Every ingested workflow MUST be classified into one of the 4 canonical categories:

| Prefix | Category                    |
|--------|-----------------------------|
| **A.** | Project Bootstrap           |
| **B.** | One-shot AI Coding          |
| **C.** | XP Agentic Coding           |
| **D.** | SAFe 6.0 AgenticSE          |

Sub-workflows are numbered `{CategoryLetter}.{SeqNumber}` (e.g., A.1, C.5, D.2).

**Key artefacts:**
- Workflow JSONs live at `apps/website/src/data/workflows/`
- Registry file: `apps/website/src/data/workflows/workflow-prompts.ts` → `workflowCategories`
- PRD reference: `docs/PRDs/apps-website/PRD-01-Prompts-Library.md`

---

<!--
====================================================================
  LAYER 2 — THE BRANCHES (Role-Selection)
  The Logic. Forces the Agent to select a role: Ingester or Validator.
  Reduces tokens by pruning irrelevant context.
====================================================================
-->

## Layer 2: Role Selection (The Branches)

Before executing, the Agent MUST identify its current role:

### 🔵 Role A — Ingester (Creating a new workflow)
Read **Phase 1 → Phase 3** below. Your job is to:
1. Collect raw chat session input.
2. Digest, extract, and structure it into Flow Chart JSON.
3. Write the JSON file and register it.

### 🟠 Role B — Validator (Reviewing an existing workflow)
Read **Phase 4** only. Your job is to:
1. Validate that all `nextNodeId` references form a complete, unbroken chain.
2. Verify the JSON file is registered in `workflow-prompts.ts`.
3. Confirm the title uses the correct `{Prefix}.{Seq}` naming convention.

---

<!--
====================================================================
  LAYER 3 — THE DETAILS (Step-by-Step Execution)
  The Action. Once a role is selected in Layer 2, this layer holds
  the concrete markdown instructions for each phase.
====================================================================
-->

## Layer 3: Step-by-Step Execution (The Details)

### Phase 1 — Input Collection

1. **Request input:** Proactively ask the user to provide the full raw chat session log, or the history of previous effective work sessions.
2. **Determine category:** Based on the scenario content, automatically classify or suggest one of the 4 canonical categories (A / B / C / D) from Layer 1.

### Phase 2 — Ingestion & Extraction

From the raw chat session, the Agent must:

- **Strip noise:** Remove all redundant chatter, errors, or off-topic exchanges. Keep only the essential actions.
- **Segment into Nodes:** Divide the flow into discrete Nodes (Steps).
- **Extract metadata per Node:**
  - Who performs the action? (`Role: User` or `Role: Agent`).
  - What is the core prompt / command behind this step?
  - Where are the branch points (Next Steps / Loops)? (e.g., Test Fail → loop back to Bug-report Node).

### Phase 3 — JSON Flow Chart Construction

Structure the extracted Node chain into the standard JSON format ready for the Showcase system.

**JSON file template (e.g., `D.X_Ingest_Design.json`):**

```json
{
  "id": "wf-short-identifier",
  "title": "[Prefix].[Seq] Workflow Name",
  "description": "Concise summary of the value this prompt chain delivers to the AI.",
  "steps": [
    {
      "id": "step-1",
      "title": "Step 1 Action Name",
      "role": "User",
      "description": "Clear description of this processing step.",
      "input": "Input data",
      "output": "Expected output",
      "loopGroup": "Planning | Execution | Verification",
      "promptText": "The sharpest, most essential prompt/command for the AI (most important content).",
      "guidanceContext": "High-level context so the AI knows its position and does not lose its way.",
      "exampleDetails": "Practical example from the project (if extracted from the chat).",
      "nextSteps": [
        {
          "conditionLabel": "Condition to proceed to step 2",
          "nextNodeId": "step-2"
        }
      ]
    },
    {
      "id": "step-2",
      "title": "Step 2 Action Name",
      "role": "Agent",
      "description": "...",
      "nextSteps": []
    }
  ]
}
```

> **Note:** For terminal `nextNodeId` entries that loop back, set `"isLoopBack": true`.

### Phase 4 — Validation, Storage & Output

1. **Flow validation:** Ensure all `nextNodeId` references form a complete, unbroken logical chain.
2. **Generate JSON file:** Export the finalized JSON content.
3. **Storage:** Write the JSON file to `apps/website/src/data/workflows/` using a professionally categorized filename (e.g., `SAFe_Ingestion_Session.json`). The JSON **title** MUST include the category prefix (e.g., `C.6 Extracted Workflow Name`).
4. **Hooking:** Report the completed JSON back to the user. Additionally, suggest adding the import for the newly created JSON to the master registry file `apps/website/src/data/workflows/workflow-prompts.ts`.
