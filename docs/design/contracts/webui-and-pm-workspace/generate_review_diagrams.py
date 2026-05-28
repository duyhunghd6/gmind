import yaml
import sys

def main():
    try:
        with open('docs/design/contracts/webui-and-pm-workspace/ui-contract.md', 'r') as f:
            content = f.read()
            
        yaml_content = content.split('```yaml')[1].split('```')[0]
        data = yaml.safe_load(yaml_content)
    except Exception as e:
        print(f"Error reading YAML: {e}")
        sys.exit(1)

    with open('docs/design/contracts/webui-and-pm-workspace/review-diagrams.md', 'w') as f:
        f.write("# Stage 1 Review Diagrams: WebUI PM Workspace\n\n")

        # 1. Screen Inventory and Routes
        f.write("## 1. Screen Inventory and Routes\n\n")
        f.write("```mermaid\nflowchart TD\n")
        f.write("    direction LR\n")
        f.write("    subgraph Routes [Screen Inventory & Routes]\n")
        f.write("        direction LR\n")
        for idx, screen in enumerate(data.get('screens', [])):
            clean_route = screen.get('route', '').replace('"', '').replace(':', '_')
            f.write(f'        S{idx}["{screen.get("title", "")}<br/>({screen.get("route", "")})"]\n')
        f.write("    end\n")
        f.write("```\n\n")

        # 2. Component Hierarchy
        f.write("## 2. Per-Screen Component Hierarchy\n\n")
        f.write("```mermaid\nflowchart TD\n")
        for screen in data.get('screens', []):
            screen_id = screen.get('id', '').replace(':', '_').replace('-', '_')
            f.write(f"    subgraph hierarchy_{screen_id} [Screen Component Hierarchy: {screen.get('title', '')}]\n")

            comp = screen.get('component_tree', {})
            root_id = comp.get('ds_id', 'root').replace(':', '_').replace('-', '_')
            f.write(f'        {root_id}["{comp.get("label", "")} ({comp.get("type", "")})<br/>{comp.get("ds_id", "")}"]\n')
            for child in comp.get('children', []):
                child_id = child.get('ds_id', 'child').replace(':', '_').replace('-', '_')
                f.write(f'        {child_id}["{child.get("label", "")} ({child.get("type", "")})<br/>{child.get("ds_id", "")}"]\n')
                f.write(f"        {root_id} --> {child_id}\n")
            f.write("    end\n")
        f.write("```\n\n")

        # 3. State Coverage Per Screen
        f.write("## 3. State Coverage Per Screen\n\n")
        f.write("```mermaid\nflowchart TD\n")
        for screen in data.get('screens', []):
            screen_id = screen.get('id', '').replace(':', '_').replace('-', '_')
            f.write(f"    subgraph states_{screen_id} [State Coverage: {screen.get('title', '')}]\n")
            f.write("        direction LR\n")
            f.write(f'        state_root_{screen_id}(("States"))\n')
            for st in screen.get('states', []):
                st_id = st.replace('-', '_')
                f.write(f'        state_{screen_id}_{st_id}(["{st}"])\n')
                f.write(f"        state_root_{screen_id} --> state_{screen_id}_{st_id}\n")
            f.write("    end\n")
        f.write("```\n\n")

        # 4. Action-to-Event Links
        f.write("## 4. Action-to-Event Links\n\n")
        f.write("```mermaid\nflowchart LR\n")
        for act in data.get('machine_event_action_sources', []):
            # Detailed actions in YAML are actually in machine_event_action_sources
            if not isinstance(act, dict):
                continue
            act_id = act.get('id', '').replace(':', '_').replace('-', '_')
            f.write(f"    subgraph action_{act_id} [Action-to-Event: {act.get('id', '')}]\n")
            f.write("        direction LR\n")
            source = act.get("source", "").replace('"', '')
            target = act.get("target", "").replace('"', '')
            trigger = act.get("trigger", "").replace('"', '')
            api = act.get("api", "").replace('"', '')
            event = act.get("event", "").replace('"', '')
            f.write(f'        src_{act_id}["Trigger: {trigger}<br/>Source: {source}"]\n')
            f.write(f'        tgt_{act_id}["Target: {target}<br/>API: {api}"]\n')
            f.write(f'        src_{act_id} -->|"{event}"| tgt_{act_id}\n')
            f.write("    end\n")
        f.write("```\n\n")

        # 5. Responsive Layout Intent
        f.write("## 5. Responsive Layout Intent by Viewport\n\n")
        f.write("```mermaid\nflowchart TD\n")
        for screen in data.get('screens', []):
            screen_id = screen.get('id', '').replace(':', '_').replace('-', '_')
            f.write(f"    subgraph responsive_{screen_id} [Responsive Layout: {screen.get('title', '')}]\n")

            f.write(f'        root_resp_{screen_id}["Viewport Intents"]\n')
            for rc in screen.get('responsive_constraints', []):
                vp = rc.get('viewport', '')
                bh = rc.get('behavior', '').replace('"', "'")
                f.write(f'        vp_{screen_id}_{vp}["{vp.capitalize()}: {bh}"]\n')
                f.write(f"        root_resp_{screen_id} --> vp_{screen_id}_{vp}\n")
            f.write("    end\n")
        f.write("```\n\n")
        
        # 6. Mermaid Logic Machine states and transitions
        f.write("## 6. Mermaid Logic Machine states and transitions\n\n")
        try:
            with open('docs/design/contracts/webui-and-pm-workspace/ui-contract.md', 'r') as f:
                content = f.read()
                if "```mermaid" in content:
                    mermaid_block = content.split('```mermaid')[1].split('```')[0]
                    f.write("```mermaid\n")
                    f.write(mermaid_block.strip() + "\n")
                    f.write("```\n\n")
        except Exception:
            pass

if __name__ == '__main__':
    main()
