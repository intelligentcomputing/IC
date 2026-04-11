import os
import re

DATA_JS = """// ============================================================================
// CENTRALIZED CONTENT MANAGEMENT FOR GITHUB PAGES
// ============================================================================
// To add new Events, Mentees, or Faculty, simply add a new object { } to the appropriate list below!
// The website will automatically update and display everything perfectly. You do NOT need to touch the code anymore!

"""

def append_to_data(name, array_str):
    global DATA_JS
    DATA_JS += f"export const {name} = [\n{array_str}\n];\n\n"

# 1. Mentee extraction
def extract_mentees():
    mapping = {
        'Ashwathymentees.jsx': 'AshwathyMentees',
        'Jayamentees.jsx': 'JayaMentees',
        'Sureshmentees.jsx': 'SureshMentees',
        'Mentees.jsx': 'SheejaMentees'
    }
    for file, var_name in mapping.items():
        path = f"src/pages/{file}"
        if not os.path.exists(path): continue
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        match = re.search(r'const mentees = \[\s*(.*?)\s*\];', content, re.DOTALL)
        if match:
            append_to_data(var_name, "  " + match.group(1))

            # Rewrite the file
            new_content = re.sub(r'const mentees = \[.*?\];', '', content, flags=re.DOTALL)
            # Add import
            new_content = new_content.replace(
                "import { useNavigate } from 'react-router-dom';", 
                f"import {{ useNavigate }} from 'react-router-dom';\nimport {{ {var_name} as mentees }} from '../data';"
            )
            with open(path, 'w', encoding='utf-8') as f: f.write(new_content)

# 2. Activity Extraction
def extract_activities():
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
        
        # Regex to find AccordionItems
        # <AccordionItem title="..."> 
        #   <div className="visit-grid"> <img .../> ... </div> 
        # </AccordionItem>
        # We need to extract the raw JSX inside the `<AccordionItem title="X"> ... </AccordionItem>` 
        # into an object { title: "X", content: <> raw jsx </> }
        
        items = re.findall(r'<AccordionItem title="(.*?)">(.*?)</AccordionItem>', content, re.DOTALL)
        if not items: 
            append_to_data(var_name, "")
            continue
            
        data_str = ""
        for title, inner in items:
            # We must escape backticks or just use standard parsing
            data_str += f"  {{\n    title: `{title}`,\n    content: (\n      <>{inner}</>\n    )\n  }},\n"
            
        # We must add import React to DATA_JS if we are using JSX inside it
        append_to_data(var_name, data_str)
        
        # Rewrite file
        # We replace the whole AccordionItem blocks with a map
        new_content = re.sub(r'<AccordionItem title=".*?">.*?</AccordionItem>', '', content, flags=re.DOTALL)
        # Find exactly where the first one was... it is easier to replace them all at once.
        # But wait, replacing them all blindly leaves holes.
        # Let's replace the FIRST one with the explicit mapping, and delete the rest.
        pass

# Since Activity extraction involves extracting raw JSX, maybe it's cleaner to extract just the specific TEXT nodes for Activity elements in data.js to keep it clean.
# However, the user's HTML structure can be complex.
# The `new_content` rewrite relies on structured layout arrays. I'll just write it out manually.

extract_mentees()

# Create data.js
with open("src/data.js", "w", encoding='utf-8') as f:
    f.write(DATA_JS)
