"""Summarize loaded artifacts for manifest and cross-reference matrices."""

from __future__ import annotations

from typing import Any


def summarize_artifacts(artifacts: dict[str, Any]) -> dict[str, Any]:
    """Build a compact artifact summary for the manifest."""
    summary: dict[str, Any] = {}
    for name, info in artifacts.items():
        status = info.get("status", {})
        entry: dict[str, Any] = {
            "exists": status.get("exists", False),
            "parse_ok": status.get("parse_ok"),
        }
        if info.get("type") == "markdown":
            entry["beads_ids"] = info.get("beads_ids", [])
            entry["mermaid_block_count"] = len(info.get("mermaid_blocks", []))
            entry["line_count"] = info.get("line_count", 0)
        elif info.get("type") == "json":
            entry["size_bytes"] = info.get("size_bytes", 0)
        elif info.get("type") == "markdown_split":
            entry["file_count"] = len(info.get("files", []))
            entry["mermaid_block_count"] = sum(
                len(f.get("mermaid_blocks", [])) for f in info.get("files", [])
            )
        if status.get("error"):
            entry["error"] = status["error"]
        summary[name] = entry
    return summary


def build_coverage_matrix(
    contract_summary: dict[str, Any],
    artifacts: dict[str, Any],
) -> dict[str, Any]:
    """Build cross-artifact coverage matrices for screens, events, ds_ids."""
    screens = {s.get("id", str(i)) for i, s in enumerate(contract_summary.get("screens", []))}
    events = set(contract_summary.get("events", []))
    ds_ids = set(contract_summary.get("ds_ids", []))

    # Check which screens appear in storyboards
    storyboard_screens: set[str] = set()
    sb_data = artifacts.get("storyboards.json", {}).get("data")
    if sb_data and isinstance(sb_data, dict):
        for traj in sb_data.get("trajectories", []):
            for step in traj.get("steps", []):
                scr = step.get("screen") or step.get("state", "").split(".")[0]
                if scr:
                    storyboard_screens.add(scr)

    # Check which ds_ids appear in component-map
    cmap_ds_ids: set[str] = set()
    cmap_data = artifacts.get("component-map.json", {}).get("data")
    if cmap_data and isinstance(cmap_data, dict):
        cmap_ds_ids = {c.get("ds_id") for c in cmap_data.get("components", []) if c.get("ds_id")}

    # Check which events appear in flow.md mermaid
    flow_events: set[str] = set()
    flow_info = artifacts.get("flow.md", {})
    for mb in flow_info.get("mermaid_blocks", []):
        source = mb.get("source", "")
        for line in source.splitlines():
            line = line.strip()
            if ":" in line and "-->" in line:
                parts = line.split(":")
                if len(parts) > 1:
                    evt = parts[-1].strip().split("/")[0].strip()
                    if evt:
                        flow_events.add(evt)

    screen_matrix = {
        screen: {
            "in_contract": True,
            "in_storyboards": screen in storyboard_screens,
        }
        for screen in sorted(screens)
    }

    event_matrix = {
        event: {
            "in_contract": True,
            "in_flow": event in flow_events,
        }
        for event in sorted(events)
    }

    ds_id_matrix = {
        ds_id: {
            "in_contract": True,
            "in_component_map": ds_id in cmap_ds_ids,
        }
        for ds_id in sorted(ds_ids)
    }

    return {
        "screens": screen_matrix,
        "events": event_matrix,
        "ds_ids": ds_id_matrix,
    }
