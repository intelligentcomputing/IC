import os
import re

DATA_JS_ADD = ""

def extract_accordion_pages():
    global DATA_JS_ADD
    mapping = {
        'Work.jsx': 'WorkshopsData',
        'Event.jsx': 'EventsData',
        'Guest.jsx': 'GuestLecturesData',
        'Industrial.jsx': 'IndustrialVisitsData',
        'Conference.jsx': 'ConferenceData',
        'Intern.jsx': 'InternshipsData'
    }
    
    for file, var_name in mapping.items():
        path = f"src/pages/{file}"
        if not os.path.exists(path): continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        cards = re.findall(r'<AccordionItem title="(.*?)">.*?<img[^>]*src="(.*?)"[^>]*>.*?<h4>(.*?)</h4>(.*?)</div>\s*</div>\s*</AccordionItem>', content, re.DOTALL)
        
        items = []
        for title, img, heading, p_blocks in cards:
            details = []
            paragraphs = []
            
            p_tags = re.findall(r'<p>(.*?)</p>', p_blocks, re.DOTALL)
            for p in p_tags:
                # check if it's a detail (has <strong>)
                s_match = re.search(r'<strong>(.*?):?</strong>\s*(.*)', p, re.DOTALL)
                if s_match:
                    label = s_match.group(1).strip().replace(':', '')
                    val = s_match.group(2).strip()
                    details.append(f"{{ label: '{label}', value: `{val}` }}")
                else:
                    # pure paragraph
                    clean_p = re.sub(r'<[^>]*>', '', p).strip()
                    paragraphs.append(f"`{clean_p}`")
                    
            item_obj = f"""  {{
    title: `{title.strip()}`,
    image: "{img.strip()}",
    heading: `{heading.strip()}`,
    details: [\n      {",\\n      ".join(details)}\n    ],
    paragraphs: [\n      {",\\n      ".join(paragraphs)}\n    ]
  }}"""
            items.append(item_obj)
            
        DATA_JS_ADD += f"export const {var_name} = [\n{','.join(items)}\n];\n\n"
        
        # Rewrite the file
        title_map = {
            'Work.jsx': 'Workshops',
            'Event.jsx': 'Events',
            'Guest.jsx': 'Guest Lectures',
            'Industrial.jsx': 'Industrial Visits',
            'Conference.jsx': 'Conference',
            'Intern.jsx': 'Internships'
        }
        page_title = title_map[file]
        new_content = f"""import React from 'react';
import ActivityTemplate from '../components/ActivityTemplate';
import {{ {var_name} }} from '../data';

export default function {file.replace('.jsx', '')}() {{
  return <ActivityTemplate title="{page_title}" data={{{var_name}}} />;
}}
"""
        with open(path, 'w', encoding='utf-8') as f: f.write(new_content)

extract_accordion_pages()

with open('src/data.js', 'a', encoding='utf-8') as f:
    f.write(DATA_JS_ADD)

