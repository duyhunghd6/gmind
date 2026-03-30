a-->b
b-->c
c-->d
d-->e
e=>f
f=>g

# Journey 1 — Dashboard gap resolution and task drill-down

dashboard_home----->coverage_drilldown
coverage_drilldown----->dashboard_home
create_plan_panel=====>create_plan_validation
task_detail=====>trace_explorer
trace_explorer----->task_detail
dashboard_error=====>dashboard_home

```text
+==============================+       +==============================+
| Dashboard Home               | click | Coverage Drill-down          |
| Header: Search + alerts      |------>| Breadcrumb: Dashboard > PRD  |
| Sidebar: Dashboard active    |       | Coverage bars by section     |
| KPI: 47.2% / 128 / 9 gaps    |       | Gap rows + linked task chip  |
| Gap panel: [Create Plan]     |       | [Open task bd-x1y2] [Back]   |
+==============================+       +==============================+
dashboard_home --> coverage_drilldown
click coverage row

+==============================+       +==============================+
| Coverage Drill-down          | back  | Dashboard Home               |
| Breadcrumb: Dashboard > PRD  |<------| Header: Search + alerts      |
| Gap rows + linked task chip  |       | Heatmap + progress + graph   |
| [Open task bd-x1y2] [Back]   |       | Gap panel: [Create Plan]     |
| Section excerpt visible      |       | Sidebar: Dashboard active    |
+==============================+       +==============================+
coverage_drilldown --> dashboard_home
breadcrumb Dashboard

+==============================+       +==============================+
| Dashboard Home               | click | Create Plan Side Panel       |
| Gap panel shows Missing plan |------>| Gap context pinned           |
| Coverage summary still shown |       | Plan title: [            ]   |
| [Create Plan] [Open task]    |       | Notes: [                 ]   |
| Heatmap still visible        |       | [Save plan] [Close panel]    |
+==============================+       +==============================+
dashboard_home => create_plan_panel
click Create Plan

+==============================+       +==============================+
| Create Plan Side Panel       | close | Dashboard Home               |
| Gap context pinned           |<------| Gap panel still focused      |
| Plan title: [            ]   |       | KPI row unchanged            |
| Notes: [                 ]   |       | Heatmap + progress + graph   |
| [Save plan] [Close panel]    |       | [Create Plan] [Open task]    |
+==============================+       +==============================+
create_plan_panel --> dashboard_home
close panel or Esc

+==============================+       +==============================+
| Create Plan Side Panel       | save  | Create Plan Validation       |
| Title left blank             |------>| Error: Plan title required   |
| Notes draft still present    |       | Field outline + helper text  |
| [Save plan] [Close panel]    |       | Cursor returned to title     |
| Gap context stays pinned     |       | [Retry save] [Close panel]   |
+==============================+       +==============================+
create_plan_panel => create_plan_validation
save empty title

+==============================+       +==============================+
| Create Plan Validation       | fix   | Create Plan Side Panel       |
| Error: Plan title required   |------>| Title: Plan 15 link PRD-04   |
| Field outline + helper text  |       | Notes: Add owner + due date  |
| Cursor returned to title     |       | Gap context still visible    |
| [Retry save] [Close panel]   |       | [Save plan] [Close panel]    |
+==============================+       +==============================+
create_plan_validation --> create_plan_panel
fix title

+==============================+       +==============================+
| Create Plan Side Panel       | save  | Dashboard Reloaded           |
| Title: Plan 15 link PRD-04   |------>| Toast: Plan created          |
| Notes: Add owner + due date  |       | Gap count 9 -> 8             |
| Gap context still visible    |       | New plan link in gap panel   |
| [Save plan]                  |       | [Continue] [Open task]       |
+==============================+       +==============================+
create_plan_panel --> dashboard_reloaded
save valid plan

+==============================+       +==============================+
| Dashboard Reloaded           | open  | Create Plan Side Panel       |
| Toast: Plan created          |------>| Previously entered values    |
| Gap count 9 -> 8             |       | Side panel can reopen        |
| New plan link in gap panel   |       | Gap context pinned again     |
| [Continue] [Open task]       |       | [Save plan] [Close panel]    |
+==============================+       +==============================+
dashboard_reloaded => create_plan_panel
open gap panel

+==============================+       +==============================+
| Coverage Drill-down          | open  | Task Detail                  |
| Section gap row selected     |------>| Header: bd-x1y2 In Progress  |
| Linked task chip visible     |       | Tabs: Detail Activity Graph  |
| [Open task] [Back]           |       | Dependency: br-plan-42       |
| Source excerpt visible       |       | [Open Full Graph] [Back]     |
+==============================+       +==============================+
coverage_drilldown --> task_detail
open task bd-x1y2

+==============================+       +==============================+
| Task Detail                  | back  | Coverage Drill-down          |
| Header: bd-x1y2 In Progress  |<------| Breadcrumb preserved         |
| Tabs: Detail Activity Graph  |       | Source section excerpt       |
| Dependency: br-plan-42       |       | Linked tasks still visible   |
| [Open Full Graph] [Back]     |       | [Open task] [Back]           |
+==============================+       +==============================+
task_detail --> coverage_drilldown
Back to Coverage

+==============================+       +==============================+
| Task Detail                  | open  | Trace Explorer               |
| Mini graph in Graph tab      |------>| Breadcrumb: Trace > bd-x1y2  |
| Dependency and owner shown   |       | Toolbar depth + filters      |
| [Open Full Graph] [Back]     |       | Graph canvas + node detail   |
| RTE context block visible    |       | [Open doc] [Back to task]    |
+==============================+       +==============================+
task_detail => trace_explorer
open full graph

+==============================+       +==============================+
| Trace Explorer               | back  | Task Detail                  |
| PRD node selected            |<------| Mini graph still available   |
| Impact list visible          |       | Header: bd-x1y2 In Progress  |
| [Open doc] [Back to task]    |       | Tabs: Detail Activity Graph  |
| Breadcrumb: Trace > bd-x1y2  |       | [Open Full Graph] [Back]     |
+==============================+       +==============================+
trace_explorer --> task_detail
breadcrumb Task

+==============================+       +==============================+
| Trace Explorer               | open  | Coverage Drill-down          |
| PRD node selected            |------>| Breadcrumb preserved         |
| Impact list visible          |       | Source section excerpt       |
| [Open doc] [Back to task]    |       | Linked tasks still visible   |
| Upstream PRD relation shown  |       | [Open task] [Back]           |
+==============================+       +==============================+
trace_explorer => coverage_drilldown
open doc source

+==============================+       +==============================+
| Dashboard Home               | fail  | Dashboard Error              |
| Header + sidebar visible     |------>| Banner: Cannot connect       |
| Main panels waiting on data  |       | Main panels waiting on data  |
| Gap action temporarily idle  |       | [Retry] [Go to Tasks]        |
| Coverage API timed out       |       | [Contact support]            |
+==============================+       +==============================+
dashboard_home --> dashboard_error
dashboard fetch fails

+==============================+       +==============================+
| Dashboard Error              | retry | Dashboard Home               |
| Recovery options displayed   |------>| KPI row + four panels back   |
| [Retry] [Go to Tasks]        |       | Sidebar and search active    |
| [Contact support]            |       | Gap actions usable again     |
| Cause: coverage API timeout  |       | [Create Plan] [Open task]    |
+==============================+       +==============================+
dashboard_error => dashboard_home
Retry succeeds

+==============================+       +==============================+
| Dashboard Error              | route | Task List                    |
| Recovery options displayed   |------>| Filters + table + export     |
| [Retry] [Go to Tasks]        |       | Row: bd-x1y2 / owner / SLA   |
| [Contact support]            |       | [Open task] [Back]           |
| User chooses alternate path  |       | Bulk actions hidden          |
+==============================+       +==============================+
dashboard_error --> task_list
Go to Tasks

+==============================+       +==============================+
| Task List                    | back  | Dashboard Home               |
| Filters + table + export     |<------| KPI row + main panels        |
| Row: bd-x1y2 / owner / SLA   |       | User can restart from shell  |
| [Open task] [Back]           |       | Sidebar still available      |
| Bulk actions hidden          |       | [Open Docs] [Open Tasks]     |
+==============================+       +==============================+
task_list --> dashboard_home
Back to Dashboard

+==============================+       +==============================+
| Dashboard Error              | help  | Terminal: Support Escalation |
| Backend still unavailable    |------>| Incident report submitted    |
| User chooses assisted path   |       | Await backend recovery       |
| [Contact support]            |       | Return via sidebar later     |
| Retry already attempted      |       | Ref id: INC-204              |
+==============================+       +==============================+
dashboard_error => support_escalation
Contact support
```