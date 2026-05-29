# Stage 1 Review Diagrams: Web UI & PM Workspace

This document contains Mermaid diagrams visualizing the UI contract for the `webui-and-pm-workspace` feature.

## 1. Screen Inventory & Routes

```mermaid
flowchart LR
    A[Global Shell<br>/*] --> B[RTM Dashboard<br>/]
    A --> C[Approval Gate<br>/approval]
```

## 2. Component Hierarchy

### Global Shell

```mermaid
flowchart TD
    GlobalShell[Global Shell] --> Header[Header<br>ds:component:header]
    GlobalShell --> Sidebar[Sidebar<br>ds:component:sidebar]
    
    Header --> H1[Logo]
    Header --> H2[Global Search Bar]
    Header --> H3[Online Status]
    
    Sidebar --> S1[Dash]
    Sidebar --> S2[Board]
    Sidebar --> S3[Tasks]
    Sidebar --> S4[Trace]
    Sidebar --> S5[Docs]
    Sidebar --> S6[Appvl]
```

### RTM Dashboard

```mermaid
flowchart TD
    RtmDashboard[RTM Dashboard] --> P1[Panel 1: Coverage Heatmap]
    RtmDashboard --> P2[Panel 2: Task Progress]
    RtmDashboard --> P3[Panel 3: Knowledge Graph]
    RtmDashboard --> P4[Panel 4: Gap Analysis]
```

### Approval Gate

```mermaid
flowchart TD
    ApprovalGate[Approval Gate] --> Queue[Queue Panel]
    ApprovalGate --> Evidence[Evidence Hub]
    ApprovalGate --> Decision[Decision Box]
```

## 3. State Coverage & Transitions

```mermaid
stateDiagram-v2
    direction LR

    [*] --> global_shell
    
    state global_shell {
        [*] --> shell_loading
        shell_loading --> shell_default : LOADED
        shell_default --> shell_offline : NETWORK_DISCONNECT
        shell_offline --> shell_default : NETWORK_RESTORED
        shell_default --> shell_default : Toggle Sidebar
    }
    
    global_shell --> rtm_dashboard : Navigate to Dashboard
    global_shell --> approval_gate : Navigate to Approval
    
    state rtm_dashboard {
        [*] --> dash_loading
        dash_loading --> dash_default : LOAD_SUCCESS
        dash_loading --> dash_empty : NO_DATA
        dash_loading --> dash_error : LOAD_FAIL
        dash_default --> view_drilldown : Drill-down
        dash_default --> view_trace : View Trace
    }
    
    state approval_gate {
        [*] --> app_loading
        app_loading --> app_default : EVALUATED
        app_loading --> app_empty : NO_QUEUE
        app_loading --> app_error : LOAD_FAIL
        app_default --> app_insufficient_evidence : MISSING_EVIDENCE
        app_default --> app_decision_submitted : Approve
        app_default --> app_decision_submitted : Reject
        app_default --> app_decision_submitted : Request Changes
        app_insufficient_evidence --> app_decision_submitted : Reject
    }
```

## 4. Action-to-Event Links

```mermaid
flowchart LR
    subgraph Global Shell
        A1[Toggle Sidebar] --> E1[Update Layout State]
    end
    
    subgraph RTM Dashboard
        A2[Drill-down] --> E2[Open Detail View / Navigate]
        A3[View Trace] --> E3[Navigate to Trace Explorer]
    end
    
    subgraph Approval Gate
        A4[Approve] --> E4[Submit Approval Decision]
        A5[Reject] --> E5[Submit Rejection Decision]
        A6[Request Changes] --> E6[Submit Change Request]
    end
```

## 5. Responsive Layout Intent

```mermaid
flowchart TD
    subgraph Breakpoints
        D[Desktop<br>1440px]
        T[Tablet<br>1024px]
        M[Mobile<br>390px]
    end

    subgraph Global Shell Layout
        D --> |Sidebar Open| D_Layout[Sidebar Left, Content Right]
        T --> |Sidebar Collapsed| T_Layout[Icon Sidebar, Content Right]
        M --> |Hamburger Menu| M_Layout[Header Menu, Content Full Width]
    end

    subgraph RTM Dashboard Layout
        D --> |4 Panels| D_Dash[2x2 Grid]
        T --> |Stack Panels| T_Dash[2x1 or 1x1 Grid]
        M --> |Single Column| M_Dash[1 Column Stack]
    end
    
    subgraph Approval Gate Layout
        D --> |Split View| D_App[Left: Evidence, Right: Controls]
        T --> |Stack| T_App[Top: Controls, Bottom: Evidence]
        M --> |Stack| M_App[Top: Controls, Bottom: Evidence]
    end
```