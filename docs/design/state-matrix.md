# Gmind Design System — State Matrix

## Component States

| Component        | Default                             | Hover                                                        | Active/Selected                           | Copied                                      | Disabled     |
| ---------------- | ----------------------------------- | ------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------- | ------------ |
| **PillarCard**   | `--surface` bg, `--border`          | `--border-highlight`, translateY(-2px), `--shadow-card`      | —                                         | —                                           | opacity: 0.5 |
| **NavLink**      | `--text-dim`                        | `--text`, underline grow 0→100%                              | `--text`, underline 100%, `--accent-cyan` | —                                           | —            |
| **CodeBlock**    | Static mono text, `--border`        | —                                                            | —                                         | Copy btn → `--accent-teal`, "✓ Copied" text | —            |
| **CopyButton**   | "Copy" text, `--text-dim`           | `--accent-cyan`, `--shadow-glow-cyan`                        | —                                         | "✓ Copied", `--accent-teal` (2s timeout)    | —            |
| **PromptCard**   | `--surface`, top gradient hidden    | `--border-highlight`, translateY(-3px), top gradient visible | —                                         | —                                           | —            |
| **ArchLayer**    | `--surface`, `--border`             | `--border-highlight`, `--shadow-glow-cyan`                   | —                                         | —                                           | —            |
| **SectionLabel** | Accent color + dot indicator        | —                                                            | —                                         | —                                           | —            |
| **FooterLink**   | `--text-dim`                        | `--accent-cyan`                                              | —                                         | —                                           | —            |
| **MenuToggle**   | "☰" icon, hidden on desktop        | —                                                            | "✕" icon, mobile menu open                | —                                           | —            |
| **StatusBadge**  | Colored by status (teal/cyan/amber) | —                                                            | —                                         | —                                           | —            |
| **TypeBadge**    | Outlined, colored by type           | —                                                            | —                                         | —                                           | —            |

## Interaction States by Page

| Page             | Load                           | Scroll                        | Click                              |
| ---------------- | ------------------------------ | ----------------------------- | ---------------------------------- |
| **Home**         | fade-up cascade (100ms delay)  | Sections animate on scroll-in | PillarCard hover, Nav links        |
| **Prompts**      | fade-up cascade                | —                             | Copy button → clipboard + feedback |
| **Architecture** | Layer cascade (80ms per layer) | —                             | Layer hover glow                   |
| **Research**     | Stats counter + fade-up        | —                             | Card hover, expand conclusions     |

## CSS Animation Tokens

| Token               | Duration | Easing       | Usage                         |
| ------------------- | -------- | ------------ | ----------------------------- |
| `--duration-fast`   | 150ms    | `--ease-out` | Hover states, button clicks   |
| `--duration-normal` | 250ms    | `--ease-out` | Card transitions, border glow |
| `--duration-slow`   | 500ms    | `--ease-out` | Page-level animations         |
| `fadeUp`            | 600ms    | ease-out     | Section entrance              |
| `pulse-glow`        | 3000ms   | infinite     | Navbar brand dot              |
