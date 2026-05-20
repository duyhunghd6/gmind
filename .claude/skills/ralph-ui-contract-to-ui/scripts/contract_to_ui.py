#!/usr/bin/env python3
"""Generate a simple HTML preview from a schema-driven ui-contract.md."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover - depends on local env
    yaml = None

FENCE_RE = re.compile(r"```(?P<lang>[\w-]+)\s*\n(?P<body>.*?)\n```", re.DOTALL)
TRANSITION_RE = re.compile(
    r"^\s*(?P<from>\[\*\]|[A-Za-z0-9_.:-]+)\s*--?>\s*(?P<to>\[\*\]|[A-Za-z0-9_.:-]+)(?:\s*:\s*(?P<event>[^\n]+))?\s*$"
)


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def extract_blocks(markdown: str) -> tuple[str, str]:
    yaml_blocks: list[str] = []
    mermaid_blocks: list[str] = []
    for match in FENCE_RE.finditer(markdown):
        lang = match.group("lang").lower()
        body = match.group("body").strip()
        if lang in {"yaml", "yml"}:
            yaml_blocks.append(body)
        elif lang == "mermaid":
            mermaid_blocks.append(body)

    if len(yaml_blocks) != 1:
        fail(f"expected exactly one YAML fenced block, found {len(yaml_blocks)}")
    if len(mermaid_blocks) != 1:
        fail(f"expected exactly one Mermaid fenced block, found {len(mermaid_blocks)}")
    return yaml_blocks[0], mermaid_blocks[0]


def load_yaml(source: str) -> dict[str, Any]:
    if yaml is None:
        fail("PyYAML is required to parse the YAML View Blueprint. Install with: python3 -m pip install pyyaml")
    try:
        data = yaml.safe_load(source)
    except Exception as exc:  # pragma: no cover - message depends on PyYAML
        fail(f"failed to parse YAML View Blueprint: {exc}")
    if not isinstance(data, dict):
        fail("YAML View Blueprint must parse to a mapping/object")
    return data


def parse_mermaid(source: str) -> list[dict[str, str]]:
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
        if "ds_id" in value or "type" in value or "action" in value:
            found.append(value)
        child_keys = ("screens", "routes", "layout", "view", "children", "components", "regions", "items")
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
    screens = collect_screens(contract)
    all_nodes = walk_nodes(contract)
    ds_ids = [str(node.get("ds_id")) for node in all_nodes if node.get("ds_id")]
    actions = sorted({str(node.get("action")) for node in all_nodes if node.get("action")})
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


def render_component(node: dict[str, Any], depth: int = 0) -> str:
    kind = html.escape(str(node.get("type") or "Component"))
    ds_id = html.escape(str(node.get("ds_id") or ""))
    label = html.escape(str(node.get("label") or node.get("title") or node.get("name") or ""))
    action = html.escape(str(node.get("action") or ""))
    children = "".join(render_component(child, depth + 1) for child in as_list(node.get("children")))
    margin = depth * 16
    meta = " ".join(item for item in [ds_id, action] if item)
    return f"""
    <div class='component' style='margin-left:{margin}px'>
      <strong>{kind}</strong> <code>{meta}</code>
      <div>{label}</div>
      {children}
    </div>
    """


def render_html(contract: dict[str, Any], mermaid: str, summary: dict[str, Any]) -> str:
    title = html.escape(str(contract.get("metadata", {}).get("feature") if isinstance(contract.get("metadata"), dict) else "UI Contract Preview"))
    screen_cards: list[str] = []
    for screen in summary["screens"]:
        states = ", ".join(map(str, as_list(screen.get("states")))) or "not declared"
        layout = screen.get("layout") or screen.get("view") or screen
        components = "".join(render_component(node) for node in walk_nodes(layout))
        screen_cards.append(f"""
        <section class='card'>
          <h2>{html.escape(label_for_screen(screen))}</h2>
          <p><strong>Route:</strong> {html.escape(str(screen.get('route', 'not declared')))}</p>
          <p><strong>States:</strong> {html.escape(states)}</p>
          <div class='component-list'>{components or '<em>No components discovered</em>'}</div>
        </section>
        """)

    transition_rows = "".join(
        f"<tr><td>{html.escape(t['from'])}</td><td>{html.escape(t['to'])}</td><td>{html.escape(t['event'])}</td></tr>"
        for t in summary["transitions"]
    )
    warnings = "".join(f"<li>{html.escape(w)}</li>" for w in summary["warnings"]) or "<li>No warnings</li>"

    return f"""<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1' />
  <title>{title}</title>
  <style>
    :root {{ color-scheme: light dark; font-family: Inter, system-ui, sans-serif; }}
    body {{ margin: 0; padding: 32px; background: #0f172a; color: #e5e7eb; }}
    main {{ max-width: 1180px; margin: 0 auto; }}
    h1, h2 {{ margin: 0 0 12px; }}
    .grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }}
    .card {{ border: 1px solid #334155; background: #111827; border-radius: 16px; padding: 18px; }}
    .component {{ border: 1px dashed #475569; border-radius: 10px; padding: 10px; margin-top: 10px; background: #172033; }}
    code {{ color: #67e8f9; font-size: 12px; }}
    table {{ width: 100%; border-collapse: collapse; }}
    td, th {{ border-bottom: 1px solid #334155; padding: 8px; text-align: left; }}
    pre {{ overflow: auto; background: #020617; padding: 16px; border-radius: 12px; }}
  </style>
</head>
<body>
  <main>
    <h1>{title}</h1>
    <p>Static preview generated from YAML View Blueprint and Mermaid Logic Machine.</p>
    <section class='card'><h2>Warnings</h2><ul>{warnings}</ul></section>
    <h2>Screens</h2>
    <div class='grid'>{''.join(screen_cards) or '<section class="card">No screens discovered</section>'}</div>
    <section class='card'>
      <h2>Mermaid Transitions</h2>
      <table><thead><tr><th>From</th><th>To</th><th>Event</th></tr></thead><tbody>{transition_rows}</tbody></table>
    </section>
    <section class='card'>
      <h2>Raw Mermaid</h2>
      <pre>{html.escape(mermaid)}</pre>
    </section>
  </main>
</body>
</html>
"""


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate static UI preview from ui-contract.md")
    parser.add_argument("--contract", required=True, type=Path, help="Path to ui-contract.md")
    parser.add_argument("--out", required=True, type=Path, help="Output preview directory")
    args = parser.parse_args()

    if not args.contract.exists():
        fail(f"contract file does not exist: {args.contract}")

    markdown = args.contract.read_text(encoding="utf-8")
    yaml_source, mermaid_source = extract_blocks(markdown)
    contract = load_yaml(yaml_source)
    transitions = parse_mermaid(mermaid_source)
    summary = collect_summary(contract, transitions)

    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "index.html").write_text(render_html(contract, mermaid_source, summary), encoding="utf-8")
    (args.out / "preview-manifest.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2, default=str) + "\n",
        encoding="utf-8",
    )
    print(json.dumps({"status": "OK", "out": str(args.out), "warnings": len(summary["warnings"])}, indent=2))


if __name__ == "__main__":
    main()
