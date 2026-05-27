"""Layout rules visualizer — renders layout-rules.json as low-fi responsive mockup cards.

Produces:
1. Viewport mockups showing responsive layout descriptions per screen
2. Global shell layout descriptions per viewport
3. Per-screen state descriptions with data source bindings

<!-- beads-id: br-chat-20260522-viz-layout -->
"""

from __future__ import annotations

import html
from typing import Any


def _esc(text: Any) -> str:
    return html.escape(str(text))


VIEWPORT_WIDTHS = {"desktop": 1440, "tablet": 1024, "mobile": 390}
VIEWPORT_ICONS = {"desktop": "&#x1F5A5;", "tablet": "&#x1F4F1;", "mobile": "&#x1F4F1;"}


def _viewport_mockup(screen: dict[str, Any], vp_name: str) -> str:
    """Render a low-fi viewport mockup for one screen at one breakpoint."""
    width = VIEWPORT_WIDTHS.get(vp_name, 800)
    icon = VIEWPORT_ICONS.get(vp_name, "")

    layout = screen.get("layout", {})
    if not isinstance(layout, dict):
        return ""

    responsive = layout.get("responsive", {})
    if not isinstance(responsive, dict):
        return ""

    layout_desc = responsive.get(vp_name, "No layout rule defined")

    # Build a simple visual mock from the description
    # Parse key layout hints from text description
    has_sidebar = "sidebar" in layout_desc.lower()
    has_header = "header" in layout_desc.lower()
    has_footer = "footer" in layout_desc.lower()
    is_stacked = "stack" in layout_desc.lower() or "one-column" in layout_desc.lower()

    # Generate visual mock based on layout hints
    if is_stacked or vp_name == "mobile":
        mock_html = f"""
        <div class='mock-frame' style='width:{min(width // 3, 320)}px'>
          <div class='mock-header'>Header</div>
          <div class='mock-content mock-stacked'>Content (stacked)</div>
          <div class='mock-footer'>Footer</div>
        </div>
        """
    elif has_sidebar and has_header:
        sidebar_w = 240 if vp_name == "desktop" else 60
        mock_html = f"""
        <div class='mock-frame' style='width:{min(width // 3, 440)}px'>
          <div class='mock-header'>Header + Search</div>
          <div class='mock-body-row'>
            <div class='mock-sidebar' style='width:{sidebar_w // 3}px'>Nav</div>
            <div class='mock-content'>Main Content</div>
          </div>
          <div class='mock-footer'>Footer</div>
        </div>
        """
    elif has_header:
        mock_html = f"""
        <div class='mock-frame' style='width:{min(width // 3, 440)}px'>
          <div class='mock-header'>Header</div>
          <div class='mock-content'>Content Area</div>
        </div>
        """
    else:
        mock_html = f"""
        <div class='mock-frame' style='width:{min(width // 3, 440)}px'>
          <div class='mock-content'>Content</div>
        </div>
        """

    return f"""
    <div class='viewport-mockup vp-{vp_name}'>
      <div class='viewport-label'>{icon} {_esc(vp_name)} ({width}px)</div>
      {mock_html}
      <p class='layout-desc'>{_esc(layout_desc)}</p>
    </div>
    """


def _screen_layout_card(screen: dict[str, Any]) -> str:
    """Render one screen's layout rules with viewport mockups."""
    screen_id = screen.get("id", "")
    screen_name = screen.get("name", "")
    route = screen.get("route", "")
    satisfies = screen.get("satisfies", [])
    data_sources = screen.get("data_sources", [])
    states = screen.get("states", {})

    # Viewport mockups
    mockups = "".join(_viewport_mockup(screen, vp) for vp in ("desktop", "tablet", "mobile"))

    # State descriptions
    state_rows = ""
    if isinstance(states, dict):
        for state_name, state_desc in states.items():
            state_cls = "state-ok" if state_name == "default" else (
                "state-error" if state_name in ("error", "offline") else (
                "state-loading" if state_name == "loading" else "state-default"
            ))
            state_rows += f"<tr><td class='{state_cls}'>{_esc(state_name)}</td><td>{_esc(state_desc)}</td></tr>"

    satisfies_html = ""
    if satisfies:
        satisfies_html = f"<p><strong>Satisfies:</strong> {_esc(', '.join(satisfies))}</p>"

    data_html = ""
    if data_sources:
        data_html = f"<p><strong>Data Sources:</strong> {_esc(', '.join(data_sources))}</p>"

    states_section = ""
    if state_rows:
        states_section = f"""
        <h4>States</h4>
        <table class='state-table'>
          <thead><tr><th>State</th><th>Description</th></tr></thead>
          <tbody>{state_rows}</tbody>
        </table>
        """

    return f"""
    <section class='card layout-card'>
      <h3>{_esc(screen_name or screen_id)}</h3>
      <p><strong>Route:</strong> {_esc(route)}</p>
      {satisfies_html}{data_html}
      <div class='viewport-mockups'>{mockups}</div>
      {states_section}
    </section>
    """


def render_layout_section(artifacts: dict[str, Any]) -> str:
    """Render full layout rules visualization."""
    lr_data = artifacts.get("layout-rules.json", {}).get("data")
    if not lr_data or not isinstance(lr_data, dict):
        return "<section class='card'><h2>Layout Rules</h2><p>No layout-rules data available.</p></section>"

    # Global shell
    global_shell = lr_data.get("global_shell", {})
    shell_html = ""
    if global_shell:
        shell_layout = global_shell.get("layout", {})
        shell_rows = ""
        if isinstance(shell_layout, dict):
            for vp, desc in shell_layout.items():
                icon = VIEWPORT_ICONS.get(vp, "")
                shell_rows += f"<tr><td>{icon} {_esc(vp)}</td><td>{_esc(desc)}</td></tr>"
        shell_html = f"""
        <section class='card'>
          <h2>Global Shell</h2>
          <p><strong>ID:</strong> {_esc(global_shell.get('id', ''))} | <strong>Scope:</strong> {_esc(global_shell.get('route_scope', ''))}</p>
          <table><thead><tr><th>Viewport</th><th>Layout</th></tr></thead><tbody>{shell_rows}</tbody></table>
        </section>
        """

    # Viewports table
    viewports = lr_data.get("viewports", [])
    vp_rows = ""
    for vp in viewports:
        constraints = vp.get("constraints", {})
        constraint_rows = "".join(
            f"<li>{_esc(k)}: {_esc(v)}</li>" for k, v in constraints.items()
        )
        vp_rows += f"""
        <tr>
          <td>{_esc(vp.get('name', ''))}</td>
          <td>{_esc(vp.get('width', ''))}</td>
          <td><ul>{constraint_rows}</ul></td>
        </tr>
        """

    viewports_html = f"""
    <section class='card'>
      <h2>Viewports</h2>
      <table>
        <thead><tr><th>Name</th><th>Width</th><th>Constraints</th></tr></thead>
        <tbody>{vp_rows}</tbody>
      </table>
    </section>
    """

    # Per-screen layout cards
    screens = lr_data.get("screens", [])
    screen_cards = ""
    if isinstance(screens, list):
        screen_cards = "".join(_screen_layout_card(s) for s in screens)

    return f"""
    <h2>Layout Rules</h2>
    {shell_html}
    {viewports_html}
    <h3>Screen Layouts ({len(screens) if isinstance(screens, list) else 0} screens)</h3>
    <div class='grid'>{screen_cards}</div>
    """
