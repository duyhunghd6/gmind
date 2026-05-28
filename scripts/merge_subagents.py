import os
import re
import yaml

agents_dir = '.agents/agents'
gemini_dir = '.gemini/agents'

for filename in os.listdir(agents_dir):
    if not filename.endswith('.md'):
        continue
    
    agents_path = os.path.join(agents_dir, filename)
    gemini_path = os.path.join(gemini_dir, filename)
    
    if not os.path.exists(gemini_path):
        print(f"Skipping {filename} - not in {gemini_dir}")
        continue
        
    # Read agents file
    with open(agents_path, 'r', encoding='utf-8') as f:
        agents_content = f.read()
    
    # Read gemini file
    with open(gemini_path, 'r', encoding='utf-8') as f:
        gemini_content = f.read()
        
    agents_match = re.match(r'^---\n(.*?)\n---\n(.*)', agents_content, re.DOTALL)
    gemini_match = re.match(r'^---\n(.*?)\n---\n(.*)', gemini_content, re.DOTALL)
    
    if not agents_match or not gemini_match:
        print(f"Error parsing frontmatter for {filename}")
        continue
        
    agents_frontmatter = yaml.safe_load(agents_match.group(1))
    gemini_frontmatter = yaml.safe_load(gemini_match.group(1))
    body = agents_match.group(2) # Keep the body from .agents/agents
    
    # Merge frontmatter
    merged_frontmatter = {}
    
    # Standard keys
    merged_frontmatter['name'] = agents_frontmatter.get('name') or gemini_frontmatter.get('name')
    merged_frontmatter['description'] = (agents_frontmatter.get('description') or gemini_frontmatter.get('description')).strip()
    
    # Gemini specific
    merged_frontmatter['kind'] = 'local'
    merged_frontmatter['model'] = agents_frontmatter.get('model') or gemini_frontmatter.get('model') or 'inherit'
    
    # Both turns
    if 'max_turns' in gemini_frontmatter:
        merged_frontmatter['max_turns'] = gemini_frontmatter['max_turns']
    elif 'max_turns' in agents_frontmatter:
        merged_frontmatter['max_turns'] = agents_frontmatter['max_turns']
        
    if 'maxTurns' in agents_frontmatter:
        merged_frontmatter['maxTurns'] = agents_frontmatter['maxTurns']
    elif 'maxTurns' in gemini_frontmatter:
        merged_frontmatter['maxTurns'] = gemini_frontmatter['maxTurns']
        
    if 'tools' in gemini_frontmatter:
        merged_frontmatter['tools'] = gemini_frontmatter['tools']
        
    # Write back to .agents/agents
    with open(agents_path, 'w', encoding='utf-8') as f:
        f.write('---\n')
        yaml.dump(merged_frontmatter, f, sort_keys=False, default_flow_style=False)
        f.write('---\n')
        f.write(body)
        
    print(f"Merged {filename}")
