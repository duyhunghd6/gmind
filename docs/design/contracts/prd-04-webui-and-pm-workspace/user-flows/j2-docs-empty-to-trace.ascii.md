a-->b
b-->c
c-->d
d-->e
e=>f
f=>g

# Journey 2 — Docs empty state to populated viewer and trace exploration

workspace_shell----->docs_empty_state
docs_empty_state=====>dashboard_home
docs_empty_state----->document_viewer
document_viewer=====>trace_explorer_partial
trace_explorer_partial----->task_detail
docs_error_state----->document_viewer

```text
+==============================+       +==============================+
| Workspace Shell              | open  | Docs Empty State             |
| Header + Search + Sidebar    |------>| Sidebar: Docs active         |
| Connection: Online           |       | No indexed documents yet     |
| Footer links visible         |       | [Run reindex] [Go Home]      |
| Sidebar link: Docs           |       | Empty hint + support copy    |
+==============================+       +==============================+
workspace_shell --> docs_empty_state
open Docs route

+==============================+       +==============================+
| Docs Empty State             | home  | Dashboard Home               |
| Sidebar: Docs active         |------>| KPI row + main panels        |
| No indexed documents yet     |       | Sidebar still available      |
| [Run reindex] [Go Home]      |       | User can restart from shell  |
| Empty hint + support copy    |       | [Open Docs] [Open Tasks]     |
+==============================+       +==============================+
docs_empty_state => dashboard_home
Go Home

+==============================+       +==============================+
| Docs Empty State             | index | Document Viewer              |
| CTA just executed            |------>| Breadcrumb: Docs > PRD-04    |
| Awaiting first indexed doc   |       | Tree: Docs / Chats / PRs     |
| [Run reindex]                |       | Content: PRD-04 markdown     |
| Support copy remains visible |       | [Open Trace] [Back]          |
+==============================+       +==============================+
docs_empty_state --> document_viewer
run reindex complete

+==============================+       +==============================+
| Document Viewer              | back  | Docs Empty State             |
| Breadcrumb: Docs > PRD-04    |<------| Sidebar: Docs active         |
| Tree: Docs / Chats / PRs     |       | No indexed documents yet     |
| Content: PRD-04 markdown     |       | [Run reindex] [Go Home]      |
| [Open Trace] [Back]          |       | Empty hint + support copy    |
+==============================+       +==============================+
document_viewer --> docs_empty_state
Back to Docs home

+==============================+       +==============================+
| Document Viewer              | link  | Trace Explorer Partial       |
| PRD body rendered            |------>| Breadcrumb: Trace > br-s5    |
| br-prd04-s5 highlighted      |       | Badge: GitHub loading        |
| [Open Trace] [Back]          |       | Local nodes already visible  |
| IDs + coverage chip          |       | [Retry enrich] [Back]        |
+==============================+       +==============================+
document_viewer => trace_explorer_partial
click beads link

+==============================+       +==============================+
| Trace Explorer Partial       | back  | Document Viewer              |
| Breadcrumb: Trace > br-s5    |<------| Reopen same PRD view         |
| Badge: GitHub loading        |       | Same PRD and beads links     |
| Local nodes already visible  |       | Scroll + breadcrumb restored |
| [Retry enrich] [Back]        |       | [Back to Task] [Open Trace]  |
+==============================+       +==============================+
trace_explorer_partial --> document_viewer
Back to doc

+==============================+       +==============================+
| Trace Explorer Partial       | open  | Task Detail                  |
| Task node selected           |------>| Header: linked task summary  |
| Partial enrichment badge     |       | Tabs: Detail Activity Graph  |
| [Open task node] [Back]      |       | Status and owners visible    |
| Local graph still usable     |       | [Back to Trace] [Open doc]   |
+==============================+       +==============================+
trace_explorer_partial --> task_detail
open linked task node

+==============================+       +==============================+
| Task Detail                  | back  | Trace Explorer Partial       |
| Header: linked task summary  |<------| Partial graph still usable   |
| Tabs: Detail Activity Graph  |       | Recovery path preserved      |
| Status and owners visible    |       | Local nodes already visible  |
| [Back to Trace] [Open doc]   |       | [Back] [Retry enrich]        |
+==============================+       +==============================+
task_detail => trace_explorer_partial
Back to Trace

+==============================+       +==============================+
| Task Detail                  | open  | Document Viewer              |
| Graph relationship reviewed  |------>| Reopened from task context   |
| Linked requirement visible   |       | Same PRD and beads links     |
| [Open doc] [Back to Trace]   |       | Scroll + breadcrumb restored |
| User wants source prose      |       | [Back to Task] [Open Trace]  |
+==============================+       +==============================+
task_detail --> document_viewer
Open doc

+==============================+       +==============================+
| Document Viewer              | back  | Task Detail                  |
| Reopened from task context   |<------| Header: linked task summary  |
| Same PRD and beads links     |       | Tabs: Detail Activity Graph  |
| Scroll + breadcrumb restored |       | Status and owners visible    |
| [Back to Task] [Open Trace]  |       | [Back to Trace] [Open doc]   |
+==============================+       +==============================+
document_viewer --> task_detail
Back to Task

+==============================+       +==============================+
| Document Viewer              | fail  | Docs Error State             |
| Tree and content pending     |------>| Cannot load docs from Zvec   |
| Route remains /docs          |       | [Retry] [Go Home]            |
| User opened a source item    |       | [Use cached doc] [Open Trace]|
| Fetch timeout shown          |       | Route remains /docs          |
+==============================+       +==============================+
document_viewer => docs_error_state
docs fetch fails

+==============================+       +==============================+
| Docs Error State             | retry | Document Viewer              |
| Recovery options shown       |------>| Breadcrumb: Docs > PRD-04    |
| [Retry] [Use cached doc]     |       | Content restored live        |
| [Open Trace] [Go Home]       |       | Tree and coverage chip back  |
| Error cites Zvec unavailable |       | [Open Trace] [Back]          |
+==============================+       +==============================+
docs_error_state --> document_viewer
Retry succeeds

+==============================+       +==============================+
| Docs Error State             | trace | Trace Explorer Partial       |
| Recovery options shown       |------>| Partial graph still usable   |
| [Retry] [Use cached doc]     |       | Recovery path preserved      |
| [Open Trace] [Go Home]       |       | Local nodes already visible  |
| User chooses alternate route |       | [Back] [Retry enrich]        |
+==============================+       +==============================+
docs_error_state --> trace_explorer_partial
Open Trace

+==============================+       +==============================+
| Docs Error State             | cache | Terminal: Cached Doc Opened  |
| Network still unavailable    |------>| Read-only snapshot loaded    |
| Cached snapshot available    |       | User can continue offline    |
| [Use cached doc]             |       | Return to live docs later    |
| Error banner stays visible   |       | Coverage chip marked stale   |
+==============================+       +==============================+
docs_error_state => cached_doc_opened
Use cached doc

+==============================+       +==============================+
| Docs Error State             | home  | Dashboard Home               |
| Recovery options shown       |------>| KPI row + main panels        |
| [Retry] [Use cached doc]     |       | Sidebar still available      |
| [Open Trace] [Go Home]       |       | User can restart from shell  |
| User leaves docs route       |       | [Open Docs] [Open Tasks]     |
+==============================+       +==============================+
docs_error_state --> dashboard_home
Go Home

+==============================+       +==============================+
| Dashboard Home               | open  | Docs Empty State             |
| KPI row + main panels        |------>| Sidebar: Docs active         |
| Sidebar still available      |       | No indexed documents yet     |
| User can restart from shell  |       | [Run reindex] [Go Home]      |
| [Open Docs] [Open Tasks]     |       | Empty hint + support copy    |
+==============================+       +==============================+
dashboard_home => docs_empty_state
Docs in sidebar
```