# Journey 1 - Dashboard gap resolution and task drill-down

```text
+========================+       +========================+
| Dashboard Home         |       | Coverage Drill-down    |
| Header Search Bell     |       | Breadcrumb Dashboard   |
| KPI 78 142 5           |       | Coverage PRD-04 58     |
| Coverage heatmap       |       | Section rows           |
| Gap list Create Plan   |       | Open task Back         |
+========================+       +========================+
Dashboard Home ──[click coverage]──► Coverage Drill-down

+========================+       +========================+
| Coverage Drill-down    |       | Dashboard Home         |
| Breadcrumb Dashboard   |       | Header Search Bell     |
| Coverage PRD-04 58     |       | KPI 78 142 5           |
| Section rows           |       | Coverage heatmap       |
| Open task Back         |       | Gap list Create Plan   |
+========================+       +========================+
Coverage Drill-down ──[back]──► Dashboard Home

+========================+       +========================+
| Dashboard Home         |       | Create Plan Side Panel |
| Header Search Bell     |       | Breadcrumb Dashboard   |
| Coverage heatmap       |       | Create plan for gap    |
| Gap list Create Plan   |       | Title input            |
| Open gap action        |       | Assignee select Save   |
+========================+       +========================+
Dashboard Home ──[click create plan]──► Create Plan Side Panel

+========================+       +========================+
| Create Plan Side Panel |       | Create Plan Validation |
| Breadcrumb Dashboard   |       | Breadcrumb Dashboard   |
| Title input            |       | Title required         |
| Assignee select Save   |       | Notes exceed limit     |
| Close panel            |       | Fix fields Retry       |
+========================+       +========================+
Create Plan Side Panel ──[save empty form]──► Create Plan Validation

+========================+       +========================+
| Create Plan Validation |       | Create Plan Side Panel |
| Breadcrumb Dashboard   |       | Breadcrumb Dashboard   |
| Title required         |       | Title Plan 17          |
| Notes exceed limit     |       | Assignee select Save   |
| Fix fields Retry       |       | Close panel            |
+========================+       +========================+
Create Plan Validation ──[fix fields]──► Create Plan Side Panel

+========================+       +========================+
| Create Plan Side Panel |       | Dashboard Reloaded     |
| Breadcrumb Dashboard   |       | Header Search Bell     |
| Title Plan 17          |       | KPI 81 143 4           |
| Assignee select Save   |       | Gap list updated       |
| Close panel            |       | New plan badge         |
+========================+       +========================+
Create Plan Side Panel ──[save valid plan]──► Dashboard Reloaded

+========================+       +========================+
| Create Plan Side Panel |       | Dashboard Home         |
| Breadcrumb Dashboard   |       | Header Search Bell     |
| Title input            |       | KPI 78 142 5           |
| Assignee select Save   |       | Coverage heatmap       |
| Close panel            |       | Gap list Create Plan   |
+========================+       +========================+
Create Plan Side Panel ──[close]──► Dashboard Home

+========================+       +========================+
| Coverage Drill-down    |       | Task Detail            |
| Breadcrumb Dashboard   |       | Back to Tasks          |
| Coverage PRD-04 58     |       | bd-x1y2 In Progress    |
| Section rows           |       | Detail Activity        |
| Open task Back         |       | Graph Code Trace       |
+========================+       +========================+
Coverage Drill-down ──[open task]──► Task Detail

+========================+       +========================+
| Task Detail            |       | Trace Explorer         |
| Back to Tasks          |       | Breadcrumb Trace       |
| bd-x1y2 In Progress    |       | Root br-prd04-s6       |
| Detail Activity        |       | Graph canvas           |
| Graph Code Trace       |       | Open Doc Back          |
+========================+       +========================+
Task Detail ──[trace dependency]──► Trace Explorer

+========================+       +========================+
| Trace Explorer         |       | Document Viewer        |
| Breadcrumb Trace       |       | Breadcrumb Docs PRD    |
| Root br-prd04-s6       |       | Doc tree Content       |
| Graph canvas           |       | br-prd04-s6 linked     |
| Open Doc Back          |       | Open in Trace Back     |
+========================+       +========================+
Trace Explorer ──[open doc]──► Document Viewer

+========================+       +========================+
| Document Viewer        |       | Trace Explorer         |
| Breadcrumb Docs PRD    |       | Breadcrumb Trace       |
| Doc tree Content       |       | Root br-prd04-s6       |
| br-prd04-s6 linked     |       | Graph canvas           |
| Open in Trace Back     |       | Open Doc Back          |
+========================+       +========================+
Document Viewer ──[back]──► Trace Explorer

+========================+       +========================+
| Trace Explorer         |       | Task Detail            |
| Breadcrumb Trace       |       | Back to Tasks          |
| Root br-prd04-s6       |       | bd-x1y2 In Progress    |
| Graph canvas           |       | Detail Activity        |
| Open Doc Back          |       | Graph Code Trace       |
+========================+       +========================+
Trace Explorer ──[back]──► Task Detail

+========================+       +========================+
| Task Detail            |       | Coverage Drill-down    |
| Back to Tasks          |       | Breadcrumb Dashboard   |
| bd-x1y2 In Progress    |       | Coverage PRD-04 58     |
| Detail Activity        |       | Section rows           |
| Graph Code Trace       |       | Open task Back         |
+========================+       +========================+
Task Detail ──[back]──► Coverage Drill-down

+========================+       +========================+
| Dashboard Home         |       | Dashboard Error        |
| Header Search Bell     |       | Header Search Bell     |
| KPI 78 142 5           |       | Dashboard load failed  |
| Coverage heatmap       |       | API unavailable        |
| Gap list Create Plan   |       | Retry Open tasks Help  |
+========================+       +========================+
Dashboard Home ──[load fails]──► Dashboard Error

+========================+       +========================+
| Dashboard Error        |       | Dashboard Home         |
| Header Search Bell     |       | Header Search Bell     |
| Dashboard load failed  |       | KPI 78 142 5           |
| API unavailable        |       | Coverage heatmap       |
| Retry Open tasks Help  |       | Gap list Create Plan   |
+========================+       +========================+
Dashboard Error ──[retry]──► Dashboard Home

+========================+       +========================+
| Dashboard Error        |       | Task List              |
| Header Search Bell     |       | Breadcrumb Tasks       |
| Dashboard load failed  |       | Filters CSV            |
| API unavailable        |       | bd-x1y2 Open           |
| Retry Open tasks Help  |       | Back to Dashboard      |
+========================+       +========================+
Dashboard Error ──[open tasks]──► Task List

+========================+       +========================+
| Task List              |       | Dashboard Home         |
| Breadcrumb Tasks       |       | Header Search Bell     |
| Filters CSV            |       | KPI 78 142 5           |
| bd-x1y2 Open           |       | Coverage heatmap       |
| Back to Dashboard      |       | Gap list Create Plan   |
+========================+       +========================+
Task List ──[back]──► Dashboard Home

+========================+       +========================+
| Dashboard Error        |       | Journey End Recovery   |
| Header Search Bell     |       | Support request sent   |
| Dashboard load failed  |       | Incident INC-431       |
| API unavailable        |       | Go home Exit           |
| Retry Open tasks Help  |       | Recovery guidance      |
+========================+       +========================+
Dashboard Error ──[contact support]──► Journey End Recovery

+========================+       +========================+
| Journey End Recovery   |       | Dashboard Home         |
| Support request sent   |       | Header Search Bell     |
| Incident INC-431       |       | KPI 78 142 5           |
| Go home Exit           |       | Coverage heatmap       |
| Recovery guidance      |       | Gap list Create Plan   |
+========================+       +========================+
Journey End Recovery ──[go home]──► Dashboard Home
```