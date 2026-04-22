package cmd

import (
	"reflect"
	"testing"
)

func TestEscalationTransitionClearsAllTerminalLabels(t *testing.T) {
	transition := newEscalationTransition("critical dependency blocked")

	if transition.issueStatus != "blocked" {
		t.Fatalf("expected blocked status, got %q", transition.issueStatus)
	}
	if transition.label != "rte:escalated" {
		t.Fatalf("expected rte:escalated label, got %q", transition.label)
	}
	if transition.resolution != "" {
		t.Fatalf("expected resolution to be cleared, got %q", transition.resolution)
	}
	if transition.approvedBy != "" {
		t.Fatalf("expected approver to be cleared, got %q", transition.approvedBy)
	}
	if transition.approvedAt != "" {
		t.Fatalf("expected approval time to be cleared, got %q", transition.approvedAt)
	}

	expected := []string{
		"update", "br-123", "--status", "blocked",
		"--remove-label", "rte:escalated",
		"--remove-label", "rte:approved",
		"--remove-label", "rte:rejected",
		"--add-label", "rte:escalated",
		"--json",
	}
	if args := transition.brUpdateArgs("br-123"); !reflect.DeepEqual(args, expected) {
		t.Fatalf("unexpected br args: %#v", args)
	}
}

func TestApprovalTransitionRemovesAllTerminalLabels(t *testing.T) {
	transition := newApprovalTransition("ship with mitigation", "RTE", "2026-04-22T10:00:00Z")

	if transition.issueStatus != "in_progress" {
		t.Fatalf("expected in_progress status, got %q", transition.issueStatus)
	}
	if transition.label != "rte:approved" {
		t.Fatalf("expected rte:approved label, got %q", transition.label)
	}
	if transition.resolution != "ship with mitigation" {
		t.Fatalf("expected resolution to be preserved, got %q", transition.resolution)
	}
	if transition.approvedBy != "RTE" {
		t.Fatalf("expected approver to be preserved, got %q", transition.approvedBy)
	}
	if transition.approvedAt != "2026-04-22T10:00:00Z" {
		t.Fatalf("expected approval time to be preserved, got %q", transition.approvedAt)
	}

	expected := []string{
		"update", "br-123", "--status", "in_progress",
		"--remove-label", "rte:escalated",
		"--remove-label", "rte:approved",
		"--remove-label", "rte:rejected",
		"--add-label", "rte:approved",
		"--json",
	}
	if args := transition.brUpdateArgs("br-123"); !reflect.DeepEqual(args, expected) {
		t.Fatalf("unexpected br args: %#v", args)
	}
}

func TestRejectionTransitionClearsApprovalLabelAndMetadataFields(t *testing.T) {
	transition := newRejectionTransition("missing rollback plan")

	if transition.issueStatus != "open" {
		t.Fatalf("expected open status, got %q", transition.issueStatus)
	}
	if transition.label != "rte:rejected" {
		t.Fatalf("expected rte:rejected label, got %q", transition.label)
	}
	if transition.resolution != "missing rollback plan" {
		t.Fatalf("expected rejection reason to be preserved, got %q", transition.resolution)
	}
	if transition.approvedBy != "" {
		t.Fatalf("expected approver to be cleared, got %q", transition.approvedBy)
	}
	if transition.approvedAt != "" {
		t.Fatalf("expected approval time to be cleared, got %q", transition.approvedAt)
	}

	expected := []string{
		"update", "br-123", "--status", "open",
		"--remove-label", "rte:escalated",
		"--remove-label", "rte:approved",
		"--remove-label", "rte:rejected",
		"--add-label", "rte:rejected",
		"--json",
	}
	if args := transition.brUpdateArgs("br-123"); !reflect.DeepEqual(args, expected) {
		t.Fatalf("unexpected br args: %#v", args)
	}
}
