package graph

import (
	"bufio"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"gopkg.in/yaml.v3"
)

type Parser struct {
	DocsDir string
}

func NewParser(docsDir string) *Parser {
	return &Parser{DocsDir: docsDir}
}

type PRDFrontMatter struct {
	BeadsID  string `yaml:"beads-id"`
	Title    string `yaml:"title"`
	Sections []struct {
		Anchor  string `yaml:"anchor"`
		Title   string `yaml:"title"`
		BeadsID string `yaml:"beads-id"`
	} `yaml:"sections"`
}

type PlanFrontMatter struct {
	BeadsID   string   `yaml:"beads-id"`
	Title     string   `yaml:"title"`
	Satisfies []string `yaml:"satisfies"`
}

func (p *Parser) ParseAll() ([]*Node, error) {
	var nodes []*Node
	err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if info.IsDir() {
			if info.Name() == "node_modules" || info.Name() == ".git" || info.Name() == ".turbo" || info.Name() == ".next" {
				return filepath.SkipDir
			}
			return nil
		}
		if !strings.HasSuffix(info.Name(), ".md") {
			return nil
		}

		fileNodes, err := p.ParseFile(path)
		if err == nil {
			nodes = append(nodes, fileNodes...)
		}
		return nil
	})
	return nodes, err
}

func (p *Parser) ParseFile(path string) ([]*Node, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var nodes []*Node
	scanner := bufio.NewScanner(file)
	var content strings.Builder
	for scanner.Scan() {
		content.WriteString(scanner.Text() + "\n")
	}

	fullContent := content.String()

	// Parse YAML Front Matter
	reYAML := regexp.MustCompile(`(?s)^---\n(.*?)\n---`)
	match := reYAML.FindStringSubmatch(fullContent)
	if len(match) > 1 {
		yamlContent := match[1]
		
		// Try PRD format
		var prd PRDFrontMatter
		if err := yaml.Unmarshal([]byte(yamlContent), &prd); err == nil && prd.BeadsID != "" && len(prd.Sections) > 0 {
			for _, sec := range prd.Sections {
				nodes = append(nodes, &Node{
					ID:     sec.BeadsID,
					Title:  sec.Title,
					Type:   NodePRD,
					Source: path,
				})
			}
		}

		// Try Plan format
		var plan PlanFrontMatter
		if err := yaml.Unmarshal([]byte(yamlContent), &plan); err == nil && plan.BeadsID != "" {
			planNode := &Node{
				ID:           plan.BeadsID,
				Title:        plan.Title,
				Type:         NodePlan,
				Source:       path,
				RawSatisfies: plan.Satisfies,
			}
			nodes = append(nodes, planNode)
		}
	}

	// Parse Inline Markers: <!-- beads-id: br-plan-01 | satisfies: br-prd02-s1 -->
	reInline := regexp.MustCompile(`<!--\s*beads-id:\s*([\w-]+)\s*(?:\|\s*satisfies:\s*([\w-,\s]+))?\s*-->`)
	matches := reInline.FindAllStringSubmatch(fullContent, -1)
	for _, m := range matches {
		id := m[1]
		node := &Node{
			ID:     id,
			Type:   NodePlan, // Default to Plan for these markers
			Source: path,
		}
		if strings.HasPrefix(id, "br-prd") {
			node.Type = NodePRD
		}
		if len(m) > 2 && m[2] != "" {
			satisfies := strings.Split(m[2], ",")
			for _, s := range satisfies {
				node.RawSatisfies = append(node.RawSatisfies, strings.TrimSpace(s))
			}
		}
		nodes = append(nodes, node)
	}

	return nodes, nil
}
