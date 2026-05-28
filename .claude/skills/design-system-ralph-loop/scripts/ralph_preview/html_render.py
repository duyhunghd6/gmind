"""Render the full SSOT static HTML preview page for Gate A review.

Integrates ALL visualizer modules for comprehensive low-fi UI/UX visualization:
- Contract screens, components, states
- Flow state machines with domain-grouped walk-throughs (viz_flow)
- Storyboard trajectories with visual step timelines (viz_storyboard)
- Component hierarchy trees with ds_id inventory (viz_component)
- Layout rules with responsive viewport mockups (viz_layout)
- Review diagrams Mermaid gallery (viz_review)
- PRD/DS conflicts structured cards (viz_conflicts)
- Cross-artifact coverage matrices (artifact_summary)

Mermaid diagrams are rendered client-side via CDN (mermaid@10 ESM).
Raw Mermaid source is available in collapsible details elements.

<!-- beads-id: br-chat-20260522-html-render-v2 -->
"""

from __future__ import annotations

import html
from typing import Any

from . import GENERATOR_BEADS_ID
from .contract_summary import as_list, walk_nodes, label_for_screen
from .viz_flow import render_flow_section
from .viz_storyboard import render_storyboard_section
from .viz_component import render_component_trees, render_ds_id_inventory
from .viz_layout import render_layout_section
from .viz_review import render_review_diagrams_section
from .viz_conflicts import render_conflicts_section


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def _contract_mermaid_card(mermaid_source: str) -> str:
    """Render the contract's Mermaid Logic Machine as a CDN-rendered diagram."""
    return f"""
    <section class='card mermaid-card'>
      <h2>Mermaid Logic Machine (ui-contract.md)</h2>
      <pre class="mermaid" id="contract-mermaid-0">{_esc(mermaid_source)}</pre>
      <details><summary>Raw Mermaid source</summary><pre class='raw-mermaid'>{_esc(mermaid_source)}</pre></details>
    </section>
    """


def _artifact_status_grid(artifacts: dict[str, Any]) -> str:
    """Render artifact existence/parse status grid."""
    rows: list[str] = []
    for name, info in artifacts.items():
        status = info.get("status", {})
        exists = status.get("exists", False)
        parse_ok = status.get("parse_ok")
        exists_icon = "OK" if exists else "MISS"
        exists_cls = "status-ok" if exists else "status-missing"
        parse_icon = ""
        if exists:
            parse_icon = "OK" if parse_ok else "ERR"
            parse_cls = "status-ok" if parse_ok else "status-error"
        else:
            parse_icon = "---"
            parse_cls = ""

        extra = ""
        if info.get("type") == "markdown":
            extra = f"<td>{len(info.get('mermaid_blocks', []))}</td><td>{info.get('line_count', 0)}</td>"
        elif info.get("type") == "json":
            extra = f"<td>---</td><td>{info.get('size_bytes', 0)} bytes</td>"
        elif info.get("type") == "markdown_split":
            extra = f"<td>{sum(len(f.get('mermaid_blocks', [])) for f in info.get('files', []))}</td><td>{len(info.get('files', []))} files</td>"
        else:
            extra = "<td>---</td><td>---</td>"

        beads = info.get("beads_ids", [])
        beads_html = ", ".join(_esc(b) for b in beads[:3])
        if len(beads) > 3:
            beads_html += f" +{len(beads) - 3} more"

        rows.append(
            f"<tr>"
            f"<td>{_esc(name)}</td>"
            f"<td class='{exists_cls}'>{exists_icon}</td>"
            f"<td class='{parse_cls}'>{parse_icon}</td>"
            f"<td>{extra}</td>"
            f"<td class='beads-cell'>{beads_html}</td>"
            f"</tr>"
        )

    return f"""
    <section class='card'>
      <h2>Artifact Status</h2>
      <table>
        <thead><tr><th>Artifact</th><th>Exists</th><th>Parsed</th><th>Mermaid Blocks</th><th>Size / Lines</th><th>Beads IDs</th></tr></thead>
        <tbody>{''.join(rows)}</tbody>
      </table>
    </section>
    """


def _warnings_panel(warnings: list[str]) -> str:
    items = "".join(f"<li>{_esc(w)}</li>" for w in warnings) or "<li>No warnings</li>"
    return f"""
    <section class='card'>
      <h2>Warnings</h2>
      <ul>{items}</ul>
    </section>
    """


def _screen_cards(screens: list[dict[str, Any]]) -> str:
    cards: list[str] = []
    for screen in screens:
        states = ", ".join(map(str, as_list(screen.get("states")))) if isinstance(screen.get("states"), (list, dict)) else "not declared"
        if isinstance(screen.get("states"), dict):
            states = ", ".join(screen["states"].keys())
        layout = screen.get("layout") or screen.get("view") or screen
        components = "".join(_render_component(node) for node in walk_nodes(layout))
        route = screen.get("route", "not declared")
        satisfies = screen.get("satisfies", [])
        sat_html = ""
        if satisfies:
            sat_html = f"<p><strong>Satisfies:</strong> {_esc(', '.join(satisfies))}</p>"
        data_sources = screen.get("data_sources", [])
        ds_html = ""
        if data_sources:
            ds_html = f"<p><strong>Data Sources:</strong> {_esc(', '.join(data_sources))}</p>"

        cards.append(f"""
        <section class='card'>
          <h2>{_esc(label_for_screen(screen))}</h2>
          <p><strong>Route:</strong> {_esc(route)}</p>
          <p><strong>States:</strong> {_esc(states)}</p>
          {sat_html}{ds_html}
          <div class='component-list'>{components or '<em>No components discovered</em>'}</div>
        </section>
        """)
    return f"<div class='grid'>{''.join(cards) or '<section class=\"card\">No screens discovered</section>'}</div>"


def _render_component(node: dict[str, Any], depth: int = 0) -> str:
    kind = _esc(node.get("type") or "Component")
    ds_id = _esc(node.get("ds_id") or "")
    label = _esc(node.get("label") or node.get("title") or node.get("name") or "")
    action = _esc(node.get("action") or "")
    children = "".join(_render_component(child, depth + 1) for child in as_list(node.get("children")))
    margin = depth * 16
    meta = " ".join(item for item in [ds_id, action] if item)
    return f"""
    <div class='component' style='margin-left:{margin}px'>
      <strong>{kind}</strong> <code>{meta}</code>
      <div>{label}</div>
      {children}
    </div>
    """


def _transition_table(transitions: list[dict[str, str]]) -> str:
    rows = "".join(
        f"<tr><td>{_esc(t['from'])}</td><td>{_esc(t['to'])}</td><td>{_esc(t['event'])}</td></tr>"
        for t in transitions
    )
    return f"""
    <section class='card'>
      <h2>Mermaid Transitions (Contract)</h2>
      <table><thead><tr><th>From</th><th>To</th><th>Event</th></tr></thead><tbody>{rows}</tbody></table>
    </section>
    """


def _coverage_matrix_section(coverage: dict[str, Any]) -> str:
    """Render cross-artifact coverage matrices."""
    sections: list[str] = []

    screen_matrix = coverage.get("screens", {})
    if screen_matrix:
        rows = ""
        for screen, cov in screen_matrix.items():
            in_sb = "OK" if cov.get("in_storyboards") else "MISS"
            sb_cls = "status-ok" if cov.get("in_storyboards") else "status-missing"
            rows += (
                f"<tr><td>{_esc(screen)}</td>"
                f"<td class='status-ok'>OK</td>"
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
            in_flow = "OK" if cov.get("in_flow") else "MISS"
            flow_cls = "status-ok" if cov.get("in_flow") else "status-missing"
            rows += (
                f"<tr><td>{_esc(event)}</td>"
                f"<td class='status-ok'>OK</td>"
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
            in_cmap = "OK" if cov.get("in_component_map") else "MISS"
            cmap_cls = "status-ok" if cov.get("in_component_map") else "status-missing"
            rows += (
                f"<tr><td>{_esc(ds_id)}</td>"
                f"<td class='status-ok'>OK</td>"
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


# ---------- Enhanced CSS for all visualizers ----------

_ENHANCED_CSS = """
    :root { color-scheme: light dark; font-family: Inter, system-ui, sans-serif; }
    body { margin: 0; padding: 32px; background: #0f172a; color: #e5e7eb; }
    main { max-width: 1280px; margin: 0 auto; }
    h1, h2, h3 { margin: 0 0 12px; color: #f1f5f9; }
    h4 { margin: 8px 0 4px; color: #cbd5e1; }
    .subtitle { color: #94a3b8; margin-bottom: 4px; }
    .meta { color: #64748b; font-size: 13px; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
    .card { border: 1px solid #334155; background: #111827; border-radius: 16px; padding: 18px; margin-bottom: 16px; }
    .component { border: 1px dashed #475569; border-radius: 10px; padding: 10px; margin-top: 10px; background: #172033; }
    code { color: #67e8f9; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    td, th { border-bottom: 1px solid #334155; padding: 6px 8px; text-align: left; }
    pre { overflow: auto; background: #020617; padding: 16px; border-radius: 12px; }
    /* Mermaid cards */
    .mermaid-card { overflow: hidden; }
    .mermaid-card pre.mermaid { background: transparent; font-size: 14px; }
    .mermaid-card details { margin-top: 8px; }
    .mermaid-card details summary { cursor: pointer; color: #94a3b8; font-size: 13px; }
    .raw-mermaid, .conflicts-text { background: #020617; padding: 16px; border-radius: 12px; font-size: 13px; overflow: auto; }
    /* Status indicators */
    .status-ok { color: #34d399; font-weight: 600; }
    .status-missing { color: #f87171; font-weight: 600; }
    .status-error { color: #fbbf24; font-weight: 600; }
    .beads-cell { font-size: 12px; color: #67e8f9; }
    /* Flow walk-through */
    .flow-domain-card h3 { color: #a5b4fc; }
    .flow-walk-table .state-from { color: #fbbf24; }
    .flow-walk-table .state-to { color: #34d399; }
    .flow-walk-table .arrow-cell { color: #64748b; text-align: center; width: 30px; }
    .flow-walk-table .action-event { color: #c084fc; font-weight: 600; }
    .flow-walk-table .system-event { color: #94a3b8; }
    /* Storyboard cards */
    .storyboard-card { border-left: 3px solid #6366f1; }
    .traj-meta { font-size: 12px; color: #94a3b8; }
    .step-timeline { display: flex; flex-direction: row; gap: 4px; overflow-x: auto; padding: 8px 0; }
    .step-badge { display: flex; flex-direction: row; align-items: flex-start; min-width: 140px; padding: 8px; border-radius: 8px; font-size: 11px; gap: 8px; }
    .step-badge .step-number { font-weight: 700; color: #6366f1; font-size: 16px; min-width: 20px; }
    .step-badge .step-detail { flex: 1; }
    .step-badge .step-screen { font-weight: 600; color: #a5b4fc; }
    .step-badge .step-state { color: #94a3b8; }
    .step-badge .step-event { color: #67e8f9; margin-top: 2px; }
    .step-badge .step-assert { color: #64748b; margin-top: 2px; font-style: italic; }
    .step-default { background: #1e293b; border-left: 3px solid #64748b; }
    .step-success { background: #064e3b; border-left: 3px solid #34d399; }
    .step-loading { background: #1e1b4b; border-left: 3px solid #818cf8; }
    .step-error { background: #450a0a; border-left: 3px solid #f87171; }
    .prd-group { margin-bottom: 16px; }
    .prd-group-header { color: #a5b4fc; border-bottom: 1px solid #334155; padding-bottom: 4px; }
    .recovery-text { color: #fbbf24; }
    /* Component hierarchy */
    .comp-tree-card { border-left: 3px solid #0ea5e9; }
    .comp-node { padding: 4px 8px; margin: 2px 0; border-radius: 6px; font-size: 12px; }
    .comp-ds { background: #172033; }
    .comp-anon { background: #1e293b; }
    .comp-ds-id { color: #67e8f9; margin-left: 4px; }
    .comp-ref { color: #a78bfa; margin-left: 4px; }
    .comp-label { color: #cbd5e1; margin-left: 4px; }
    .comp-action { color: #c084fc; }
    .comp-screen { color: #64748b; font-size: 11px; }
    .ds-id-table td:first-child { font-family: monospace; font-size: 12px; }
    /* Layout mockups */
    .layout-card { border-left: 3px solid #f59e0b; }
    .viewport-mockups { display: flex; flex-direction: row; gap: 12px; overflow-x: auto; margin: 12px 0; }
    .viewport-mockup { min-width: 160px; }
    .viewport-label { font-size: 11px; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
    .mock-frame { border: 1px solid #475569; border-radius: 6px; overflow: hidden; background: #0f172a; margin-bottom: 4px; }
    .mock-header { background: #1e293b; padding: 4px 8px; font-size: 10px; color: #94a3b8; border-bottom: 1px solid #334155; }
    .mock-sidebar { background: #1e1b4b; padding: 4px; font-size: 10px; color: #a5b4fc; min-height: 40px; }
    .mock-content { background: #172033; padding: 8px; font-size: 10px; color: #64748b; min-height: 50px; flex: 1; }
    .mock-stacked { min-height: 80px; }
    .mock-footer { background: #1e293b; padding: 4px 8px; font-size: 10px; color: #64748b; border-top: 1px solid #334155; }
    .mock-body-row { display: flex; flex-direction: row; }
    .layout-desc { font-size: 11px; color: #94a3b8; font-style: italic; }
    .state-table td:first-child { font-weight: 600; width: 120px; }
    .state-ok { color: #34d399; }
    .state-loading { color: #818cf8; }
    .state-error { color: #f87171; }
    .state-default { color: #94a3b8; }
    /* Conflicts */
    .conflict-card { border-left: 3px solid #f59e0b; }
    .conflict-resolved { border-left-color: #34d399; }
    .conflict-unresolved { border-left-color: #f87171; }
    .conflict-header { display: flex; justify-content: space-between; align-items: center; }
    .conflict-badge { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 700; }
    .conflict-badge.conflict-resolved { background: #064e3b; color: #34d399; }
    .conflict-badge.conflict-unresolved { background: #450a0a; color: #f87171; }
    /* Navigation tabs */
    .nav-tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 24px; position: sticky; top: 0; z-index: 10; background: #0f172a; padding: 8px 0; border-bottom: 1px solid #334155; }
    .nav-tab { padding: 6px 14px; border-radius: 8px; font-size: 13px; cursor: pointer; color: #94a3b8; text-decoration: none; background: #1e293b; transition: background 0.15s; }
    .nav-tab:hover { background: #334155; color: #e5e7eb; }
    /* Details/pre sizing */
    details pre { font-size: 12px; max-height: 400px; }
"""


def render_html(
    contract: dict[str, Any],
    mermaid_source: str,
    summary: dict[str, Any],
    artifacts: dict[str, Any],
    contract_path: str,
    coverage: dict[str, Any],
) -> str:
    """Render the full SSOT preview HTML page with all visualizations."""
    meta = contract.get("metadata", {})
    feature = meta.get("feature", "UI Contract Preview") if isinstance(meta, dict) else "UI Contract Preview"
    title = _esc(feature)

    from .artifacts import collect_artifact_warnings
    all_warnings = list(summary.get("warnings", [])) + collect_artifact_warnings(artifacts)

    # Build nav tabs
    nav_tabs = [
        ("#overview", "Overview"),
        ("#screens", "Screens"),
        ("#flow", "Flow"),
        ("#storyboards", "Storyboards"),
        ("#components", "Components"),
        ("#layout", "Layout"),
        ("#review-diagrams", "Diagrams"),
        ("#conflicts", "Conflicts"),
        ("#coverage", "Coverage"),
    ]
    nav_html = "".join(f'<a class="nav-tab" href="{href}">{_esc(label)}</a>' for href, label in nav_tabs)

    # Build body sections
    body_parts: list[str] = [
        f"<h1>{title}</h1>",
        f"<p class='subtitle'>Static SSOT preview - all artifacts visualized as low-fi UI/UX descriptions.</p>",
        f"<p class='meta'><strong>Contract:</strong> {_esc(contract_path)} | <strong>Beads ID:</strong> {_esc(GENERATOR_BEADS_ID)} | <strong>v2.0</strong></p>",
        f"<nav class='nav-tabs'>{nav_html}</nav>",

        # Overview section
        "<div id='overview'>",
        _artifact_status_grid(artifacts),
        _warnings_panel(all_warnings),
        "</div>",

        # Screens section
        "<div id='screens'>",
        "<h2>Contract Screens</h2>",
        _screen_cards(summary["screens"]),
        _transition_table(summary["transitions"]),
        _contract_mermaid_card(mermaid_source),
        "</div>",

        # Flow section
        "<div id='flow'>",
        render_flow_section(artifacts),
        "</div>",

        # Storyboards section
        "<div id='storyboards'>",
        render_storyboard_section(artifacts),
        "</div>",

        # Components section
        "<div id='components'>",
        render_component_trees(artifacts),
        render_ds_id_inventory(artifacts),
        "</div>",

        # Layout section
        "<div id='layout'>",
        render_layout_section(artifacts),
        "</div>",

        # Review diagrams section
        "<div id='review-diagrams'>",
        render_review_diagrams_section(artifacts),
        "</div>",

        # Conflicts section
        "<div id='conflicts'>",
        render_conflicts_section(artifacts),
        "</div>",

        # Coverage section
        "<div id='coverage'>",
        "<h2>Cross-Artifact Coverage</h2>",
        _coverage_matrix_section(coverage),
        "</div>",
    ]

    return f"""<!doctype html>
<html lang='en'>
<head>
  <meta charset='utf-8' />
  <meta name='viewport' content='width=device-width, initial-scale=1' />
  <title>{title} - Ralph Loop SSOT Preview</title>
  <style>{_ENHANCED_CSS}</style>
</head>
<body>
  <main>
    {''.join(body_parts)}
  </main>
  <script type="module">
    import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
    mermaid.initialize({{ startOnLoad: true, theme: "base", securityLevel: "strict",
      themeVariables: {{
        primaryColor: "#1e293b",
        primaryTextColor: "#e5e7eb",
        primaryBorderColor: "#475569",
        lineColor: "#64748b",
        secondaryColor: "#172033",
        tertiaryColor: "#0f172a"
      }}
    }});
  </script>
</body>
</html>
"""
