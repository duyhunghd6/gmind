# Journey 2 - Docs empty state to populated viewer and trace exploration

```text
+========================+       +========================+
| Workspace Shell        |       | Docs Empty State       |
| Header Search Bell     |       | Breadcrumb Docs        |
| Sidebar Dash Board     |       | No indexed documents   |
| Tasks Trace Docs       |       | Run reindex to start   |
| Status Online          |       | Reindex now Home Back  |
+========================+       +========================+
Workspace Shell ──[open docs]──► Docs Empty State

+========================+       +========================+
| Docs Empty State       |       | Workspace Shell        |
| Breadcrumb Docs        |       | Header Search Bell     |
| No indexed documents   |       | Sidebar Dash Board     |
| Run reindex to start   |       | Tasks Trace Docs       |
| Reindex now Home Back  |       | Status Online          |
+========================+       +========================+
Docs Empty State ──[back]──► Workspace Shell

+========================+       +========================+
| Docs Empty State       |       | Dashboard Home         |
| Breadcrumb Docs        |       | Header Search Bell     |
| No indexed documents   |       | Sidebar Dash active    |
| Run reindex to start   |       | KPI row 4 panels       |
| Reindex now Home Back  |       | Docs shortcut Back     |
+========================+       +========================+
Docs Empty State ──[go home]──► Dashboard Home

+========================+       +========================+
| Dashboard Home         |       | Docs Empty State       |
| Header Search Bell     |       | Breadcrumb Docs        |
| Sidebar Dash active    |       | No indexed documents   |
| KPI row 4 panels       |       | Run reindex to start   |
| Docs shortcut Back     |       | Reindex now Home Back  |
+========================+       +========================+
Dashboard Home ──[back]──► Docs Empty State

+========================+       +========================+
| Docs Empty State       |       | Docs Loading           |
| Breadcrumb Docs        |       | Breadcrumb Docs        |
| No indexed documents   |       | Reindex in progress    |
| Run reindex to start   |       | Tree skeleton          |
| Reindex now Home Back  |       | Content skeleton       |
+========================+       +========================+
Docs Empty State ──[reindex now]──► Docs Loading

+========================+       +========================+
| Docs Loading           |       | Document Viewer        |
| Breadcrumb Docs        |       | Breadcrumb Docs PRD    |
| Reindex in progress    |       | Filter Type            |
| Tree skeleton          |       | Tree PRD-04 selected   |
| Content skeleton       |       | Open in Trace Back     |
+========================+       +========================+
Docs Loading ──[reindex complete]──► Document Viewer

+========================+       +========================+
| Document Viewer        |       | Trace Explorer Partial |
| Breadcrumb Docs PRD    |       | Breadcrumb Trace       |
| Filter Type            |       | Root br-prd04-s5       |
| Tree PRD-04 selected   |       | Graph canvas loaded    |
| Open in Trace Back     |       | Open task Back         |
+========================+       +========================+
Document Viewer ──[open trace]──► Trace Explorer Partial

+========================+       +========================+
| Trace Explorer Partial |       | Task Detail            |
| Breadcrumb Trace       |       | Back to Tasks          |
| Root br-prd04-s5       |       | bd-x1y2 requirement    |
| Graph canvas loaded    |       | Detail Activity        |
| Open task Back         |       | Linked doc Back        |
+========================+       +========================+
Trace Explorer Partial ──[open task]──► Task Detail

+========================+       +========================+
| Task Detail            |       | Cached Doc Opened      |
| Back to Tasks          |       | Breadcrumb Docs PRD    |
| bd-x1y2 requirement    |       | Cached content banner  |
| Detail Activity        |       | Last synced 2m ago     |
| Linked doc Back        |       | Resume trace Exit      |
+========================+       +========================+
Task Detail ──[open linked doc]──► Cached Doc Opened

+========================+       +========================+
| Cached Doc Opened      |       | Trace Explorer Partial |
| Breadcrumb Docs PRD    |       | Breadcrumb Trace       |
| Cached content banner  |       | Root br-prd04-s5       |
| Last synced 2m ago     |       | Graph canvas loaded    |
| Resume trace Exit      |       | Open task Back         |
+========================+       +========================+
Cached Doc Opened ──[resume trace]──► Trace Explorer Partial

+========================+       +========================+
| Trace Explorer Partial |       | Document Viewer        |
| Breadcrumb Trace       |       | Breadcrumb Docs PRD    |
| Root br-prd04-s5       |       | Filter Type            |
| Graph canvas loaded    |       | Tree PRD-04 selected   |
| Open task Back         |       | Open in Trace Back     |
+========================+       +========================+
Trace Explorer Partial ──[back]──► Document Viewer

+========================+       +========================+
| Document Viewer        |       | Docs Empty State       |
| Breadcrumb Docs PRD    |       | Breadcrumb Docs        |
| Filter Type            |       | No indexed documents   |
| Tree PRD-04 selected   |       | Run reindex to start   |
| Open in Trace Back     |       | Reindex now Home Back  |
+========================+       +========================+
Document Viewer ──[breadcrumb docs]──► Docs Empty State

+========================+       +========================+
| Cached Doc Opened      |       | Exit Route             |
| Breadcrumb Docs PRD    |       | Leaving Docs           |
| Cached content banner  |       | Return to previous app |
| Last synced 2m ago     |       | Session preserved      |
| Resume trace Exit      |       | Go back Finish         |
+========================+       +========================+
Cached Doc Opened ──[exit]──► Exit Route

+========================+       +========================+
| Exit Route             |       | Cached Doc Opened      |
| Leaving Docs           |       | Breadcrumb Docs PRD    |
| Return to previous app |       | Cached content banner  |
| Session preserved      |       | Last synced 2m ago     |
| Go back Finish         |       | Resume trace Exit      |
+========================+       +========================+
Exit Route ──[back]──► Cached Doc Opened

+========================+       +========================+
| Exit Route             |       | Journey Complete       |
| Leaving Docs           |       | Docs review finished   |
| Return to previous app |       | Trace handoff saved    |
| Session preserved      |       | Reading position kept  |
| Go back Finish         |       | End state recorded     |
+========================+       +========================+
Exit Route ──[finish]──► Journey Complete

+========================+       +========================+
| Docs Loading           |       | Docs Error State       |
| Breadcrumb Docs        |       | Breadcrumb Docs        |
| Reindex in progress    |       | Index failed           |
| Tree skeleton          |       | Zvec timeout           |
| Content skeleton       |       | Retry Open cache Home  |
+========================+       +========================+
Docs Loading ──[reindex fails]──► Docs Error State

+========================+       +========================+
| Docs Error State       |       | Docs Loading           |
| Breadcrumb Docs        |       | Breadcrumb Docs        |
| Index failed           |       | Reindex in progress    |
| Zvec timeout           |       | Tree skeleton          |
| Retry Open cache Home  |       | Content skeleton       |
+========================+       +========================+
Docs Error State ──[retry]──► Docs Loading

+========================+       +========================+
| Docs Error State       |       | Cached Doc Opened      |
| Breadcrumb Docs        |       | Breadcrumb Docs PRD    |
| Index failed           |       | Cached content banner  |
| Zvec timeout           |       | Last synced 2m ago     |
| Retry Open cache Home  |       | Resume trace Exit      |
+========================+       +========================+
Docs Error State ──[open cache]──► Cached Doc Opened

+========================+       +========================+
| Docs Error State       |       | Dashboard Home         |
| Breadcrumb Docs        |       | Header Search Bell     |
| Index failed           |       | Sidebar Dash active    |
| Zvec timeout           |       | KPI row 4 panels       |
| Retry Open cache Home  |       | Docs shortcut Back     |
+========================+       +========================+
Docs Error State ──[go home]──► Dashboard Home
```