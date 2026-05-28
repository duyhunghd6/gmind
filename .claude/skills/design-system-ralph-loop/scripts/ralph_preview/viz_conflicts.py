"""PRD/DS conflicts visualizer — renders prd-ds-conflicts.md as structured conflict cards.

Produces:
1. Resolved conflicts with resolution status badges
2. Unresolved conflicts with blocker indicators
3. PRD source and contract source traceability

<!-- beads-id: br-chat-20260522-viz-conflicts -->
"""

from __future__ import annotations

import html
import re
from typing import Any


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def parse_conflicts_markdown(text: str) -> dict[str, list[dict[str, str]]]:
    """Parse prd-ds-conflicts.md into structured conflict entries."""
    sections: dict[str, list[dict[str, str]]] = {"resolved": [], "unresolved": []}
    current_section = ""
    current_conflict: dict[str, str] = {}

    for line in text.splitlines():
        line_stripped = line.strip()

        # Detect section headers
        if re.match(r"^##\s+.*Resolved", line_stripped, re.IGNORECASE):
            if current_conflict:
                sections.setdefault(current_section, []).append(current_conflict)
                current_conflict = {}
            current_section = "resolved"
            continue
        elif re.match(r"^##\s+.*Unresolved", line_stripped, re.IGNORECASE):
            if current_conflict:
                sections.setdefault(current_section, []).append(current_conflict)
                current_conflict = {}
            current_section = "unresolved"
            continue

        # Parse numbered conflict entries
        conflict_match = re.match(r"^\d+\.\s+\*\*(.+?)\*\*", line_stripped)
        if conflict_match:
            if current_conflict and current_section:
                sections.setdefault(current_section, []).append(current_conflict)
            current_conflict = {"title": conflict_match.group(1)}
            continue

        # Parse sub-fields
        if current_conflict:
            for field in ("prd_source", "contract_source", "resolution_owner", "accepted_resolution", "status"):
                field_match = re.match(rf"-\s+\*{field}\*:\s*(.+)", line_stripped, re.IGNORECASE) or \
                              re.match(rf"-\s+\*\*{field.replace('_', ' ').title()}\*\*:\s*(.+)", line_stripped, re.IGNORECASE)
                if field_match:
                    current_conflict[field] = field_match.group(1).strip()
                    break

            # Catch resolution/accepted lines with slightly different format
            if "resolution" not in current_conflict:
                res_match = re.match(r"-\s+(?:Accepted\s+)?[Rr]esolution.*?:\s*(.+)", line_stripped)
                if res_match:
                    current_conflict["accepted_resolution"] = res_match.group(1).strip()

            if "status" not in current_conflict:
                status_match = re.match(r"-\s+[Ss]tatus.*?:\s*(.+)", line_stripped)
                if status_match:
                    current_conflict["status"] = status_match.group(1).strip()

    # Flush last conflict
    if current_conflict and current_section:
        sections.setdefault(current_section, []).append(current_conflict)

    return sections


def _conflict_card(conflict: dict[str, str], is_resolved: bool) -> str:
    """Render a single conflict as a structured card."""
    title = conflict.get("title", "Untitled conflict")
    status = conflict.get("status", "unknown")
    badge_cls = "conflict-resolved" if is_resolved else "conflict-unresolved"
    badge_text = "RESOLVED" if is_resolved else "UNRESOLVED"

    fields_html = ""
    for key, label in [
        ("prd_source", "PRD Source"),
        ("contract_source", "Contract Source"),
        ("resolution_owner", "Resolution Owner"),
        ("accepted_resolution", "Accepted Resolution"),
        ("status", "Status"),
    ]:
        value = conflict.get(key, "")
        if value:
            fields_html += f"<p><strong>{_esc(label)}:</strong> {_esc(value)}</p>"

    return f"""
    <section class='card conflict-card {badge_cls}'>
      <div class='conflict-header'>
        <h3>{_esc(title)}</h3>
        <span class='conflict-badge {badge_cls}'>{badge_text}</span>
      </div>
      {fields_html}
    </section>
    """



def render_conflicts_section(artifacts: dict[str, Any]) -> str:
    """Render full PRD/DS conflicts visualization."""
    cd_info = artifacts.get("prd-ds-conflicts.md", {})
    if not cd_info.get("status", {}).get("exists"):
        return "<section class='card'><h2>PRD/DS Conflicts</h2><p>No conflicts file found.</p></section>"

    from .markdown import safe_read
    from pathlib import Path
    text, _ = safe_read(Path(cd_info.get("path", "")))
    if not text:
        return "<section class='card'><h2>PRD/DS Conflicts</h2><p>Could not read conflicts file.</p></section>"

    parsed = parse_conflicts_markdown(text)
    resolved = parsed.get("resolved", [])
    unresolved = parsed.get("unresolved", [])

    cards: list[str] = []

    if resolved:
        cards.append("<h3>Resolved / Assigned</h3>")
        cards.extend(_conflict_card(c, is_resolved=True) for c in resolved)

    if unresolved:
        cards.append("<h3>Unresolved</h3>")
        cards.extend(_conflict_card(c, is_resolved=False) for c in unresolved)

    if not resolved and not unresolved:
        # Fallback: render raw text
        cards.append(f"<pre class='conflicts-text'>{_esc(text)}</pre>")

    return f"""
    <h2>PRD/DS Conflicts</h2>
    <p class='subtitle'>{len(resolved)} resolved, {len(unresolved)} unresolved</p>
    {''.join(cards)}
    """
