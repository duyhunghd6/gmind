#!/usr/bin/env python3
# beads-id: br-chat-20260522-contract-to-ui-ralph-ssot-preview
# Chat requirement: render Mermaid diagrams and all Ralph Loop SSOT artifacts in the static preview.
"""Generate a static HTML preview from ALL Ralph Loop SSOT artifacts.

Reads ui-contract.md (YAML View Blueprint + Mermaid Logic Machine) and all
sibling SSOT artifacts, then produces:
  - index.html: Full Gate A review page with Mermaid-rendered diagrams,
    visual flow walk-throughs, storyboard timelines, component hierarchy
    trees, responsive layout mockups, conflict cards, and coverage matrices.
  - preview-manifest.json: Machine-readable summary of all artifacts.

Delegates to ralph_preview package modules:
  - markdown: fenced-block extraction, beads-id scanning
  - contract_summary: YAML + Mermaid contract parsing
  - artifacts: sibling SSOT artifact loading
  - artifact_summary: cross-reference matrices
  - manifest: preview-manifest.json builder
  - html_render: full HTML page renderer (integrates all viz_ modules)
  - viz_flow: flow diagram walk-through visualizer
  - viz_storyboard: storyboard trajectory visualizer
  - viz_component: component hierarchy tree visualizer
  - viz_layout: layout rules responsive mockup visualizer
  - viz_review: review diagrams Mermaid gallery visualizer
  - viz_conflicts: PRD/DS conflicts card visualizer
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from ralph_preview import GENERATOR_BEADS_ID
from ralph_preview.markdown import extract_blocks, require_yaml_block, require_mermaid_block
from ralph_preview.contract_summary import load_yaml, parse_mermaid_transitions, collect_summary
from ralph_preview.artifacts import load_all_artifacts
from ralph_preview.manifest import build_manifest, write_manifest
from ralph_preview.html_render import render_html
from ralph_preview.artifact_summary import build_coverage_matrix


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate static UI preview from ui-contract.md and SSOT artifacts")
    parser.add_argument("--contract", required=True, type=Path, help="Path to ui-contract.md")
    parser.add_argument("--out", required=True, type=Path, help="Output preview directory")
    args = parser.parse_args()

    if not args.contract.exists():
        from ralph_preview.markdown import fail
        fail(f"contract file does not exist: {args.contract}")

    contract_dir = args.contract.parent
    markdown = args.contract.read_text(encoding="utf-8")

    # Parse canonical contract
    blocks = extract_blocks(markdown)
    yaml_source = require_yaml_block(blocks, context="ui-contract.md")
    mermaid_source = require_mermaid_block(blocks, context="ui-contract.md")
    contract = load_yaml(yaml_source)
    transitions = parse_mermaid_transitions(mermaid_source)
    summary = collect_summary(contract, transitions)

    # Load sibling SSOT artifacts
    artifacts = load_all_artifacts(contract_dir)

    # Build coverage matrix
    coverage = build_coverage_matrix(summary, artifacts)

    # Build and write manifest
    manifest = build_manifest(
        contract_path=str(args.contract),
        contract_dir=str(contract_dir),
        contract_summary=summary,
        artifacts=artifacts,
    )
    manifest["generator_beads_id"] = GENERATOR_BEADS_ID

    # Render and write HTML
    args.out.mkdir(parents=True, exist_ok=True)
    html_content = render_html(
        contract=contract,
        mermaid_source=mermaid_source,
        summary=summary,
        artifacts=artifacts,
        contract_path=str(args.contract),
        coverage=coverage,
    )
    (args.out / "index.html").write_text(html_content, encoding="utf-8")
    write_manifest(manifest, args.out)

    print(json.dumps({
        "status": "OK",
        "out": str(args.out),
        "warnings": len(summary["warnings"]),
        "artifacts_loaded": sum(1 for a in artifacts.values() if a.get("status", {}).get("exists")),
        "artifacts_total": len(artifacts),
        "generator_beads_id": GENERATOR_BEADS_ID,
    }, indent=2))


if __name__ == "__main__":
    main()
