package storage

import (
	"testing"
)

func TestSplitMarkdownByBeadsID(t *testing.T) {
	tests := []struct {
		name    string
		content string
		want    int
	}{
		{
			name:    "Empty",
			content: "",
			want:    0,
		},
		{
			name: "No Markers",
			content: "# Header\nSome content without markers\n## Subheader\nMore content",
			want: 1, // Only 1 chunk
		},
		{
			name: "YAML Frontmatter only",
			content: "---\nbeads-id: br-test-1\n---\n# Content\nHello",
			want: 1, // Entire file as 1 chunk
		},
		{
			name: "YAML and one inline marker",
			content: "---\nbeads-id: br-test-1\n---\n# Content\nHello\n<!-- beads-id: br-test-2 -->\nNew section",
			want: 2, 
		},
		{
			name: "Multiple inline markers",
			content: "# Main Header\ncontent1\n<!-- beads-id: br-test-1 -->\ncontent2\n<!-- beads-id: br-test-2 -->\ncontent3",
			want: 3,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := splitMarkdownByBeadsID(tt.content)
			if len(got) != tt.want {
				t.Errorf("splitMarkdownByBeadsID() len = %v, want %v. Got content: %v", len(got), tt.want, got)
			}
		})
	}
}
