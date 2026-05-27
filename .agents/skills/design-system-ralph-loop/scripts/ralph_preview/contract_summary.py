"""Contract parsing: YAML View Blueprint summary and Mermaid transition extraction."""

from __future__ import annotations

import re
from typing import Any

try:
    import yaml  # type: ignore
except ImportError:
    yaml = None

TRANSITION_RE = re.compile(
    r"^\s*(?P<from>\[\*\]|[A-Za-z0-9_.:-]+)\s*--?>\s*(?P<to>\[\*\]|[A-Za-z0-9_.:-]+)"
    r"(?:\s*:\s*(?P<event>[^\n]+))?\s*$"
)


def load_yaml(source: str) -> dict[str, Any]:
    """Parse YAML string, fail if not a mapping."""
    from .markdown import fail
    if yaml is None:
        fail("PyYAML is required. Install with: python3 -m pip install pyyaml")
    try:
        data = yaml.safe_load(source)
    except Exception as exc:
        fail(f"failed to parse YAML View Blueprint: {exc}")
    if not isinstance(data, dict):
        fail("YAML View Blueprint must parse to a mapping/object")
    return data


def parse_mermaid_transitions(source: str) -> list[dict[str, str]]:
    """Extract state transitions from Mermaid stateDiagram-v2 source."""
    transitions: list[dict[str, str]] = []
    for raw in source.splitlines():
        line = raw.strip()
        if not line or line.startswith("%%") or line.startswith("stateDiagram"):
            continue
        match = TRANSITION_RE.match(line)
        if not match:
            continue
        event = (match.group("event") or "").strip()
        transitions.append({"from": match.group("from"), "to": match.group("to"), "event": event})
    return transitions


def as_list(value: Any) -> list[Any]:
    if value is None:
        return []
    if isinstance(value, list):
        return value
    return [value]


def iter_child_nodes(value: dict[str, Any], child_key: str) -> list[Any]:
    child_value = value.get(child_key)
    if isinstance(child_value, dict) and child_key in {"screens", "routes"}:
        return list(child_value.values())
    return as_list(child_value)


def walk_nodes(value: Any) -> list[dict[str, Any]]:
    found: list[dict[str, Any]] = []
    if isinstance(value, dict):
        if "ds_id" in value or "type" in value or "action" in value or "actions" in value:
            found.append(value)
        child_keys = (
            "screens", "routes", "layout", "view", "children",
            "components", "regions", "items",
        )
        for child_key in child_keys:
            for child in iter_child_nodes(value, child_key):
                found.extend(walk_nodes(child))
    elif isinstance(value, list):
        for item in value:
            found.extend(walk_nodes(item))
    return found


def collect_screens(contract: dict[str, Any]) -> list[dict[str, Any]]:
    screens = contract.get("screens") or contract.get("routes") or []
    if isinstance(screens, dict):
        return [{"id": key, **(val if isinstance(val, dict) else {"value": val})} for key, val in screens.items()]
    if isinstance(screens, list):
        return [item for item in screens if isinstance(item, dict)]
    return []


def collect_summary(contract: dict[str, Any], transitions: list[dict[str, str]]) -> dict[str, Any]:
    """Build canonical contract summary with screens, components, ds_ids, actions, events, warnings."""
    screens = collect_screens(contract)
    all_nodes = walk_nodes(contract)
    ds_ids = [str(node.get("ds_id")) for node in all_nodes if node.get("ds_id")]
    
    actions_set = set()
    for node in all_nodes:
        if node.get("action"):
            actions_set.add(str(node["action"]))
        if node.get("actions"):
            for a in as_list(node["actions"]):
                actions_set.add(str(a))
    actions = sorted(actions_set)
    
    events = sorted({t["event"] for t in transitions if t["event"]})

    duplicate_ds_ids = sorted({ds_id for ds_id in ds_ids if ds_ids.count(ds_id) > 1})
    warnings: list[str] = []
    for ds_id in duplicate_ds_ids:
        warnings.append(f"duplicate ds_id: {ds_id}")
    for action in actions:
        if action not in events:
            warnings.append(f"YAML action not found in Mermaid events: {action}")
    for event in events:
        if event.startswith("EVENT_") and event not in actions:
            warnings.append(f"Mermaid event not found in YAML actions: {event}")

    return {
        "screens": screens,
        "components": all_nodes,
        "ds_ids": ds_ids,
        "actions": actions,
        "events": events,
        "transitions": transitions,
        "warnings": warnings,
    }


def label_for_screen(screen: dict[str, Any]) -> str:
    return str(screen.get("id") or screen.get("name") or screen.get("route") or "screen")
