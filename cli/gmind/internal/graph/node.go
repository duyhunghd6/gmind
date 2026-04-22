package graph

type NodeType string

const (
	NodePRD    NodeType = "PRD"
	NodePlan   NodeType = "Plan"
	NodeTask   NodeType = "Task"
	NodeCommit NodeType = "Commit"
)

type Node struct {
	ID            string   `json:"id"`
	Title         string   `json:"title"`
	Type          NodeType `json:"type"`
	Status        string   `json:"status,omitempty"`
	Description   string   `json:"description,omitempty"`
	Source        string   `json:"source,omitempty"`
	RawSatisfies  []string `json:"-"`
	Children      []*Node  `json:"children,omitempty"`
	Parents       []*Node  `json:"parents,omitempty"`
	RTEStatus     string   `json:"rte_status,omitempty"`
	RTERisk       string   `json:"rte_risk,omitempty"`
	RTEResolution string   `json:"rte_resolution,omitempty"`
	RTEApprovedBy string   `json:"rte_approved_by,omitempty"`
	RTEApprovedAt string   `json:"rte_approved_at,omitempty"`
}
