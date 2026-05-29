# Stage 2 QA Test Plan: webui-and-pm-workspace Iteration 3

<!-- beads-id: br-agent-ralph-stage2-qa-webui-pm-workspace-iter-3-plan -->

## Scope
Targeted acceptance for PRD-04 section 8 / AC9 and showcase sidebar/hash navigation: PM Workspace surface hashes must navigate, scroll, and activate from both canonical and legacy showcase surfaces.

## Inputs
- Contract: `/Users/steve/duyhunghd6/gmind/docs/design/contracts/webui-and-pm-workspace`
- Source: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/webui-pm-workspace/page.tsx`
- Legacy route wrapper: `/Users/steve/duyhunghd6/gmind/apps/website/src/app/design-system/knowledge-graph/page.tsx`
- Live URLs: `http://localhost:9993/design-system/webui-pm-workspace`, `http://localhost:9993/design-system/knowledge-graph#surface-rtm-dashboard`
- Browser artifacts: `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/hash-navigation-rtm-dashboard.png`, `/Users/steve/duyhunghd6/gmind/tmp/test_puppeteer_dir/hash-navigation-surface-board.png`

## Suites
1. Storyboard Replay: map storyboard screens, states, and actions to source controllers and hash navigation handlers.
2. Contract Components: verify YAML block formatting, component labels, ds_id coverage, and no legacy ASCII-only assumptions.
3. State Matrix: verify Mermaid/YAML states and navigation transitions are represented as data states or deterministic controllers.
4. DS Token Audit: compare CSS custom properties with DS manifest tokens and flag hardcoded source colors/font families.
5. Accessibility Structure: check landmarks, headings, labels, aria-live regions, and focus-visible keyboard affordances.
6. Preview/Browser Consistency: verify preview tabs/warnings and supplied browser screenshots for hash navigation.
7. Live Render: curl target routes and confirm source can render the expected hash targets and data-ds-id elements.
