# Review Diagrams: PRD-04-WebUI-and-PM-Workspace

## Screen Inventory and Routes

```mermaid
flowchart LR
    A[Global Shell '/*'] --> B[RTM Dashboard '/']
    A --> C[SAFe Board '/board']
    A --> D[Task List '/tasks']
    A --> E[Doc Viewer '/docs']
    A --> F[Approval Gates '/approval']
    A --> G[Search Results '/search']
    B --> H[Trace Explorer '/trace/:id']
    C --> I[Task Detail '/tasks/:id']
    D --> I
    E --> H
    G --> I
    G --> E
    G --> H
    I --> H
```

## Responsive Layout Intent by Viewport

```mermaid
flowchart TD
    subgraph Viewports
        D[Desktop: 1440px]
        T[Tablet: 1024px]
        M[Mobile: 390px]
    end
```

## Per-screen Component Hierarchy

```mermaid
flowchart TD
    subgraph Global Shell
        GS[global_shell] --> H[header]
        GS --> SB[sidebar]
        H --> L[button.logo]
        H --> S[input.search]
        H --> I[indicator.status]
        SB --> NM[navigation.menu]
    end
```

```mermaid
flowchart TD
    subgraph RTM Dashboard
        RD[rtm_dashboard] --> KR[widget.kpi_row]
        RD --> HP[panel.coverage]
        RD --> TP[panel.progress]
        RD --> MG[panel.graph]
        RD --> GA[panel.gaps]
    end
```

```mermaid
flowchart TD
    subgraph SAFe Board
        SB[safe_board] --> KC[column.kanban]
        KC --> TC[card.task]
        TC --> RB[badge.rte_escalation]
    end
```

```mermaid
flowchart TD
    subgraph Task List
        TL[task_list] --> TF[toolbar.filters]
        TL --> TD[table.data]
        TL --> TP[toolbar.pagination]
        TL --> TBA[toolbar.bulk_actions]
    end
```

```mermaid
flowchart TD
    subgraph Task Detail
        TD[task_detail] --> TH[header.task]
        TD --> NT[navigation.tabs]
        NT --> T1[tab.detail]
        NT --> T2[tab.activity]
        NT --> T3[tab.graph]
        NT --> T4[tab.code]
    end
```

```mermaid
flowchart TD
    subgraph Trace Explorer
        TE[trace_explorer] --> GC[toolbar.graph_controls]
        TE --> DC[canvas.force_directed]
        TE --> ND[panel.node_details]
    end
```

```mermaid
flowchart TD
    subgraph Doc Viewer
        DV[doc_viewer] --> DT[sidebar.doc_tree]
        DV --> MV[view.markdown]
    end
```

```mermaid
flowchart TD
    subgraph Approval Gates
        AG[approval_gates] --> DP[panel.diff]
        AG --> TL[panel.test_logs]
        AG --> PC[panel.prd_context]
        AG --> AB[toolbar.approval_actions]
        AB --> AB1[button.approve]
        AB --> AB2[button.reject]
    end
```

```mermaid
flowchart TD
    subgraph Search Results
        SR[search_results] --> SF[sidebar.search_filters]
        SR --> SL[list.search_items]
    end
```

## State Coverage per Screen

```mermaid
stateDiagram-v2
    direction LR
    state global_shell {
        [*] --> default
        [*] --> offline
        [*] --> loading
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state rtm_dashboard {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state safe_board {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state task_list {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
        [*] --> bulk_processing
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state task_detail {
        [*] --> default
        [*] --> loading
        [*] --> not_found
        [*] --> offline
        [*] --> saving
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state trace_explorer {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
        [*] --> partial
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state doc_viewer {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state approval_gates {
        [*] --> default
        [*] --> loading
        [*] --> insufficient_evidence
        [*] --> empty
        [*] --> error
    }
```

```mermaid
stateDiagram-v2
    direction LR
    state search_results {
        [*] --> default
        [*] --> loading
        [*] --> empty
        [*] --> error
    }
```

## Action-to-Event Links

```mermaid
flowchart LR
    subgraph Action Links
        navigate_home --> EVENT_LOAD_SUCCESS
        trigger_search --> EVENT_LOAD_SUCCESS
        navigate_board --> EVENT_LOAD_SUCCESS
        navigate_tasks --> EVENT_LOAD_SUCCESS
        navigate_docs --> EVENT_LOAD_SUCCESS
        navigate_approval --> EVENT_LOAD_SUCCESS
        EVENT_OFFLINE_DETECTED --> offline
        EVENT_ONLINE_DETECTED --> default
        EVENT_FETCH_DATA --> loading
        EVENT_FETCH_SUCCESS --> default
        EVENT_LOAD_SUCCESS --> default
        EVENT_LOAD_EMPTY --> empty
        EVENT_LOAD_ERROR --> error
        EVENT_RETRY --> loading
        drill_down_graph --> EVENT_LOAD_SUCCESS
        click_task_card --> EVENT_LOAD_SUCCESS
        EVENT_BULK_ACTION --> bulk_processing
        EVENT_BULK_SUCCESS --> default
        click_task_row --> EVENT_LOAD_SUCCESS
        EVENT_NOT_FOUND --> not_found
        EVENT_EDIT_FIELD --> saving
        EVENT_SAVE_SUCCESS --> default
        click_trace_link --> EVENT_LOAD_SUCCESS
        EVENT_PARTIAL_LOAD --> partial
        EVENT_ENRICHMENT_SUCCESS --> default
        click_task_node --> EVENT_LOAD_SUCCESS
        click_doc_node --> EVENT_LOAD_SUCCESS
        click_beads_id --> EVENT_LOAD_SUCCESS
        EVENT_MISSING_EVIDENCE --> insufficient_evidence
        trigger_approve --> default
        trigger_reject --> default
        trigger_refresh --> loading
        click_task_result --> EVENT_LOAD_SUCCESS
        click_doc_result --> EVENT_LOAD_SUCCESS
        click_commit_result --> EVENT_LOAD_SUCCESS
    end
```
