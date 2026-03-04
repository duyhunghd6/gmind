# Gmind Showcase Website — User Flows

## Flow 1: Discovery (Landing → Deep Dive)

```
[Landing Page]
    │
    ├── Read Hero: "Gmind Monorepo & Showcase"
    ├── Scan 4 Pillars (Code Intel, SSOT, SAFe, Ecosystem)
    ├── View 5+1 Layer Architecture overview
    │
    └── CTA: Click "Architecture" in Nav
         │
         └── [/architecture]
              ├── Detailed 5+1 Layer breakdown
              ├── Universal Tracking (Beads-ID) visualization
              └── RTM 3-layer traceability diagram
```

## Flow 2: Prompt Copy (Browse → Copy → Use)

```
[Landing Page]
    │
    └── CTA: Click "Prompts" in Nav
         │
         └── [/prompts]
              ├── Browse Workflows section
              │   ├── /gsafe-research → Click "Copy" → Clipboard
              │   └── /gsafe-showcase-website → Click "Copy" → Clipboard
              │
              └── Browse Agent Rules section
                  ├── gmind search-codebase → Click "Copy"
                  ├── gmind context → Click "Copy"
                  ├── gmind trace → Click "Copy"
                  ├── Git Commit Convention → Click "Copy"
                  ├── File Locking → Click "Copy"
                  └── Four-Eyes Principle → Click "Copy"
```

## Flow 3: Research Exploration (Understand what was researched)

```
[Landing Page]
    │
    └── CTA: Click "Research" in Nav
         │
         └── [/research]
              ├── View stats: 3 PRDs, 6 Completed, 2 Pending
              │
              ├── PRDs section
              │   ├── PRD-01: 5-Layer Architecture
              │   ├── PRD-02: Storage & Universal Tracking
              │   └── PRD-03: CLI & Agent Workflow
              │
              ├── Completed Spikes section
              │   ├── FrankenSQLite vs DoltDB
              │   ├── FastCode CLI Integration
              │   ├── Beads Knowledge Graph Engine
              │   ├── GitHub Ecosystem Integration
              │   ├── Polyglot Monorepo Design
              │   └── Beads ID in Documents
              │
              └── Pending Spikes section
                  ├── Graph Assembler Performance
                  └── Zvec Indexer Pipeline
```

## Flow 4: GitHub Visitor (External → Explore → Copy)

```
[GitHub README link]
    │
    └── gmind.gscfin.com
         │
         ├── [Landing] → Quick understanding of 4 pillars
         ├── [/architecture] → Technical deep dive
         ├── [/prompts] → Copy workflow templates
         └── [/research] → Understand research rigor
```

## Navigation Map

```
                    ┌─────────────┐
                    │   Navbar    │
                    │  (sticky)   │
                    └──────┬──────┘
                           │
          ┌───────┬────────┼─────────┬──────────┐
          ▼       ▼        ▼         ▼          ▼
       [Home]  [Arch]  [Prompts] [Research]  [GitHub↗]
         │       │        │         │
         │       │        │         │
         └───────┴────────┴─────────┘
                    │
              ┌─────┴─────┐
              │  Footer   │
              │ (links)   │
              └───────────┘
```
