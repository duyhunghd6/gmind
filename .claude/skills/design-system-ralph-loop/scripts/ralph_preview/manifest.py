"""Build and write the preview-manifest.json."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import GENERATOR_BEADS_ID
from .artifact_summary import (
    summarize_artifacts,
    build_coverage_matrix,
    storyboard_trajectories,
    layout_rules,
    layout_screen_ids,
    layout_viewports,
    component_map_counts,
    component_map_ds_ids,
)


def build_manifest(
    contract_path: str,
    contract_dir: str,
    contract_summary: dict[str, Any],
    artifacts: dict[str, Any],
) -> dict[str, Any]:
    """Build the full preview manifest preserving existing keys plus SSOT metadata."""
    manifest: dict[str, Any] = {
        "generator_beads_id": GENERATOR_BEADS_ID,
        "source_contract": contract_path,
        "contract_dir": contract_dir,
        # Preserve existing keys from old manifest
        "screens": contract_summary.get("screens", []),
        "components": contract_summary.get("components", []),
        "ds_ids": contract_summary.get("ds_ids", []),
        "actions": contract_summary.get("actions", []),
        "events": contract_summary.get("events", []),
        "transitions": contract_summary.get("transitions", []),
        "warnings": contract_summary.get("warnings", []),
        # New SSOT keys
        "artifacts": summarize_artifacts(artifacts),
    }

    # Add mermaid block details
    mermaid_blocks: list[dict[str, Any]] = []
    for name, info in artifacts.items():
        if info.get("type") in ("markdown", "markdown_split"):
            blocks = info.get("mermaid_blocks", [])
            for i, mb in enumerate(blocks):
                mermaid_blocks.append({
                    "source": name,
                    "index": i,
                    "heading": mb.get("heading", ""),
                    "line_count": len(mb.get("source", "").splitlines()),
                })
    manifest["mermaid_blocks"] = mermaid_blocks

    # Storyboard summary
    sb_data = artifacts.get("storyboards.json", {}).get("data")
    trajectories = storyboard_trajectories(sb_data)
    if sb_data and isinstance(sb_data, dict):
        manifest["storyboards"] = {
            "trajectories_total": int(sb_data.get("trajectories_total") or len(trajectories)),
            "trajectory_ids": [t.get("trajectory_id") for t in trajectories],
        }

    # Layout rules summary
    lr_data = artifacts.get("layout-rules.json", {}).get("data")
    rules = layout_rules(lr_data)
    if lr_data and isinstance(lr_data, dict):
        manifest["layout_rules"] = {
            "rule_count": len(rules),
            "screen_count": len(layout_screen_ids(lr_data)),
            "viewports": layout_viewports(lr_data),
        }

    # Component map summary
    cm_data = artifacts.get("component-map.json", {}).get("data")
    if cm_data and isinstance(cm_data, dict):
        counts = component_map_counts(cm_data)
        manifest["component_map"] = {
            **counts,
            "ds_ids": component_map_ds_ids(cm_data),
        }

    # Conflicts summary
    conflicts_info = artifacts.get("prd-ds-conflicts.md", {})
    manifest["conflicts"] = {
        "exists": conflicts_info.get("status", {}).get("exists", False),
        "beads_ids": conflicts_info.get("beads_ids", []),
        "line_count": conflicts_info.get("line_count", 0),
    }

    # Coverage matrix
    manifest["coverage_matrix"] = build_coverage_matrix(contract_summary, artifacts)

    return manifest


def write_manifest(manifest: dict[str, Any], out_dir: Path) -> None:
    """Write manifest as JSON to out_dir/preview-manifest.json."""
    (out_dir / "preview-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2, default=str) + "\n",
        encoding="utf-8",
    )
