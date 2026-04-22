package cmd

var terminalRTELabels = []string{
	"rte:escalated",
	"rte:approved",
	"rte:rejected",
}

type rteTransition struct {
	issueStatus string
	label       string
	resolution  string
	approvedBy  string
	approvedAt  string
}

func newEscalationTransition(risk string) rteTransition {
	_ = risk
	return rteTransition{
		issueStatus: "blocked",
		label:       "rte:escalated",
	}
}

func newApprovalTransition(resolution, approvedBy, approvedAt string) rteTransition {
	return rteTransition{
		issueStatus: "in_progress",
		label:       "rte:approved",
		resolution:  resolution,
		approvedBy:  approvedBy,
		approvedAt:  approvedAt,
	}
}

func newRejectionTransition(reason string) rteTransition {
	return rteTransition{
		issueStatus: "open",
		label:       "rte:rejected",
		resolution:  reason,
	}
}

func (t rteTransition) brUpdateArgs(id string) []string {
	args := []string{"update", id, "--status", t.issueStatus}
	for _, label := range terminalRTELabels {
		args = append(args, "--remove-label", label)
	}
	args = append(args, "--add-label", t.label, "--json")
	return args
}
