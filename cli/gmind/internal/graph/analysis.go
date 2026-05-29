package graph

import (
	"fmt"
	"strings"
)

func (a *Assembler) BuildGraph(includeGitHub bool) (map[string]*Node, error) {
	// 1. Parse all documents
	docNodes, err := a.Parser.ParseAll()
	if err != nil {
		return nil, fmt.Errorf("failed to parse documents: %w", err)
	}

	// 2. Get all tasks from Beads
	issues, err := a.Sqlite.GetAllIssues()
	if err != nil {
		return nil, fmt.Errorf("failed to get issues: %w", err)
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
			ID:            iss.ID,
			Title:         iss.Title,
			Type:          NodeTask,
			Status:        iss.Status,
			RTEStatus:     iss.RTEStatus,
			RTERisk:       iss.RTERisk,
			RTEResolution: iss.RTEResolution,
			RTEApprovedBy: iss.RTEApprovedBy,
			RTEApprovedAt: iss.RTEApprovedAt,
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
				prNode := &Node{
					ID:    "PRs",
					Title: "Linked Pull Requests",
					Type:  NodePlan, // Or a new type
				}
				node.Children = append(node.Children, prNode)
			}
		}
	}

	return nodeMap, nil
}

type ImpactResult struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Type   string `json:"type"`
	Status string `json:"status"`
	Action string `json:"action"`
}

func (a *Assembler) ImpactData(beadsID string) ([]ImpactResult, error) {
	nodeMap, err := a.BuildGraph(false)
	if err != nil {
		return nil, err
	}

	startNode, ok := nodeMap[beadsID]
	if !ok {
		return nil, fmt.Errorf("node %s not found in graph", beadsID)
	}

	var results []ImpactResult
	visited := make(map[string]bool)
	var queue []*Node
	queue = append(queue, startNode.Children...)

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		if visited[curr.ID] {
			continue
		}
		visited[curr.ID] = true

		action := "REVIEW NEEDED"
		if curr.Status == "in_progress" {
			action = "PAUSE"
		} else if curr.Status == "open" {
			action = "HOLD"
		}

		results = append(results, ImpactResult{
			ID:     curr.ID,
			Title:  curr.Title,
			Type:   string(curr.Type),
			Status: curr.Status,
			Action: action,
		})
		queue = append(queue, curr.Children...)
	}

	return results, nil
}

func (a *Assembler) Impact(beadsID string) (string, error) {
	nodeMap, err := a.BuildGraph(false)
	if err != nil {
		return "", err
	}

	startNode, ok := nodeMap[beadsID]
	if !ok {
		return "", fmt.Errorf("node %s not found in graph", beadsID)
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("Cascading Impact Analysis for %s:\n\n", startNode.ID))

	// Collect affected items via BFS/DFS
	visited := make(map[string]bool)
	var queue []*Node
	queue = append(queue, startNode.Children...)

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		if visited[curr.ID] {
			continue
		}
		visited[curr.ID] = true

		action := "REVIEW NEEDED"
		if curr.Status == "in_progress" {
			action = "PAUSE"
		} else if curr.Status == "open" {
			action = "HOLD"
		}

		statusStr := ""
		if curr.Status != "" {
			statusStr = fmt.Sprintf(" [%s]", curr.Status)
		}

		sb.WriteString(fmt.Sprintf("- [%s] %s: %s%s -> Action: %s\n", curr.Type, curr.ID, curr.Title, statusStr, action))
		queue = append(queue, curr.Children...)
	}

	if len(visited) == 0 {
		sb.WriteString("No downstream items found.\n")
	}

	return sb.String(), nil
}

type GapResult struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Action string `json:"action"`
}

func (a *Assembler) GapsData(mode string) ([]GapResult, error) {
	nodeMap, err := a.BuildGraph(false)
	if err != nil {
		return nil, err
	}

	var results []GapResult

	for id, node := range nodeMap {
		if mode == "prd-to-plan" && node.Type == NodePRD {
			hasPlan := false
			for _, child := range node.Children {
				if child.Type == NodePlan || child.Type == NodeTask {
					hasPlan = true
					break
				}
			}
			if !hasPlan {
				results = append(results, GapResult{
					ID:     id,
					Title:  node.Title,
					Action: "Create Plan elements",
				})
			}
		} else if mode == "plan-to-tasks" && node.Type == NodePlan {
			hasTask := false
			for _, child := range node.Children {
				if child.Type == NodeTask {
					hasTask = true
					break
				}
			}
			if !hasTask {
				results = append(results, GapResult{
					ID:     id,
					Title:  node.Title,
					Action: "Decompose into Tasks",
				})
			}
		}
	}

	return results, nil
}

func (a *Assembler) Gaps(mode string) (string, error) {
	nodeMap, err := a.BuildGraph(false)
	if err != nil {
		return "", err
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("Gap Analysis (%s):\n\n", mode))
	foundGaps := false

	for id, node := range nodeMap {
		if mode == "prd-to-plan" && node.Type == NodePRD {
			hasPlan := false
			for _, child := range node.Children {
				if child.Type == NodePlan || child.Type == NodeTask {
					hasPlan = true
					break
				}
			}
			if !hasPlan {
				sb.WriteString(fmt.Sprintf("- %s: %s -> Action: Create Plan elements\n", id, node.Title))
				foundGaps = true
			}
		} else if mode == "plan-to-tasks" && node.Type == NodePlan {
			hasTask := false
			for _, child := range node.Children {
				if child.Type == NodeTask {
					hasTask = true
					break
				}
			}
			if !hasTask {
				sb.WriteString(fmt.Sprintf("- %s: %s -> Action: Decompose into Tasks\n", id, node.Title))
				foundGaps = true
			}
		}
	}

	if !foundGaps {
		sb.WriteString("No gaps found!\n")
	}

	return sb.String(), nil
}
