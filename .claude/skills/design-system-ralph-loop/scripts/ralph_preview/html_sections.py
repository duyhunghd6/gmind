"""HTML section renderers for sibling SSOT artifacts: storyboards, layout, component map, conflicts, coverage."""

from __future__ import annotations

import html
from pathlib import Path
from typing import Any


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def storyboard_cards(artifacts: dict[str, Any]) -> str:
    sb_data = artifacts.get("storyboards.json", {}).get("data")
    if not sb_data or not isinstance(sb_data, dict):
        return "<section class='card'><h2>Storyboards</h2><p>No storyboard data available.</p></section>"

    trajectories = sb_data.get("trajectories", [])
    cards: list[str] = []
    for traj in trajectories:
        steps_html: list[str] = []
        for step in traj.get("steps", []):
            steps_html.append(
                f"<tr><td>{_esc(step.get('screen', ''))}</td>"
                f"<td>{_esc(step.get('state', ''))}</td>"
                f"<td>{_esc(step.get('event', ''))}</td>"
                f"<td>{_esc(step.get('assert', ''))}</td></tr>"
            )
        steps_table = "".join(steps_html)
        recovery = traj.get("expected_recovery") or "none"
        cards.append(f"""
        <section class='card'>
          <h3>{_esc(traj.get('trajectory_id', ''))}: {_esc(traj.get('title', ''))}</h3>
          <p><strong>PRD trace:</strong> {_esc(traj.get('prd_trace', ''))} | <strong>Start state:</strong> {_esc(traj.get('start_state', ''))} | <strong>Recovery:</strong> {_esc(recovery)}</p>
          <table>
            <thead><tr><th>Screen</th><th>State</th><th>Event</th><th>Assert</th></tr></thead>
            <tbody>{steps_table}</tbody>
          </table>
        </section>
        """)

    total = sb_data.get("trajectories_total", len(trajectories))
    return f"""
    <section class='card'>
      <h2>Storyboard Trajectories ({total} total)</h2>
      <div class='grid'>{''.join(cards)}</div>
    </section>
    """


def layout_rules_summary(artifacts: dict[str, Any]) -> str:
    lr_data = artifacts.get("layout-rules.json", {}).get("data")
    if not lr_data or not isinstance(lr_data, dict):
        return "<section class='card'><h2>Layout Rules</h2><p>No layout-rules data available.</p></section>"

    viewports = lr_data.get("viewports", [])
    vp_rows = ""
    for vp in viewports:
        vp_rows += f"<tr><td>{_esc(vp.get('name', ''))}</td><td>{_esc(vp.get('width', ''))}</td></tr>"

    global_shell = lr_data.get("global_shell", {})
    shell_html = ""
    if global_shell:
        shell_html = f"<p><strong>Shell ID:</strong> {_esc(global_shell.get('id', ''))} | <strong>Scope:</strong> {_esc(global_shell.get('route_scope', ''))}</p>"

    screens = lr_data.get("screens", [])
    screen_rows = ""
    if isinstance(screens, list):
        for s in screens:
            screen_rows += f"<tr><td>{_esc(s.get('id', ''))}</td><td>{_esc(s.get('route', ''))}</td></tr>"

    return f"""
    <section class='card'>
      <h2>Layout Rules</h2>
      {shell_html}
      <h3>Viewports</h3>
      <table><thead><tr><th>Name</th><th>Width</th></tr></thead><tbody>{vp_rows}</tbody></table>
      <h3>Screens ({len(screens) if isinstance(screens, list) else 0})</h3>
      <table><thead><tr><th>ID</th><th>Route</th></tr></thead><tbody>{screen_rows}</tbody></table>
    </section>
    """


def component_map_table(artifacts: dict[str, Any]) -> str:
    cm_data = artifacts.get("component-map.json", {}).get("data")
    if not cm_data or not isinstance(cm_data, dict):
        return "<section class='card'><h2>Component Map</h2><p>No component-map data available.</p></section>"

    ds_ids = cm_data.get("ds_ids", [])
    ds_rows = ""
    for ds_id in ds_ids[:50]:
        ds_rows += f"<tr><td>{_esc(ds_id)}</td></tr>"
    overflow = ""
    if len(ds_ids) > 50:
        overflow = f"<p><em>...and {len(ds_ids) - 50} more ds_ids</em></p>"

    return f"""
    <section class='card'>
      <h2>Component Map ({cm_data.get('components_total', 0)} components, {cm_data.get('ds_ids_total', 0)} ds_ids, {cm_data.get('actions_mapped_total', 0)} actions)</h2>
      <table><thead><tr><th>DS ID</th></tr></thead><tbody>{ds_rows}</tbody></table>
      {overflow}
    </section>
    """


def conflicts_section(artifacts: dict[str, Any]) -> str:
    cd_info = artifacts.get("prd-ds-conflicts.md", {})
    if not cd_info.get("status", {}).get("exists"):
        return "<section class='card'><h2>PRD/DS Conflicts</h2><p>No conflicts file found.</p></section>"

    from .markdown import safe_read
    text, _ = safe_read(Path(cd_info.get("path", "")))
    if not text:
        return "<section class='card'><h2>PRD/DS Conflicts</h2><p>Could not read conflicts file.</p></section>"

    return f"""
    <section class='card'>
      <h2>PRD/DS Conflicts</h2>
      <pre class='conflicts-text'>{_esc(text)}</pre>
    </section>
    """


def coverage_matrix_section(coverage: dict[str, Any]) -> str:
    """Render cross-artifact coverage matrices."""
    sections: list[str] = []

    screen_matrix = coverage.get("screens", {})
    if screen_matrix:
        rows = ""
        for screen, cov in screen_matrix.items():
            in_sb = "✓" if cov.get("in_storyboards") else "✗"
            sb_cls = "status-ok" if cov.get("in_storyboards") else "status-missing"
            rows += (
                f"<tr><td>{_esc(screen)}</td>"
                f"<td class='status-ok'>✓</td>"
                f"<td class='{sb_cls}'>{in_sb}</td></tr>"
            )
        sections.append(f"""
        <section class='card'>
          <h2>Screen Coverage Matrix</h2>
          <table><thead><tr><th>Screen</th><th>In Contract</th><th>In Storyboards</th></tr></thead>
          <tbody>{rows}</tbody></table>
        </section>
        """)

    event_matrix = coverage.get("events", {})
    if event_matrix:
        rows = ""
        for event, cov in event_matrix.items():
            in_flow = "✓" if cov.get("in_flow") else "✗"
            flow_cls = "status-ok" if cov.get("in_flow") else "status-missing"
            rows += (
                f"<tr><td>{_esc(event)}</td>"
                f"<td class='status-ok'>✓</td>"
                f"<td class='{flow_cls}'>{in_flow}</td></tr>"
            )
        sections.append(f"""
        <section class='card'>
          <h2>Event Coverage Matrix</h2>
          <table><thead><tr><th>Event</th><th>In Contract</th><th>In Flow.md</th></tr></thead>
          <tbody>{rows}</tbody></table>
        </section>
        """)

    ds_id_matrix = coverage.get("ds_ids", {})
    if ds_id_matrix:
        rows = ""
        for ds_id, cov in ds_id_matrix.items():
            in_cmap = "✓" if cov.get("in_component_map") else "✗"
            cmap_cls = "status-ok" if cov.get("in_component_map") else "status-missing"
            rows += (
                f"<tr><td>{_esc(ds_id)}</td>"
                f"<td class='status-ok'>✓</td>"
                f"<td class='{cmap_cls}'>{in_cmap}</td></tr>"
            )
        sections.append(f"""
        <section class='card'>
          <h2>DS ID Coverage Matrix</h2>
          <table><thead><tr><th>DS ID</th><th>In Contract</th><th>In Component Map</th></tr></thead>
          <tbody>{rows}</tbody></table>
        </section>
        """)

    return "\n".join(sections)
