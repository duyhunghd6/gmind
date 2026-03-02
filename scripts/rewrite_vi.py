import sys
import os
from openai import OpenAI
import json

client = OpenAI()

def translate_file(filepath):
    print(f"Translating {filepath}...")
    with open(filepath, 'r') as f:
        content = f.read()

    prompt = f"""
Translate the following Markdown text to natural Vietnamese with proper diacritics (tiếng Việt có dấu).
Keep all Markdown formatting, code blocks, ASCII diagrams, and English technical terms intact.
Specifically:
- Translate "khong dau" Vietnamese to proper Vietnamese (e.g., "Ban co the..." -> "Bạn có thể...")
- Keep technical terms like "Spike", "Knowledge Graph", "Zvec", "chunk size", "Beads ID", "Graph Assembler" in English.
- DO NOT break ASCII diagrams. Vietnamese characters count as 1 char, so they won't break it. Leave the diagrams exactly structurally as they are, just translate the labels if they were in "khong dau" Vietnamese.

Text:
{content}
"""
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are an expert technical translator converting 'khong dau' Vietnamese back to proper Vietnamese with diacritics while preserving all Markdown and ASCII formatting perfectly."},
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )
    
    translated = response.choices[0].message.content
    
    # Strip markdown code block markers if the model wrapped the output
    if translated.startswith("```markdown\n"):
        translated = translated[12:]
    elif translated.startswith("```\n"):
        translated = translated[4:]
    if translated.endswith("\n```"):
        translated = translated[:-4]
        
    with open(filepath, 'w') as f:
        f.write(translated)
    print(f"Done {filepath}")

files = [
    "docs/researches/spikes/spike-zvec-indexer-pipeline.md",
    "docs/researches/spikes/spike-graph-assembler-performance.md",
    "docs/researches/spikes/spike-rte-approval-workflow.md",
    "docs/researches/spikes/spike-webui-rtm-dashboard.md",
    "docs/researches/spikes/spike-plan-document-format.md"
]

for f in files:
    translate_file(f)
