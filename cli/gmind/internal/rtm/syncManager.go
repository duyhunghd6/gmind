package rtm

import (
	"fmt"
)

// SyncManager bidirectional sync
type SyncManager struct {
	// Requires db connection
}

func (s *SyncManager) SyncAll() error {
	fmt.Println("Syncing all plans in docs/plans/")
	return nil
}

func (s *SyncManager) CalculateCoverage(mode string) (string, error) {
	return fmt.Sprintf("Calculated '%s' coverage...", mode), nil
}

func (s *SyncManager) AnalyzeImpact(prdSectionID string) (string, error) {
	return fmt.Sprintf("Impact analysis for %s...", prdSectionID), nil
}
