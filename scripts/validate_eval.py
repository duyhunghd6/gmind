import yaml
import json
import re
import os

dir_path = 'docs/design/contracts/webui-and-pm-workspace'
contract_path = f'{dir_path}/ui-contract.md'

results = {
    'containerValidity': {},
    'prdCoverage': {},
    'componentTraceability': {},
    'logicCoverage': {},
    'derivedArtifacts': {},
    'conflictsPreview': {}
}

with open(contract_path, 'r', encoding='utf-8') as f:
    content = f.read()

yaml_blocks = re.findall(r'^```yaml\n([\s\S]*?)^```', content, re.MULTILINE)
mermaid_blocks = re.findall(r'^```mermaid\n([\s\S]*?)^```', content, re.MULTILINE)

results['containerValidity'] = {
    'yamlBlockCount': len(yaml_blocks),
    'mermaidBlockCount': len(mermaid_blocks),
    'validYaml': False
}

yaml_data = None
if yaml_blocks:
    try:
        yaml_data = yaml.safe_load(yaml_blocks[0])
        results['containerValidity']['validYaml'] = True
    except Exception as e:
        results['containerValidity']['error'] = str(e)

ds_ids = []
duplicates = []
actions = set()

if yaml_data:
    screens = yaml_data.get('screens', [])
    routes = yaml_data.get('routes', [])
    metadata = yaml_data.get('metadata', {})
    satisfies_count = len(metadata.get('satisfies', []))
    
    def collect_from_element(el):
        if 'ds_id' in el:
            if el['ds_id'] in ds_ids:
                duplicates.append(el['ds_id'])
            ds_ids.append(el['ds_id'])
        if 'actions' in el:
            for a in el['actions']:
                if isinstance(a, dict):
                    actions.add(a.get('id', a.get('action_id', a.get('name'))))
                else:
                    actions.add(a)
        if 'children' in el:
            for child in el['children']:
                collect_from_element(child)
        if 'states' in el:
            states = el['states']
            if isinstance(states, dict):
                states = states.values()
            for st in states:
                if 'actions' in st:
                    for a in st['actions']:
                        if isinstance(a, dict):
                            actions.add(a.get('id', a.get('action_id', a.get('name'))))
                        else:
                            actions.add(a)
                if 'children' in st:
                    for child in st['children']:
                        collect_from_element(child)
                        
    for screen in screens:
        collect_from_element(screen)
        
    results['prdCoverage'] = {
        'satisfiesCount': satisfies_count,
        'screensCount': len(screens),
        'routesCount': len(routes)
    }
    
    results['componentTraceability'] = {
        'uniqueDsIdsCount': len(set(ds_ids)),
        'duplicates': duplicates
    }

mermaid_events = set()
if mermaid_blocks:
    lines = mermaid_blocks[0].split('\n')
    for line in lines:
        match = re.search(r'-->.*?:\s*(.*)', line)
        if match:
            mermaid_events.add(match.group(1).strip())
            
unmatched_actions = [a for a in actions if a not in mermaid_events]
unmatched_events = [e for e in mermaid_events if e not in actions]

results['logicCoverage'] = {
    'actionsCount': len(actions),
    'eventsCount': len(mermaid_events),
    'unmatchedActions': unmatched_actions,
    'unmatchedEvents': unmatched_events
}

def check_json(filename):
    p = os.path.join(dir_path, filename)
    if not os.path.exists(p):
        return {'exists': False}
    try:
        with open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return {'exists': True, 'valid': True, 'count': len(data)}
    except Exception:
        return {'exists': True, 'valid': False}

results['derivedArtifacts'] = {
    'storyboards': check_json('storyboards.json'),
    'componentMap': check_json('component-map.json'),
    'layoutRules': check_json('layout-rules.json'),
    'artifactIndex': check_json('artifact-index.json')
}

results['derivedArtifacts']['contextSlicesExists'] = os.path.exists(os.path.join(dir_path, 'context-slices'))
results['derivedArtifacts']['reviewDiagramsExists'] = os.path.exists(os.path.join(dir_path, 'review-diagrams.md'))

results['conflictsPreview'] = {
    'previewManifestExists': os.path.exists(os.path.join(dir_path, 'preview', 'preview-manifest.json')),
    'conflictsExists': os.path.exists(os.path.join(dir_path, 'prd-ds-conflicts.md'))
}

print(json.dumps(results, indent=2))
