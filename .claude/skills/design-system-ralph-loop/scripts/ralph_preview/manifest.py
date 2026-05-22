"""Build and write the preview-manifest.json."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import GENERATOR_BEADS_ID
from .artifact_summary import summarize_artifacts, build_coverage_matrix


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
    if sb_data and isinstance(sb_data, dict):
        manifest["storyboards"] = {
            "trajectories_total": sb_data.get("trajectories_total", 0),
            "trajectory_ids": [t.get("trajectory_id") for t in sb_data.get("trajectories", [])],
        }

    # Layout rules summary
    lr_data = artifacts.get("layout-rules.json", {}).get("data")
    if lr_data and isinstance(lr_data, dict):
        screens_list = lr_data.get("screens", [])
        manifest["layout_rules"] = {
            "screen_count": len(screens_list) if isinstance(screens_list, list) else 0,
            "viewports": lr_data.get("viewports", []),
        }

    # Component map summary
    cm_data = artifacts.get("component-map.json", {}).get("data")
    if cm_data and isinstance(cm_data, dict):
        manifest["component_map"] = {
            "components_total": cm_data.get("components_total", 0),
            "ds_ids_total": cm_data.get("ds_ids_total", 0),
            "actions_mapped_total": cm_data.get("actions_mapped_total", 0),
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
