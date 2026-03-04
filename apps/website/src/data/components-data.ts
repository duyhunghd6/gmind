/**
 * Component section metadata for the Components Catalog page.
 * Each entry maps to a section with id anchor, sidebar sub-item, and DsIdBadge.
 */

export interface ComponentSection {
  id: string;       // hash anchor (e.g. "buttons")
  label: string;    // sidebar & heading label
  dsId: string;     // ds-registry ID for DsIdBadge
}

export const componentSections: ComponentSection[] = [
  { id: "buttons",     label: "Buttons",        dsId: "ds:comp:button-001" },
  { id: "badges",      label: "Badges & Status", dsId: "ds:comp:badge-001" },
  { id: "progress",    label: "Progress Bars",  dsId: "ds:comp:progressBar-001" },
  { id: "avatar",      label: "Avatar Stack",   dsId: "ds:comp:avatarStack-001" },
  { id: "modal",       label: "Modal",          dsId: "ds:comp:modal-001" },
  { id: "dropdown",    label: "Dropdown",       dsId: "ds:comp:dropdown-001" },
  { id: "accordion",   label: "Accordion",      dsId: "ds:comp:accordion-001" },
  { id: "tabs",        label: "Tab Panel",      dsId: "ds:comp:tabPanel-001" },
  { id: "table",       label: "Data Table",     dsId: "ds:comp:dataTable-001" },
  { id: "tooltip",     label: "Tooltip",        dsId: "ds:comp:tooltip-001" },
  { id: "codeblock",   label: "Code Block",     dsId: "ds:comp:codeBlock-001" },
  { id: "cards",       label: "Cards",          dsId: "ds:comp:card-001" },
  { id: "promptcard",  label: "Prompt Card",    dsId: "ds:comp:promptCard-001" },
  { id: "labels",      label: "Section Labels", dsId: "ds:comp:sectionLabel-001" },
  { id: "statusdot",   label: "Status Dots",    dsId: "ds:comp:statusDot-001" },
  { id: "skeleton",    label: "Skeleton",       dsId: "ds:comp:skeleton-001" },
  { id: "emptystate",  label: "Empty State",    dsId: "ds:comp:emptyState-001" },
  { id: "errorbanner", label: "Error Banner",   dsId: "ds:comp:errorBanner-001" },
];
