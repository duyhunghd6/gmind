---
description: Guide to the GSAFe 6.0 Agent System and available Workflows
---

# 🤖 Control Panel: GSAFe 6.0 Assistant (Antigravity Agent)

Welcome to the **Gmind SAFe 6.0 (GSAFe)** system. I am your internal AI Agent, designed to automate the stages of the software development lifecycle according to the SAFe 6.0 standard.

The `/help` workflow serves as a "Mind Map" to orient you and direct you to the correct Agentic Workflows.

---

## 🧭 SAFe 6.0 Overview in Gmind

Instead of traditional ad-hoc coding, GSAFe 6.0 follows a chain of activities that can be decomposed into AI Task Boundaries:

1. **Continuous Exploration (CE):** Market research, PRD creation, and UI/UX Contract approval. (Gate A activity).
2. **Continuous Integration (CI):** The code-write, automated-test (Playwright/Axe), and continuous-verification loop (The Autonomous Ralph Loop).
3. **Continuous Deployment (CD):** Final Review (Gate B) and safe merge into the main branch.
4. **Agile Release Train (ART) & Iterations:** Automatic adjustment of older PRDs when logic gaps are detected during CI.

---

## 🚀 Available Workflows (AI Agent Workflows)

Below are the Slash Commands you can ask me to execute to start working:

### A. UI/UX & Design System Development Pipeline
*Focused on the UI CI/CD stage with automated E2E testing.*

👉 **`/gsafe-uiux-ralph-loop-antigravity`** (Recommended for Web/App UI/UX)
* **Full Name:** SAFe 6.0 Agentic UI/UX Convergence Pipeline (Antigravity Task-Mode)
* **Function:** Immediately activates the **Ralph Loop**. I will act as both the Planner (Evaluator) and the HTML/CSS coder (Implementor) based on the Design System, then self-test for UI defects (Playwright) and self-fix code until the convergence score is met (Score >= 95). Only then will I hand off to you for Release (Gate B).
* **Usage:** `@invoke /gsafe-uiux-ralph-loop-antigravity for PRD file: docs/PRDs/...`

👉 **`/arch-review-prd-after-design-system`**
* **Full Name:** PRD & Design System Review and Sync Loop
* **Function:** Cross-checks the existing Design System code against the PRD to identify any missing scenarios (State/Storyboard). Outputs a `prd-ds-coverage-matrix.md` and refines the Agile PRD.

👉 **`/create-gsafe-design-system`**
* **Function:** Bootstraps from scratch and iteratively refines a GSAFe 6.0 standard Design System (Glassmorphism, State Management, High-Density Interfaces).

### B. Research & Analysis (Continuous Exploration Spikes)
*Focused on the CE Phase — planning and data analysis before coding.*

👉 **`/gsafe-research`**
* **Function:** Runs the standard 4 CE activities (Hypothesize, Collaborate & Research, Architect, Synthesize) before PI Planning. Produces Spike Reports instead of code.

👉 **`/gsafe-aiworkflows-ingest`**
* **Function:** Reads old chat logs, extracts data, and automatically generates a new AI Workflow JSON for the `/prompts` library page.

👉 **`/gsafe-satisfy-matrix`**
* **Function:** Analyzes a batch of performance issues and updates the satisfaction matrix (Task Decomposition version).

### C. Project Bootstrap & Infrastructure Management

👉 **`/init-gsafe-project`**
* **Function:** Scaffolds the core directory structure of a GSAFe 6.0 project.

👉 **`/gsafe-showcase-website`**
* **Function:** Specialized workflow for developing Components on the Gmind Showcase website.

👉 **`/gsafe-showcase-website-uiux-detail`**
* **Function:** Specialized UI/UX detail auditing (Keyboard interactions, Focus, A11y, Contrast) on the Gmind Showcase website.

---

## ⚡ Quick Start Guide

If you already have a **UI PRD file**, copy and send me the following command to let the machine start working:

> *"Run workflow `/gsafe-uiux-ralph-loop-antigravity` based on the PRD at `/docs/PRDs/[filename].md`"*

Or if you want me to create a PRD / do research first, use: `/gsafe-research`.
