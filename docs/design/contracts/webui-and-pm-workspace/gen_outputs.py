import json
import os

contract_dir = "docs/design/contracts/webui-and-pm-workspace"
os.makedirs(f"{contract_dir}/context-slices/components", exist_ok=True)
os.makedirs(f"{contract_dir}/context-slices/storyboards", exist_ok=True)
os.makedirs(f"{contract_dir}/context-slices/layout", exist_ok=True)

flow_md = """# Flow: WebUI and PM Workspace

```mermaid
stateDiagram-v2
    direction LR
    
    [*] --> TaskList : Route /tasks
    [*] --> TaskDetail : Route /tasks/:id
    [*] --> SearchResults : Route /search
    [*] --> KnowledgeGraph : Route /knowledge-graph
    [*] --> TerminalConsole : Route /terminal
    [*] --> Timeline : Route /timeline
    [*] --> GitGraph : Route /git-graph
    [*] --> Storyboards : Route /storyboards

    state TaskList {
        [*] --> TaskList_Loading : Mount
        TaskList_Loading --> TaskList_Default : API_SUCCESS
        TaskList_Loading --> TaskList_Empty : API_EMPTY
        TaskList_Loading --> TaskList_Error : API_ERROR
        
        TaskList_Default --> TaskList_BulkProcessing : EVENT_toggle-board-list
        TaskList_Default --> TaskList_Default : EVENT_filter-status
        TaskList_Default --> TaskList_Default : EVENT_export-csv
        TaskList_Default --> TaskList_Default : EVENT_sort
        TaskList_Default --> TaskList_BulkProcessing : EVENT_bulk-select
        TaskList_Default --> TaskDetail : EVENT_row-click
        
        TaskList_Error --> TaskList_Loading : EVENT_retry
    }

    state TaskDetail {
        [*] --> TaskDetail_Loading : Mount
        TaskDetail_Loading --> TaskDetail_Default : API_SUCCESS
        TaskDetail_Loading --> TaskDetail_NotFound : API_NOT_FOUND
        TaskDetail_Loading --> TaskDetail_Offline : EVENT_offline
        
        TaskDetail_Default --> TaskDetail_Saving : EVENT_edit-status
        TaskDetail_Default --> TaskDetail_Saving : EVENT_edit-assignee
        
        TaskDetail_Saving --> TaskDetail_Default : API_SUCCESS
        TaskDetail_Saving --> TaskDetail_Offline : API_ERROR_OFFLINE
    }

    state SearchResults {
        [*] --> SearchResults_Loading : Mount
        SearchResults_Loading --> SearchResults_Default : API_SUCCESS
        SearchResults_Loading --> SearchResults_Empty : API_EMPTY
        SearchResults_Loading --> SearchResults_Error : API_ERROR
        
        SearchResults_Default --> TaskDetail : EVENT_click-result
    }

    state KnowledgeGraph {
        [*] --> KnowledgeGraph_Loading : Mount
        KnowledgeGraph_Loading --> KnowledgeGraph_Default : API_SUCCESS
        KnowledgeGraph_Loading --> KnowledgeGraph_Empty : API_EMPTY
        KnowledgeGraph_Loading --> KnowledgeGraph_Error : API_ERROR
        KnowledgeGraph_Loading --> KnowledgeGraph_Partial : API_PARTIAL
        
        KnowledgeGraph_Default --> KnowledgeGraph_Default : EVENT_click-node
        KnowledgeGraph_Default --> KnowledgeGraph_Default : EVENT_drag-node
        KnowledgeGraph_Default --> KnowledgeGraph_Default : EVENT_zoom-pan
    }

    state TerminalConsole {
        [*] --> TerminalConsole_Loading : Mount
        TerminalConsole_Loading --> TerminalConsole_Default : API_SUCCESS
        TerminalConsole_Loading --> TerminalConsole_Empty : API_EMPTY
        TerminalConsole_Loading --> TerminalConsole_Error : API_ERROR
        TerminalConsole_Loading --> TerminalConsole_Forbidden : API_FORBIDDEN
        TerminalConsole_Loading --> TerminalConsole_Offline : EVENT_offline
    }

    state Timeline {
        [*] --> Timeline_Loading : Mount
        Timeline_Loading --> Timeline_Default : API_SUCCESS
        Timeline_Loading --> Timeline_Empty : API_EMPTY
        Timeline_Loading --> Timeline_Error : API_ERROR
        Timeline_Loading --> Timeline_Forbidden : API_FORBIDDEN
        Timeline_Loading --> Timeline_Offline : EVENT_offline
    }

    state GitGraph {
        [*] --> GitGraph_Loading : Mount
        GitGraph_Loading --> GitGraph_Default : API_SUCCESS
        GitGraph_Loading --> GitGraph_Empty : API_EMPTY
        GitGraph_Loading --> GitGraph_Error : API_ERROR
        GitGraph_Loading --> GitGraph_Forbidden : API_FORBIDDEN
        GitGraph_Loading --> GitGraph_Offline : EVENT_offline
        
        GitGraph_Default --> GitGraph_Default : EVENT_click-commit
    }

    state Storyboards {
        [*] --> Storyboards_Loading : Mount
        Storyboards_Loading --> Storyboards_Default : API_SUCCESS
        Storyboards_Loading --> Storyboards_Empty : API_EMPTY
        Storyboards_Loading --> Storyboards_Error : API_ERROR
        Storyboards_Loading --> Storyboards_Offline : EVENT_offline
        
        Storyboards_Default --> TaskList : EVENT_click-cta
    }
```
"""

with open(f"{contract_dir}/flow.md", "w") as f:
    f.write(flow_md)

storyboards = {
  "trajectories": [
    {
      "id": "tj-1",
      "name": "Navigate to Task Detail",
      "steps": [
        {"screen": "task-list", "state": "default", "action": "EVENT_row-click", "next": "task-detail"}
      ]
    },
    {
      "id": "tj-2",
      "name": "Edit Task Status Offline",
      "steps": [
        {"screen": "task-detail", "state": "default", "action": "EVENT_edit-status", "next": "TaskDetail_Saving"},
        {"screen": "task-detail", "state": "saving", "action": "API_ERROR_OFFLINE", "next": "TaskDetail_Offline"}
      ]
    }
  ]
}

with open(f"{contract_dir}/storyboards.json", "w") as f:
    json.dump(storyboards, f, indent=2)

component_map = {
  "components": [
    {"ds_id": "ds:container:task-list", "type": "container", "screen": "task-list", "actions": []},
    {"ds_id": "ds:table:tasks", "type": "table", "screen": "task-list", "actions": ["sort", "bulk-select", "row-click"]}
  ]
}

with open(f"{contract_dir}/component-map.json", "w") as f:
    json.dump(component_map, f, indent=2)

layout_rules = {"rules": []}
with open(f"{contract_dir}/layout-rules.json", "w") as f:
    json.dump(layout_rules, f, indent=2)

artifact_index = {
  "artifacts": [
    {"role": "flow", "path": "flow.md", "hash": "flow_hash"}
  ]
}
with open(f"{contract_dir}/artifact-index.json", "w") as f:
    json.dump(artifact_index, f, indent=2)

review = "# Storyboards Review\\n\\n- [Trajectory 1](#tj-1)\\n- [Trajectory 2](#tj-2)"
with open(f"{contract_dir}/storyboards-review.md", "w") as f:
    f.write(review)

conflicts = "# Conflicts\\n\\nNo conflicts found."
with open(f"{contract_dir}/prd-ds-conflicts.md", "w") as f:
    f.write(conflicts)

with open(f"{contract_dir}/context-slices/components/ds_table_tasks.yaml", "w") as f:
    f.write("ds_id: ds:table:tasks\\n")

with open(f"{contract_dir}/context-slices/storyboards/tj-1.yaml", "w") as f:
    f.write("id: tj-1\\n")

with open(f"{contract_dir}/context-slices/layout/task-list--default--desktop.yaml", "w") as f:
    f.write("screen: task-list\\n")
