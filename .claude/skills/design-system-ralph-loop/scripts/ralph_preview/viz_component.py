"""Component map visualizer — renders component-map.json as low-fi component hierarchy trees.

Produces:
1. Per-screen component tree with ds_id, type, registry_ref, and action annotations
2. Component inventory summary table
3. Cross-reference: which ds_ids appear in which screens

<!-- beads-id: br-chat-20260522-viz-component -->
"""

from __future__ import annotations

import html
from typing import Any

from .artifact_summary import (
    component_actions,
    component_ds_id,
    component_entries,
    component_map_counts,
    component_map_ds_ids,
    component_screen,
    component_type,
)


def _esc(text: Any) -> str:
    return html.escape(str(text), quote=False)


def _component_tree_node(node: dict[str, Any], depth: int = 0) -> str:
    """Render a single node in the component hierarchy tree."""
    ds_id = component_ds_id(node)
    comp_type = component_type(node)
    registry_ref = node.get("registry_ref", "")
    label = node.get("label", "")
    action = ", ".join(component_actions(node))
    screen = component_screen(node)

    children = node.get("children", [])
    if isinstance(children, list):
        children_html = "".join(_component_tree_node(child, depth + 1) for child in children)
    else:
        children_html = ""

    margin = depth * 20
    connectors = "&#x251C;&#x2500; " if depth > 0 else ""
    indent = f"margin-left:{margin}px"

    # Badge classes
    type_cls = "comp-ds" if ds_id else "comp-anon"
    action_html = f" <span class='comp-action'>&#9654; {_esc(action)}</span>" if action else ""
    ref_html = f" <code class='comp-ref'>{_esc(registry_ref)}</code>" if registry_ref else ""
    label_html = f" <span class='comp-label'>{_esc(label)}</span>" if label else ""
    screen_html = f" <span class='comp-screen'>{_esc(screen)}</span>" if screen and depth == 0 else ""

    return f"""
    <div class='comp-node {type_cls}' style='{indent}'>
      {connectors}<strong>{_esc(comp_type)}</strong>{label_html}
      <code class='comp-ds-id'>{_esc(ds_id)}</code>{ref_html}{action_html}{screen_html}
      {children_html}
    </div>
    """


def render_component_trees(artifacts: dict[str, Any]) -> str:
    """Render per-screen component hierarchy trees from component-map.json."""
    cm_data = artifacts.get("component-map.json", {}).get("data")
    if not cm_data or not isinstance(cm_data, dict):
        return "<section class='card'><h2>Component Hierarchy</h2><p>No component-map data available.</p></section>"

    components = component_entries(cm_data)
    if not components:
        return "<section class='card'><h2>Component Hierarchy</h2><p>No components found.</p></section>"

    # Group by screen
    screen_groups: dict[str, list[dict[str, Any]]] = {}
    for comp in components:
        screen = component_screen(comp)
        screen_groups.setdefault(screen, []).append(comp)

    screen_trees: list[str] = []
    for screen, comps in sorted(screen_groups.items()):
        tree_html = "".join(_component_tree_node(comp) for comp in comps)
        screen_trees.append(f"""
        <section class='card comp-tree-card'>
          <h3>{_esc(screen)} ({len(comps)} components)</h3>
          <div class='comp-tree'>{tree_html}</div>
        </section>
        """)

    counts = component_map_counts(cm_data)
    total = counts["components_total"]
    ds_total = counts["ds_ids_total"]
    actions_total = counts["actions_mapped_total"]

    return f"""
    <h2>Component Hierarchy ({total} components, {ds_total} ds_ids, {actions_total} actions)</h2>
    <div class='grid'>{''.join(screen_trees)}</div>
    """


def render_ds_id_inventory(artifacts: dict[str, Any]) -> str:
    """Render the ds_id inventory as a searchable table."""
    cm_data = artifacts.get("component-map.json", {}).get("data")
    if not cm_data or not isinstance(cm_data, dict):
        return ""

    ds_ids = component_map_ds_ids(cm_data)
    if not ds_ids:
        return ""

    rows = ""
    for ds_id in ds_ids:
        # Parse namespace from ds_id: ds:webui.dashboard.kpi_row -> webui.dashboard
        parts = ds_id.split(".")
        namespace = ".".join(parts[1:-1]) if len(parts) > 2 else ds_id
        short_name = parts[-1] if parts else ds_id
        rows += f"<tr><td>{_esc(ds_id)}</td><td>{_esc(namespace)}</td><td>{_esc(short_name)}</td></tr>"

    return f"""
    <section class='card'>
      <h2>DS ID Inventory ({len(ds_ids)} total)</h2>
      <table class='ds-id-table'>
        <thead><tr><th>Full DS ID</th><th>Namespace</th><th>Component</th></tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </section>
    """
