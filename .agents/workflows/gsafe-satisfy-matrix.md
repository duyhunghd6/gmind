---
description: Generate a satisfaction matrix mapping performance issues to PRDs and Spikes
---

# Generate Issue Satisfaction Matrix

This workflow analyzes the top 500 performance issues against existing PRDs and Spikes to create a traceability matrix, verifying which issues are currently addressed by the system's design.

## Goal

Process issues in manageable batches (10 at a time), search for solutions in the PRDs and Spikes, and append the results as a matrix to a centralized research report.

## Input Parameters

- **Issue Batch `X`**: The starting point. For example, starting from issue `X` means processing 10 issues (from `X` to `X + 9`).

## Steps

1. **Extract the Target Issues**:
   - Read `/Users/steve/duyhunghd6/gmind/docs/researches/spikes/spike-500-performance-issues.md`.
   - Identify and extract the 10 issues corresponding to the input `X` (e.g., issues `X` through `X + 9`).

2. **Cross-Reference with PRDs and Spikes**:
   - Scan and retrieve context from the `/Users/steve/duyhunghd6/gmind/docs/PRDs/` directory.
   - Scan and retrieve context from the `/Users/steve/duyhunghd6/gmind/docs/researches/spikes/` directory.
   - For each of the 10 extracted issues, analyze the documentation to determine if the issue is solved, mitigated, or addressed.

3. **Generate the Matrix**:
   - Create a markdown table mapping the issues to the documentation.
   - **Rows**: The 10 specific performance issues.
   - **Columns**: The PRDs and Spikes that emerged as relevant during the cross-reference search. _(Note: Only include columns for documents that satisfy at least one issue in the batch)._
   - **Cells**: Place a `V` in the cell if the document (column) satisfies the issue (row). Leave the cell empty otherwise.

4. **Append to the Satisfaction Report**:
   - Target document: `/Users/steve/duyhunghd6/gmind/docs/researches/spikes/spike-issue-satisfaction-matrix.md`
   - If the document does not exist, create it with standard Spike Report headers (compliant with Continuous Exploration rules).
   - Append the generated matrix under a clear heading indicating the issue range (e.g., `### Issues X to X+9`).
