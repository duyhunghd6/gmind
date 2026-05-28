const fs = require('fs');
const yaml = require('js-yaml');

const dir = 'docs/design/contracts/webui-and-pm-workspace';
const contractPath = `${dir}/ui-contract.md`;

let results = {
  containerValidity: {},
  prdCoverage: {},
  componentTraceability: {},
  logicCoverage: {},
  derivedArtifacts: {},
  conflictsPreview: {}
};

// 1. Container Validity
const content = fs.readFileSync(contractPath, 'utf8');
const yamlMatches = content.match(/^```yaml\n([\s\S]*?)^```/m);
const mermaidMatches = content.match(/^```mermaid\n([\s\S]*?)^```/m);

results.containerValidity = {
  yamlBlockCount: content.split(/^```yaml/m).length - 1,
  mermaidBlockCount: content.split(/^```mermaid/m).length - 1,
  validYaml: false
};

let yamlData = null;
if (yamlMatches && yamlMatches[1]) {
  try {
    yamlData = yaml.load(yamlMatches[1]);
    results.containerValidity.validYaml = true;
  } catch (e) {
    results.containerValidity.error = e.message;
  }
}

// 2. PRD Coverage & 3. Component Traceability & 4. Logic Coverage
let dsIds = [];
let duplicates = [];
let actions = new Set();
let prdCoverage = 0;

if (yamlData) {
  const screens = yamlData.screens || [];
  const routes = yamlData.routes || [];
  const satisfiesCount = (yamlData.metadata && yamlData.metadata.satisfies) ? yamlData.metadata.satisfies.length : 0;
  
  const collectFromElement = (el) => {
    if (el.ds_id) {
      if (dsIds.includes(el.ds_id)) duplicates.push(el.ds_id);
      dsIds.push(el.ds_id);
    }
    if (el.actions) {
      el.actions.forEach(a => actions.add(a.id || a.action_id || a.name || a));
    }
    if (el.children) {
      el.children.forEach(collectFromElement);
    }
    if (el.states) {
      Object.values(el.states).forEach(st => {
        if (st.actions) st.actions.forEach(a => actions.add(a.id || a.action_id || a.name || a));
        if (st.children) st.children.forEach(collectFromElement);
      });
    }
  };
  
  screens.forEach(collectFromElement);
  
  results.prdCoverage = {
    satisfiesCount,
    screensCount: screens.length,
    routesCount: routes.length
  };
  
  results.componentTraceability = {
    uniqueDsIdsCount: new Set(dsIds).size,
    duplicates: duplicates
  };
  
  // Mermaid transitions
  const mermaidLines = mermaidMatches ? mermaidMatches[1].split('\n') : [];
  let mermaidEvents = new Set();
  mermaidLines.forEach(line => {
    const match = line.match(/-->.*?:\s*(.*)/);
    if (match) mermaidEvents.add(match[1].trim());
  });
  
  let unmatchedActions = [];
  actions.forEach(a => {
    if (!mermaidEvents.has(a)) unmatchedActions.push(a);
  });
  
  let unmatchedEvents = [];
  mermaidEvents.forEach(e => {
    if (!actions.has(e)) unmatchedEvents.push(e);
  });
  
  results.logicCoverage = {
    actionsCount: actions.size,
    eventsCount: mermaidEvents.size,
    unmatchedActions,
    unmatchedEvents
  };
}

// 5. Derived Artifacts Consistency
const checkJson = (filename) => {
  const p = `${dir}/${filename}`;
  if (!fs.existsSync(p)) return { exists: false };
  try {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    return { exists: true, valid: true, count: Array.isArray(data) ? data.length : Object.keys(data).length };
  } catch (e) {
    return { exists: true, valid: false };
  }
};

results.derivedArtifacts = {
  storyboards: checkJson('storyboards.json'),
  componentMap: checkJson('component-map.json'),
  layoutRules: checkJson('layout-rules.json'),
  artifactIndex: checkJson('artifact-index.json')
};

results.derivedArtifacts.contextSlicesExists = fs.existsSync(`${dir}/context-slices`);
results.derivedArtifacts.reviewDiagramsExists = fs.existsSync(`${dir}/review-diagrams.md`);

// 6. Conflict & Preview Readiness
results.conflictsPreview = {
  previewManifestExists: fs.existsSync(`${dir}/preview/preview-manifest.json`),
  conflictsExists: fs.existsSync(`${dir}/prd-ds-conflicts.md`)
};

console.log(JSON.stringify(results, null, 2));
