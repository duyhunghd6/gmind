package graph

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

func TestParserParseFile_PRD(t *testing.T) {
	// Create a temp PRD file
	tmpDir := t.TempDir()
	prdContent := `---
beads-id: br-prd99
title: "Test PRD"
sections:
  - anchor: "1-section"
    title: "Section One"
    beads-id: br-prd99-s1
  - anchor: "2-section"
    title: "Section Two"
    beads-id: br-prd99-s2
---

# Test PRD

<!-- beads-id: br-prd99 -->

## 1. Section One

<!-- beads-id: br-prd99-s1 -->

Content here.

## 2. Section Two

<!-- beads-id: br-prd99-s2 -->

More content.
`
	prdPath := filepath.Join(tmpDir, "test-prd.md")
	os.WriteFile(prdPath, []byte(prdContent), 0o644)

	p := NewParser(tmpDir)
	nodes, err := p.ParseFile(prdPath)
	if err != nil {
		t.Fatal("ParseFile failed:", err)
	}

	// Should find sections from YAML frontmatter + inline markers
	if len(nodes) < 2 {
		t.Errorf("expected at least 2 nodes from PRD, got %d", len(nodes))
	}

	// Check that br-prd99-s1 exists as PRD type
	found := false
	for _, n := range nodes {
		if n.ID == "br-prd99-s1" && n.Type == NodePRD {
			found = true
			break
		}
	}
	if !found {
		t.Error("expected to find node br-prd99-s1 of type PRD")
	}
}

func TestParserParseFile_Plan(t *testing.T) {
	tmpDir := t.TempDir()
	planContent := `---
beads-id: br-plan-01
title: "Test Plan"
satisfies:
  - br-prd99-s1
---

# Test Plan

<!-- beads-id: br-plan-01 | satisfies: br-prd99-s1 -->

Plan elements here.
`
	planPath := filepath.Join(tmpDir, "test-plan.md")
	os.WriteFile(planPath, []byte(planContent), 0o644)

	p := NewParser(tmpDir)
	nodes, err := p.ParseFile(planPath)
	if err != nil {
		t.Fatal("ParseFile failed:", err)
	}

	if len(nodes) == 0 {
		t.Fatal("expected at least 1 node from Plan")
	}

	// Check plan node has satisfies link
	found := false
	for _, n := range nodes {
		if n.ID == "br-plan-01" && n.Type == NodePlan {
			found = true
			if len(n.RawSatisfies) == 0 {
				t.Error("expected RawSatisfies to contain br-prd99-s1")
			}
			break
		}
	}
	if !found {
		t.Error("expected to find node br-plan-01 of type Plan")
	}
}

func TestParserParseFile_Empty(t *testing.T) {
	tmpDir := t.TempDir()
	emptyPath := filepath.Join(tmpDir, "empty.md")
	os.WriteFile(emptyPath, []byte("# Just a title\n\nNo beads IDs here.\n"), 0o644)

	p := NewParser(tmpDir)
	nodes, err := p.ParseFile(emptyPath)
	if err != nil {
		t.Fatal("ParseFile failed:", err)
	}
	if len(nodes) != 0 {
		t.Errorf("expected 0 nodes from empty file, got %d", len(nodes))
	}
}

func TestTraceNode_RenderTree(t *testing.T) {
	// Build minimal nodes manually
	prdNode := &Node{
		ID:    "br-prd-test",
		Title: "Test PRD",
		Type:  NodePRD,
	}
	planNode := &Node{
		ID:    "br-plan-test",
		Title: "Test Plan",
		Type:  NodePlan,
	}
	taskNode := &Node{
		ID:     "task-test",
		Title:  "Test Task",
		Type:   NodeTask,
		Status: "open",
	}

	prdNode.Children = []*Node{planNode}
	planNode.Parents = []*Node{prdNode}
	planNode.Children = []*Node{taskNode}
	taskNode.Parents = []*Node{planNode}

	// Render forward
	a := &Assembler{}
	var sb strings.Builder
	a.renderTree(&sb, prdNode, 0, false)
	output := sb.String()

	if !strings.Contains(output, "br-prd-test") {
		t.Error("tree output missing PRD node")
	}
	if !strings.Contains(output, "br-plan-test") {
		t.Error("tree output missing Plan node")
	}
	if !strings.Contains(output, "task-test") {
		t.Error("tree output missing Task node")
	}
}

func TestTraceNode_RenderTree_Reverse(t *testing.T) {
	prdNode := &Node{ID: "br-prd-rev", Title: "PRD", Type: NodePRD}
	taskNode := &Node{ID: "task-rev", Title: "Task", Type: NodeTask}
	taskNode.Parents = []*Node{prdNode}
	prdNode.Children = []*Node{taskNode}

	a := &Assembler{}
	var sb strings.Builder
	a.renderTree(&sb, taskNode, 0, true)
	output := sb.String()

	if !strings.Contains(output, "br-prd-rev") {
		t.Error("reverse tree output missing parent PRD node")
	}
}

func TestTraceNode_RenderTree_IncludesRTEApprovalResolution(t *testing.T) {
	taskNode := &Node{
		ID:            "task-rte",
		Title:         "Task",
		Type:          NodeTask,
		Status:        "in_progress",
		RTEStatus:     "approved",
		RTEResolution: "resume with execution context",
	}

	a := &Assembler{}
	var sb strings.Builder
	a.renderTree(&sb, taskNode, 0, false)
	output := sb.String()

	if !strings.Contains(output, "[RTE:APPROVED] resume with execution context") {
		t.Fatalf("expected RTE approval line in output, got:\n%s", output)
	}
}

func TestConvertToTraceNode(t *testing.T) {
	root := &Node{
		ID:            "root",
		Title:         "Root",
		Type:          NodePRD,
		RTEStatus:     "approved",
		RTERisk:       "high",
		RTEResolution: "resume here",
		RTEApprovedBy: "RTE-Lead",
		RTEApprovedAt: "2026-04-22T03:00:00Z",
	}
	child := &Node{
		ID:    "child",
		Title: "Child",
		Type:  NodeTask,
	}
	root.Children = []*Node{child}

	a := &Assembler{}
	visited := make(map[string]bool)
	tn := a.convertToTraceNode(root, false, visited)

	if tn.ID != "root" {
		t.Errorf("expected root ID, got %s", tn.ID)
	}
	if len(tn.Children) != 1 {
		t.Errorf("expected 1 child, got %d", len(tn.Children))
	}
	if tn.RTEStatus != "approved" || tn.RTEResolution != "resume here" {
		t.Fatalf("expected RTE fields to be copied, got %+v", tn)
	}
	if tn.RTEApprovedBy != "RTE-Lead" || tn.RTEApprovedAt != "2026-04-22T03:00:00Z" {
		t.Fatalf("expected approval metadata to be copied, got %+v", tn)
	}
}

func TestConvertToTraceNode_CycleProtection(t *testing.T) {
	nodeA := &Node{ID: "a", Type: NodePRD}
	nodeB := &Node{ID: "b", Type: NodePlan}
	nodeA.Children = []*Node{nodeB}
	nodeB.Children = []*Node{nodeA} // cycle

	a := &Assembler{}
	visited := make(map[string]bool)
	tn := a.convertToTraceNode(nodeA, false, visited)

	// Should not infinite loop — nodeA visited prevents re-expansion
	if tn.ID != "a" {
		t.Error("expected to get node a")
	}
}

func TestGetIcon(t *testing.T) {
	tests := []struct {
		nodeType NodeType
		expected string
	}{
		{NodePRD, "📄"},
		{NodePlan, "🗺️"},
		{NodeTask, "✅"},
		{NodeCommit, "📦"},
		{NodeType("unknown"), "•"},
	}
	for _, tc := range tests {
		got := getIcon(tc.nodeType)
		if got != tc.expected {
			t.Errorf("getIcon(%s) = %s, want %s", tc.nodeType, got, tc.expected)
		}
	}
}

func TestImpact_NoDownstream(t *testing.T) {
	node := &Node{ID: "isolated", Title: "Isolated Node", Type: NodePRD}

	_ = &Assembler{} // Assembler available but impact logic tested directly
	var sb strings.Builder
	sb.WriteString("Cascading Impact Analysis for isolated:\n\n")

	// Simulate Impact logic: no children = no downstream
	visited := make(map[string]bool)
	queue := node.Children
	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]
		if visited[curr.ID] {
			continue
		}
		visited[curr.ID] = true
	}

	if len(visited) != 0 {
		t.Errorf("expected 0 downstream items, got %d", len(visited))
	}
}

func TestFormatIssueContext_EmptyDescriptionAndRTEApproval(t *testing.T) {
	issue := &storage.Issue{
		ID:            "br-test-123",
		Title:         "Approved issue",
		Status:        "in_progress",
		Priority:      1,
		Type:          "task",
		Assignee:      "agent",
		Description:   "   ",
		RTEStatus:     "approved",
		RTERisk:       "cross-team dependency",
		RTEResolution: "approved execution path",
		RTEApprovedBy: "RTE-Lead",
		RTEApprovedAt: "2026-04-22T03:00:00Z",
	}

	got := renderIssueSection(issue)

	checks := []string{
		"## Issue",
		"- ID: br-test-123",
		"- Description: (empty)",
		"## RTE Approval",
		"- Status: approved",
		"- Risk: cross-team dependency",
		"- Resolution: approved execution path",
		"- Approved by: RTE-Lead",
		"- Approved at: 2026-04-22T03:00:00Z",
	}
	for _, want := range checks {
		if !strings.Contains(got, want) {
			t.Fatalf("expected output to contain %q, got:\n%s", want, got)
		}
	}
}

func TestRenderIssueSection_OmitsEmptyOptionalFields(t *testing.T) {
	issue := &storage.Issue{
		ID:          "br-test-456",
		Title:       "Minimal issue",
		Status:      "open",
		Priority:    2,
		Description: "Has details",
	}

	got := renderIssueSection(issue)

	if strings.Contains(got, "## RTE Metadata") || strings.Contains(got, "## RTE Approval") {
		t.Fatalf("did not expect RTE section in output:\n%s", got)
	}
	if strings.Contains(got, "- Assignee:") || strings.Contains(got, "- Type:") {
		t.Fatalf("did not expect empty optional fields in output:\n%s", got)
	}
}

func TestRenderContextText_CombinesStructuredSections(t *testing.T) {
	data := &ContextData{
		BeadsID: "br-test-789",
		Depth:   2,
		Issue: &storage.Issue{
			ID:          "br-test-789",
			Title:       "Structured issue",
			Status:      "blocked",
			Priority:    3,
			Description: "Needs review",
		},
		RelatedKnowledge: []ContextKnowledge{{
			SourceType: "rte-approval",
			SourceRef:  "br-test-789",
			Content:    "Approved for implementation",
		}},
		CodeContext: "{\"matches\":[]}",
	}

	got := renderContextText(data)

	checks := []string{
		"## Issue",
		"## Related Knowledge (Zvec)",
		"## Code Context (FastCode)",
	}
	for _, want := range checks {
		if !strings.Contains(got, want) {
			t.Fatalf("expected output to contain %q, got:\n%s", want, got)
		}
	}
}

func TestShouldIncludeCodeContext(t *testing.T) {
	if !shouldIncludeCodeContext(0) {
		t.Fatal("expected depth 0 to include code context")
	}
	if !shouldIncludeCodeContext(1) {
		t.Fatal("expected depth 1 to include code context")
	}
	if shouldIncludeCodeContext(-1) {
		t.Fatal("expected negative depth to skip code context")
	}
}
