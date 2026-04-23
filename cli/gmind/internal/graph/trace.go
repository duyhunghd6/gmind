package graph

import (
	"fmt"
	"strings"
)

type TraceNode struct {
	ID            string      `json:"id"`
	Title         string      `json:"title"`
	Type          string      `json:"type"`
	Status        string      `json:"status"`
	RTEStatus     string      `json:"rte_status,omitempty"`
	RTERisk       string      `json:"rte_risk,omitempty"`
	RTEResolution string      `json:"rte_resolution,omitempty"`
	RTEApprovedBy string      `json:"rte_approved_by,omitempty"`
	RTEApprovedAt string      `json:"rte_approved_at,omitempty"`
	Children      []TraceNode `json:"children,omitempty"`
	Parents       []TraceNode `json:"parents,omitempty"`
}

func (a *Assembler) TraceData(beadsID string, reverse bool, includeGitHub bool) (*TraceNode, error) {
	nodeMap, err := a.BuildGraph(includeGitHub)
	if err != nil {
		return nil, err
	}

	startNode, ok := nodeMap[beadsID]
	if !ok {
		return nil, fmt.Errorf("node %s not found in graph", beadsID)
	}

	visited := make(map[string]bool)
	tn := a.convertToTraceNode(startNode, reverse, visited)
	return &tn, nil
}

func (a *Assembler) convertToTraceNode(n *Node, reverse bool, visited map[string]bool) TraceNode {
	tn := TraceNode{
		ID:            n.ID,
		Title:         n.Title,
		Type:          string(n.Type),
		Status:        n.Status,
		RTEStatus:     n.RTEStatus,
		RTERisk:       n.RTERisk,
		RTEResolution: n.RTEResolution,
		RTEApprovedBy: n.RTEApprovedBy,
		RTEApprovedAt: n.RTEApprovedAt,
	}

	if visited[n.ID] {
		return tn
	}
	visited[n.ID] = true

	if reverse {
		for _, p := range n.Parents {
			tn.Parents = append(tn.Parents, a.convertToTraceNode(p, reverse, visited))
		}
	} else {
		for _, c := range n.Children {
			tn.Children = append(tn.Children, a.convertToTraceNode(c, reverse, visited))
		}
	}

	return tn
}

// Trace 3-tier linkage
func (a *Assembler) Trace(beadsID string, reverse bool, includeGitHub bool) (string, error) {
	// 1. Build Graph
	nodeMap, err := a.BuildGraph(includeGitHub)
	if err != nil {
		return "", err
	}

	// 5. Trace logic
	startNode, ok := nodeMap[beadsID]
	if !ok {
		return "", fmt.Errorf("node %s not found in graph", beadsID)
	}

	var sb strings.Builder
	a.renderTree(&sb, startNode, 0, reverse)

	return sb.String(), nil
}

func (a *Assembler) renderTree(sb *strings.Builder, n *Node, level int, reverse bool) {
	indent := strings.Repeat("  ", level)
	status := ""
	if n.Status != "" {
		status = fmt.Sprintf(" [%s]", n.Status)
	}
	sb.WriteString(fmt.Sprintf("%s%s %s: %s%s\n", indent, getIcon(n.Type), n.Type, n.ID, status))

	if n.RTEStatus != "" {
		if n.RTEStatus == "rejected" {
			detail := n.RTEResolution
			if detail == "" {
				detail = n.RTERisk
			}
			if detail == "" {
				sb.WriteString(fmt.Sprintf("%s  [RTE:REJECTED] new approach required\n", indent))
			} else {
				sb.WriteString(fmt.Sprintf("%s  [RTE:REJECTED] new approach required. Latest rejection reason: %s\n", indent, detail))
			}
		} else {
			extra := n.RTEResolution
			if extra == "" {
				extra = n.RTERisk
			}
			if extra == "" {
				sb.WriteString(fmt.Sprintf("%s  [RTE:%s]\n", indent, strings.ToUpper(n.RTEStatus)))
			} else {
				sb.WriteString(fmt.Sprintf("%s  [RTE:%s] %s\n", indent, strings.ToUpper(n.RTEStatus), extra))
			}
		}
	}

	if reverse {
		for _, p := range n.Parents {
			a.renderTree(sb, p, level+1, reverse)
		}
	} else {
		for _, c := range n.Children {
			a.renderTree(sb, c, level+1, reverse)
		}
	}
}

func getIcon(t NodeType) string {
	switch t {
	case NodePRD:
		return "📄"
	case NodePlan:
		return "🗺️"
	case NodeTask:
		return "✅"
	case NodeCommit:
		return "📦"
	default:
		return "•"
	}
}
