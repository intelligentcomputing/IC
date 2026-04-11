import os
import re

DATA_JS_ADD = ""

def append_to_data(name, array_str):
    global DATA_JS_ADD
    DATA_JS_ADD += f"export const {name} = [\n{array_str}\n];\n\n"

def extract_research():
    path = "src/pages/Research.jsx"
    if not os.path.exists(path): return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract researchersSheeja
    match = re.search(r'const researchersSheeja = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if match: append_to_data('ResearchersSheeja', "  " + match.group(1))

    match = re.search(r'const researchersJaya = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if match: append_to_data('ResearchersJaya', "  " + match.group(1))

    match = re.search(r'const researchersAsh = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if match: append_to_data('ResearchersAsh', "  " + match.group(1))

    match = re.search(r'const activities = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if match: append_to_data('ResearchActivities', "  " + match.group(1))

    # Strip them from Research.jsx
    new_content = re.sub(r'const researchersSheeja = \[.*?\];', '', content, flags=re.DOTALL)
    new_content = re.sub(r'const researchersJaya = \[.*?\];', '', new_content, flags=re.DOTALL)
    new_content = re.sub(r'const researchersAsh = \[.*?\];', '', new_content, flags=re.DOTALL)
    new_content = re.sub(r'const activities = \[.*?\];', '', new_content, flags=re.DOTALL)
    
    # Add import
    new_content = new_content.replace(
        "import React, { useState } from 'react';", 
        "import React, { useState } from 'react';\nimport { ResearchersSheeja, ResearchersJaya, ResearchersAsh, ResearchActivities } from '../data';"
    )
    
    # Update variables in render
    new_content = new_content.replace('researchersSheeja', 'ResearchersSheeja')
    new_content = new_content.replace('researchersJaya', 'ResearchersJaya')
    new_content = new_content.replace('researchersAsh', 'ResearchersAsh')
    new_content = new_content.replace('activities.map(', 'ResearchActivities.map(')

    with open(path, 'w', encoding='utf-8') as f: f.write(new_content)

extract_research()

with open("src/data.js", "a", encoding='utf-8') as f:
    f.write(DATA_JS_ADD)
