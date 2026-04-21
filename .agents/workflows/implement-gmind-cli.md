---
description: Guide for agents to implement Gmind CLI issues step-by-step
---

# Implement Gmind CLI Workflow

This workflow is a 4-step pipeline designed for agents to pick up and implement a single Gmind CLI issue from the `beads` tracker from start to finish. 

Follow these steps exactly in each run:

## Step 1: Get an Issue
Use the `bv` (beads_viewer) agent skill located within the `beads-mem` agent skill suite. Query the Beads tracker to retrieve the details of **one** active beads issue that requires implementation.
- After selecting a beads issue, you **must claim** it so that other agents do not claim it.

## Step 2: Examine and Understand
Before writing any code, examine the issue carefully:
- Read the issue description to locate related tags and sections linking to `PRD-03` and `PRD-00` (Vision and Architecture).
- Search the codebase and use `gmind context` to understand the existing scaffolding. 
- Map out the related tasks and understand the internal dependencies to ensure your implementation aligns with the overarching architecture.

## Step 3: Implement the Issue
Act as the primary Developer Agent (Code Sub-agent). 
- Write the required Golang logic within the corresponding `cli/gmind/cmd/` file.
- Ensure the code follows project standards and is adequately modular.
- Do not mark the task as complete blindly; stop after the code is fully implemented.

## Step 4: Quality Assurance (QA) Verification
Act as the QA / Reviewer Agent.
- Verify the task's implementation result against the expected outcomes and specifications in the PRDs.
- Run necessary tests and verification steps to ensure technical correctness.
- Conclude the implementation loop only after verification passes.
- **Note:** Always update the status of the beads issue after the implementation result is complete (or not complete).

## Step 5: Version Control
Ask Human in the loop to commit the changes to git (commit only, do not push).
- **CRITICAL**: Suggest a highly detailed commit message for the human that can be used for future debugging. It MUST include:
  - What was done in detail.
  - The Beads ID and any related Universal IDs.
  - Architecture decisions made during implementation.
  - Any bugs encountered and the solution decisions.
