---
description: Analyze a batch of performance issues and update the satisfaction matrix (Task Decomposition version)
---

# Update Issue Satisfaction Matrix (Task Decomposition)

This workflow maps performance issues against existing PRDs and Spikes. The empty matrix (`spike-issue-satisfaction-matrix.md`) is assumed to already exist with all rows (issues) and columns (PRD/Spike documents) pre-generated.

## Goal

To properly and accurately cross-reference issues without overloading the LLM's context or exceeding output token limits, the analysis workload is strictly decomposed into smaller batches. The agent will process an overall batch of **50 issues**, divided into **10 individual tasks** (5 issues per task) per execution cycle.

## Task Decomposition Process

Instead of attempting to analyze hundreds of issues in one massive prompt, the agent must systematically process the issues according to the following step-by-step workflow:

### Input Parameter

- **Starting Issue**: Issue number `X` (e.g., `X = 1` means starting from issue 1 to 50).

### Execution Steps for the Agent

When the workflow is triggered for a specific starting issue `X`:

#### Step 1: Comprehensive Context Ingestion

Before analyzing any specific rows or doing any grep searches, the agent **MUST** first read and ingest the contents of all relevant documents to build a complete mental model of the requirements and constraints.

- Process all PRDs in: `/Users/steve/duyhunghd6/gmind/docs/PRDs/`
- Process all Spikes in: `/Users/steve/duyhunghd6/gmind/docs/researches/spikes/`

#### Step 2: Task Listing

List out the 10 specific tasks that will be executed, formatted clearly. For example, if `X = 1`:

- Task 1: Analyze issues 1 to 5 by searching string 'Issue 001: ' ... 'Issue 005: '
- Task 2: Analyze issues 6 to 10 by searching string 'Issue 006: ' ... 'Issue 010: '
  ...
- Task 10: Analyze issues 46 to 50 by searching string 'Issue 046: ' ... 'Issue 050: '

#### Step 3: User Confirmation

Ask the user for explicit confirmation to proceed with the listed tasks using the `notify_user` tool or standard chat interaction. **Do not proceed to step 4 without user confirmation.**

#### Step 4: Iterative Task Execution

Once confirmed, systematically execute each of the 10 tasks (processing 5 issues per task). For each task:

1. **Focus:** Locate the 5 assigned rows in `/Users/steve/duyhunghd6/gmind/docs/researches/spikes/spike-issue-satisfaction-matrix.md` by searching for their specific 'Issue XXX: ' string.
2. **Retrieve:** Use grep/search tools to find specific relevant sections within the PRDs and Spikes if you need to double-check specific details from the documents read in Step 1.
3. **Evaluate:** Determine the satisfaction level for each issue against each document.
4. **Update:** Use the `replace_file_content` or `multi_replace_file_content` tool to edit the specific 5 rows in the matrix.
   - You **MUST** fill the appropriate column cells with a percentage (e.g., `20%`, `30%`, `60%`, `100%`). Leave the cell empty if the document does not address the issue (0%).
   - You **MUST** provide an inline Markdown hyperlink to the specific file and line number that justifies that score using a **relative path** from the matrix file (`docs/researches/spikes/spike-issue-satisfaction-matrix.md`).
   - **Format for PRDs:** `[100%](../../PRDs/PRD-01-Overview.md#L45)`
   - **Format for Spikes:** `[100%](./spike-name.md#L12)`

### Monitor

By strictly limiting the scope to 5 issues per task cycle and reading all source documents upfront, the agent maintains high analytical quality, avoids hallucination, and ensures deep traceability with inline links.
