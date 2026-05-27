# Ralph UI Contract Preview Reference

<!-- beads-id: br-skill-ralph-ui-contract-to-ui-ref -->

## Expected Contract Container

`ui-contract.md` is the single source artifact for Stage 1. It should contain review Markdown plus exactly one YAML fenced block and exactly one Mermaid fenced block.

```yaml
metadata:
  feature: example
  satisfies:
    - br-prd-example-s1
viewports:
  - name: desktop
    width: 1440
screens:
  - id: dashboard
    route: /dashboard
    states: [default, loading, empty, error]
    layout:
      type: AppShell
      ds_id: ds:layout:app-shell-001
      children:
        - type: Button
          ds_id: ds:comp:primary-cta-001
          label: Create task
          action: EVENT_CREATE_CLICK
```

```mermaid
stateDiagram-v2
  [*] --> Loading
  Loading --> Default : API_SUCCESS
  Loading --> Error : API_ERROR
  Default --> Loading : EVENT_REFRESH_CLICK
```

The preview script supports nested `children` fields and constrained Mermaid transitions in the form `A --> B : EVENT`.
