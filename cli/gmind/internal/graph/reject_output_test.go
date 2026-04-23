package graph

import (
	"strings"
	"testing"

	"github.com/duyhunghd6/gmind/cli/gmind/internal/storage"
)

func TestTraceNode_RenderTree_IncludesRTERejectedReason(t *testing.T) {
	taskNode := &Node{
		ID:            "task-rte-rejected",
		Title:         "Task",
		Type:          NodeTask,
		Status:        "open",
		RTEStatus:     "rejected",
		RTEResolution: "need a new approach",
	}

	a := &Assembler{}
	var sb strings.Builder
	a.renderTree(&sb, taskNode, 0, false)
	output := sb.String()

	checks := []string{
		"[RTE:REJECTED]",
		"new approach required",
		"Latest rejection reason: need a new approach",
	}
	for _, want := range checks {
		if !strings.Contains(output, want) {
			t.Fatalf("expected rejected trace output to contain %q, got:\n%s", want, output)
		}
	}
}

func TestRenderIssueSection_UsesRejectedReasonLabel(t *testing.T) {
	issue := &storage.Issue{
		ID:            "br-test-rejected",
		Title:         "Rejected issue",
		Status:        "open",
		Priority:      1,
		Description:   "Needs revision",
		RTEStatus:     "rejected",
		RTEResolution: "missing dependency plan",
	}

	got := renderIssueSection(issue)

	checks := []string{
		"## RTE Rejection",
		"- Status: rejected",
		"- Guidance: A new approach is required before execution resumes",
		"- Reason: missing dependency plan",
	}
	for _, want := range checks {
		if !strings.Contains(got, want) {
			t.Fatalf("expected output to contain %q, got:\n%s", want, got)
		}
	}
	if strings.Contains(got, "- Resolution:") {
		t.Fatalf("did not expect generic resolution label in output:\n%s", got)
	}
}
