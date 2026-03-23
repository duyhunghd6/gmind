# Journey 2 — Docs empty state to populated viewer and trace exploration

```text
[J2-A] Workspace Shell                    ──[open Docs route]──►                    [J2-B] Docs Empty State
+====================================+                                              +====================================+
| Workspace Shell                    |                                              | Docs Empty State                   |
| Header + Search + Sidebar          |                                              | Sidebar: Docs active               |
| Connection: Online                 |                                              | No indexed documents yet           |
| Footer links visible               |                                              | [Run reindex] [Go Home]            |
| Sidebar link: Docs                 |                                              | Empty hint + support copy          |
+====================================+                                              +====================================+
                                                                                                 │
                                                                                                 │ ──[run reindex complete]──►
                                                                                                 ▼
                                                                                   [J2-C] Document Viewer
                                                                                   +====================================+
                                                                                   | Document Viewer                    |
                                                                                   | Breadcrumb: Docs > PRDs            |
                                                                                   | Tree: Docs / Chats / PRs           |
                                                                                   | Content: PRD-04 markdown           |
                                                                                   | Linked IDs + coverage chip         |
                                                                                   | [Open Trace] [Back to Docs]        |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[click Open Trace]──►
                                                                                                 ▼
                                                                                   [J2-D] Trace Explorer Partial
                                                                                   +====================================+
                                                                                   | Trace Explorer Partial             |
                                                                                   | Breadcrumb: Trace > s5             |
                                                                                   | Badge: GitHub data loading         |
                                                                                   | Local nodes already visible        |
                                                                                   | [Retry enrich] [Back to doc]       |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 │ ──[open linked task node]──►
                                                                                                 ▼
                                                                                   [J2-E] Task Detail
                                                                                   +====================================+
                                                                                   | Task Detail                        |
                                                                                   | Header: linked task summary        |
                                                                                   | Tabs: Detail Activity Graph        |
                                                                                   | Header back link visible           |
                                                                                   | Status and owners visible          |
                                                                                   +====================================+

[J2-C] Document Viewer                  ──[Back to Docs]──►                        [J2-B] Docs Empty State
+====================================+                                              +====================================+
| Document Viewer                    |                                              | Docs Empty State                   |
| Mobile/tablet back path preserved  |                                              | Empty route context restored       |
| Breadcrumb and docs tree visible   |                                              | CTA remains available              |
| User can change source selection   |                                              | User can retry indexing            |
+====================================+                                              +====================================+

[J2-D] Trace Explorer Partial            ──[Back to doc]──►                        [J2-C] Document Viewer
+====================================+                                              +====================================+
| Trace Explorer Partial             |                                              | Document Viewer                    |
| Partial badge still visible        |                                              | Previously selected doc restored   |
| Recovery path keeps local graph    |                                              | Breadcrumb and content preserved   |
| [Retry enrich] [Back to doc]       |                                              | [Open Trace] [Back to Docs]        |
+====================================+                                              +====================================+

[J2-E] Task Detail                       ──[open linked document]──►               [J2-C] Document Viewer
+====================================+                                              +====================================+
| Task Detail                        |                                              | Document Viewer                    |
| Related document chip selected     |                                              | Same doc reopened from task        |
| Task context remains readable      |                                              | Linked IDs and coverage visible    |
| [Back to Trace] available          |                                              | Breadcrumb: Docs > PRDs            |
+====================================+                                              +====================================+
          │
          │ ──[Back to Trace]──►
          ▼
[J2-D] Trace Explorer Partial
+====================================+
| Trace Explorer Partial             |
| Prior node selection restored      |
| Context returns to graph           |
| User keeps exploration state       |
+====================================+

[J2-C] Document Viewer                  ──[docs fetch fails]──►                    [J2-F] Docs Error State
+====================================+                                              +====================================+
| Document Viewer                    |                                              | Docs Error State                   |
| Tree and content request pending   |                                              | Cannot load docs from Zvec         |
| User attempted to open a source    |                                              | [Retry] [Go Home]                  |
| Route remains /docs                |                                              | [Use cached doc] [Open Trace]      |
+====================================+                                              | Recovery steps listed              |
                                                                                   +====================================+
                                                                                                 │
                                                                                                 ├──[Retry]──► [J2-C] Document Viewer
                                                                                                 │
                                                                                                 ├──[Open Trace]──► [J2-D] Trace Explorer Partial
                                                                                                 │
                                                                                                 ├──[Use cached doc]──► [J2-G] Terminal: Cached Doc Opened
                                                                                                 │                    +====================================+
                                                                                                 │                    | Terminal: Cached Doc Opened        |
                                                                                                 │                    | Read-only snapshot loaded          |
                                                                                                 │                    | User can continue offline          |
                                                                                                 │                    | Journey ends in safe mode          |
                                                                                                 │                    +====================================+
                                                                                                 │
                                                                                                 └──[Go Home]──► [J2-H] Terminal: Home Returned
                                                                                                                      +====================================+
                                                                                                                      | Terminal: Home Returned            |
                                                                                                                      | User left Docs journey             |
                                                                                                                      | Shell stays available              |
                                                                                                                      | No pending Docs action             |
                                                                                                                      +====================================+
```