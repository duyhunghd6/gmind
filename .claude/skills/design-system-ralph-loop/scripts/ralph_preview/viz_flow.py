"""Flow diagram visualizer — renders flow.md state machines as low-fi UI walk-throughs.

Parses the Mermaid stateDiagram-v2 from flow.md and produces:
1. A rendered Mermaid diagram (via CDN)
2. A grouped step-by-step state walk-through grouped by screen/domain
3. State transition cards showing from/to/event as visual arrows

<!-- beads-id: br-chat-20260522-viz-flow -->
"""

from __future__ import annotations

import html
import re
from typing import Any

TRANSITION_RE = re.compile(
    r"^\s*(?P<from>\[\*\]|[A-Za-z0-9_.:-]+)\s*--?>\s*(?P<to>\[\*\]|[A-Za-z0-9_.:-]+)"
    r"(?:\s*:\s*(?P<event>[^\n]+))?\s*$"
)

STATEMENT_RE = re.compile(
    r'^\s*state\s+"(?P<label>[^"]+)"\s+as\s+(?P<id>[A-Za-z0-9_]+)'
)


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def parse_transitions(mermaid_source: str) -> list[dict[str, str]]:
    """Extract state transitions from a Mermaid stateDiagram-v2 block."""
    transitions: list[dict[str, str]] = []
    for raw in mermaid_source.splitlines():
        line = raw.strip()
        if not line or line.startswith("%%") or line.startswith("stateDiagram") or line.startswith("direction"):
            continue
        match = TRANSITION_RE.match(line)
        if not match:
            continue
        event = (match.group("event") or "").strip()
        transitions.append({"from": match.group("from"), "to": match.group("to"), "event": event})
    return transitions


def parse_state_aliases(mermaid_source: str) -> dict[str, str]:
    """Extract state alias mappings: state 'Label' as ID -> {ID: Label}."""
    aliases: dict[str, str] = {}
    for match in STATEMENT_RE.finditer(mermaid_source):
        aliases[match.group("id")] = match.group("label")
    return aliases


def group_transitions_by_domain(transitions: list[dict[str, str]]) -> dict[str, list[dict[str, str]]]:
    """Group transitions by their screen/domain prefix (before first underscore segment)."""
    groups: dict[str, list[dict[str, str]]] = {}
    for t in transitions:
        from_state = t["from"]
        # Derive domain from the target state (not [*])
        domain_key = from_state if from_state != "[*]" else t["to"]
        # Extract prefix up to second capitalized word (e.g. DashboardLoading -> Dashboard)
        prefix = re.split(r"(?=[A-Z])", domain_key, maxsplit=2)
        domain = prefix[1] if len(prefix) > 1 else domain_key
        groups.setdefault(domain, []).append(t)
    return groups


def render_flow_mermaid(mermaid_blocks: list[dict[str, str]]) -> str:
    """Render all Mermaid diagrams from flow.md as CDN-rendered blocks."""
    if not mermaid_blocks:
        return "<section class='card'><h2>Flow Diagrams</h2><p>No flow.md Mermaid blocks found.</p></section>"

    sections: list[str] = ["<h2>Flow Diagrams (flow.md)</h2>"]
    for i, mb in enumerate(mermaid_blocks):
        heading = mb.get("heading", "Flow State Machine")
        source = mb.get("source", "")
        sections.append(f"""
        <section class='card mermaid-card'>
          <h3>{_esc(heading)}</h3>
          <pre class="mermaid" id="flow-mermaid-{i}">{_esc(source)}</pre>
          <details><summary>Raw Mermaid source</summary><pre class='raw-mermaid'>{_esc(source)}</pre></details>
        </section>
        """)
    return "\n".join(sections)


def render_flow_walkthrough(mermaid_blocks: list[dict[str, str]]) -> str:
    """Render a visual step-by-step walk-through of all flow transitions grouped by domain."""
    all_transitions: list[dict[str, str]] = []
    for mb in mermaid_blocks:
        all_transitions.extend(parse_transitions(mb.get("source", "")))

    if not all_transitions:
        return ""

    aliases: dict[str, str] = {}
    for mb in mermaid_blocks:
        aliases.update(parse_state_aliases(mb.get("source", "")))

    groups = group_transitions_by_domain(all_transitions)

    domain_cards: list[str] = []
    for domain, transitions in sorted(groups.items()):
        step_rows: list[str] = []
        for t in transitions:
            from_label = aliases.get(t["from"], t["from"])
            to_label = aliases.get(t["to"], t["to"])
            event = t["event"]
            is_action = event.startswith("EVENT_action_")
            event_cls = "action-event" if is_action else "system-event"
            step_rows.append(f"""
            <tr>
              <td class='state-from'>{_esc(from_label)}</td>
              <td class='arrow-cell'>&#8594;</td>
              <td class='state-to'>{_esc(to_label)}</td>
              <td class='{event_cls}'>{_esc(event)}</td>
            </tr>
            """)
        step_rows_html = "".join(step_rows)
        domain_cards.append(f"""
        <section class='card flow-domain-card'>
          <h3>{_esc(domain)} ({len(transitions)} transitions)</h3>
          <table class='flow-walk-table'>
            <thead><tr><th>From</th><th></th><th>To</th><th>Event</th></tr></thead>
            <tbody>{step_rows_html}</tbody>
          </table>
        </section>
        """)

    return f"""
    <h2>Flow Walk-Through</h2>
    <p class='subtitle'>All state transitions grouped by screen/domain. <span class='action-event'>Action events</span> vs <span class='system-event'>system events</span>.</p>
    <div class='grid'>{''.join(domain_cards)}</div>
    """


def render_flow_section(artifacts: dict[str, Any]) -> str:
    """Full flow visualization: Mermaid diagram + walk-through."""
    flow_info = artifacts.get("flow.md", {})
    mermaid_blocks = flow_info.get("mermaid_blocks", [])

    parts: list[str] = []
    mermaid_html = render_flow_mermaid(mermaid_blocks)
    if mermaid_html:
        parts.append(mermaid_html)

    walkthrough_html = render_flow_walkthrough(mermaid_blocks)
    if walkthrough_html:
        parts.append(walkthrough_html)

    return "\n".join(parts) if parts else "<section class='card'><h2>Flow Diagrams</h2><p>No flow.md found.</p></section>"
