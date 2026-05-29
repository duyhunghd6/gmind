"""Summarize loaded artifacts for manifest and cross-reference matrices."""

from __future__ import annotations

from typing import Any

from .contract_summary import extract_event_labels


def storyboard_trajectories(data: Any) -> list[dict[str, Any]]:
    if not isinstance(data, dict):
        return []
    trajectories = data.get("trajectories", [])
    return [t for t in trajectories if isinstance(t, dict)] if isinstance(trajectories, list) else []


def layout_rules(data: Any) -> list[dict[str, Any]]:
    if not isinstance(data, dict):
        return []
    rules = data.get("rules", data.get("screens", []))
    return [r for r in rules if isinstance(r, dict)] if isinstance(rules, list) else []


def layout_screen_ids(data: Any) -> list[str]:
    ids: set[str] = set()
    for rule in layout_rules(data):
        screen_id = rule.get("screen_id") or rule.get("id")
        if screen_id:
            ids.add(str(screen_id))
    return sorted(ids)


def layout_viewports(data: Any) -> list[Any]:
    if not isinstance(data, dict):
        return []
    viewports = data.get("viewports")
    if isinstance(viewports, list):
        return viewports
    names: dict[str, int | None] = {}
    for rule in layout_rules(data):
        viewport = rule.get("viewport")
        if viewport:
            width = rule.get("width") if isinstance(rule.get("width"), int) else None
            names.setdefault(str(viewport), width)
    return [{"name": name, "width": width} for name, width in sorted(names.items())]


def component_entries(data: Any) -> list[dict[str, Any]]:
    if not isinstance(data, dict):
        return []
    components = data.get("components", [])
    return [c for c in components if isinstance(c, dict)] if isinstance(components, list) else []


def component_ds_id(component: dict[str, Any]) -> str:
    return str(component.get("ds_id") or component.get("component_ds_id") or "")


def component_screen(component: dict[str, Any]) -> str:
    return str(component.get("screen") or component.get("screen_id") or "unknown")


def component_type(component: dict[str, Any]) -> str:
    return str(component.get("type") or component.get("component_type") or component.get("ds_type") or "Component")


def component_actions(component: dict[str, Any]) -> list[str]:
    actions = component.get("actions", [])
    if isinstance(actions, list):
        return [str(action) for action in actions]
    return [str(actions)] if actions else []


def component_map_counts(data: Any) -> dict[str, int]:
    if not isinstance(data, dict):
        return {"components_total": 0, "ds_ids_total": 0, "actions_mapped_total": 0}
    coverage = data.get("coverage", {}) if isinstance(data.get("coverage"), dict) else {}
    components = component_entries(data)
    ds_ids = {component_ds_id(c) for c in components if component_ds_id(c)}
    actions = {action for c in components for action in component_actions(c)}
    return {
        "components_total": int(data.get("components_total") or coverage.get("components") or len(components)),
        "ds_ids_total": int(data.get("ds_ids_total") or len(ds_ids)),
        "actions_mapped_total": int(data.get("actions_mapped_total") or coverage.get("actions_catalogued") or len(actions)),
    }


def component_map_ds_ids(data: Any) -> list[str]:
    if not isinstance(data, dict):
        return []
    ds_ids = data.get("ds_ids")
    if isinstance(ds_ids, list) and ds_ids:
        return [str(ds_id) for ds_id in ds_ids]
    return sorted({component_ds_id(c) for c in component_entries(data) if component_ds_id(c)})


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
    for traj in storyboard_trajectories(sb_data):
        for screen_id in traj.get("screen_ids", []):
            if screen_id:
                storyboard_screens.add(str(screen_id))
        for step in traj.get("steps", []):
            if isinstance(step, dict):
                scr = step.get("screen_id") or step.get("screen") or step.get("data_screen_id") or step.get("state", "").split(".")[0]
                if scr and str(scr).startswith("screen:"):
                    storyboard_screens.add(str(scr))

    # Check which ds_ids appear in component-map
    cmap_data = artifacts.get("component-map.json", {}).get("data")
    cmap_ds_ids: set[str] = set(component_map_ds_ids(cmap_data))

    # Check which events appear in flow.md mermaid
    flow_events: set[str] = set()
    flow_info = artifacts.get("flow.md", {})
    for mb in flow_info.get("mermaid_blocks", []):
        source = mb.get("source", "")
        for line in source.splitlines():
            line = line.strip()
            if ":" in line and "-->" in line:
                event_label = line.split(":", 1)[1].strip()
                flow_events.update(extract_event_labels(event_label))

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
