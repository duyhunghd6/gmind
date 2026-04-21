package graph

import (
	"fmt"
	"strings"
)

// Trace 3-tier linkage
func (a *Assembler) Trace(beadsID string, reverse bool, includeGitHub bool) (string, error) {
	// 1. Parse all documents
	docNodes, err := a.Parser.ParseAll()
	if err != nil {
		return "", fmt.Errorf("failed to parse documents: %w", err)
	}

	// 2. Get all tasks from Beads
	issues, err := a.Sqlite.GetAllIssues()
	if err != nil {
		return "", fmt.Errorf("failed to get issues: %w", err)
	}

	// 3. Build Node Map and link Doc nodes
	nodeMap := make(map[string]*Node)
	for _, n := range docNodes {
		nodeMap[n.ID] = n
	}

	for _, n := range docNodes {
		for _, targetID := range n.RawSatisfies {
			if target, ok := nodeMap[targetID]; ok {
				n.Parents = append(n.Parents, target)
				target.Children = append(target.Children, n)
			}
		}
	}

	for _, iss := range issues {
		node := &Node{
			ID:     iss.ID,
			Title:  iss.Title,
			Type:   NodeTask,
			Status: iss.Status,
		}
		nodeMap[iss.ID] = node

		// Link Task to Plan/PRD via labels
		for _, label := range iss.Labels {
			if strings.HasPrefix(label, "implements:") {
				targetID := strings.TrimPrefix(label, "implements:")
				if target, ok := nodeMap[targetID]; ok {
					node.Parents = append(node.Parents, target)
					target.Children = append(target.Children, node)
				}
			} else if strings.HasPrefix(label, "satisfies:") {
				targetID := strings.TrimPrefix(label, "satisfies:")
				if target, ok := nodeMap[targetID]; ok {
					node.Parents = append(node.Parents, target)
					target.Children = append(target.Children, node)
				}
			}
		}
	}

	// 4. Link Commits and PRs for all nodes if requested
	if includeGitHub && a.GitHub != nil {
		for id, node := range nodeMap {
			// Commits
			commits, err := a.GitHub.GetCommitsByBeadsID(".", id)
			if err == nil && commits != "" {
				lines := strings.Split(commits, "\n")
				for _, line := range lines {
					if strings.HasPrefix(line, "commit ") {
						hash := strings.TrimPrefix(line, "commit ")
						commitID := hash[:7]
						commitNode := &Node{
							ID:   commitID,
							Type: NodeCommit,
						}
						// Avoid duplicates
						node.Children = append(node.Children, commitNode)
						commitNode.Parents = append(commitNode.Parents, node)
					}
				}
			}

			// PRs
			prs, err := a.GitHub.GetPRsByBeadsID(".", id)
			if err == nil && prs != "" && prs != "[]\n" {
				// PRs come as JSON
				// Simplified: just add a note or parse basic info
				// For now, let's just add a generic "PR" node if it's not empty
				prNode := &Node{
					ID:    "PRs",
					Title: "Linked Pull Requests",
					Type:  NodePlan, // Or a new type
				}
				node.Children = append(node.Children, prNode)
			}
		}
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
