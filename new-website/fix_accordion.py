import os
import re

def fix_activity_pages():
    files = ['Work.jsx', 'Event.jsx', 'Guest.jsx', 'Industrial.jsx', 'Conference.jsx', 'Intern.jsx']
    for filename in files:
        filepath = f"src/pages/{filename}"
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'visit-section' not in content: continue

        if 'AccordionItem' not in content:
            content = content.replace("import React from 'react';", "import React from 'react';\nimport AccordionItem from '../components/AccordionItem';\n")
        
        # We replace the visit-section structure safely
        # Header text
        content = re.sub(r'<div className="visit-header">\s*<h3>(.*?)</h3>\s*<div className="expand-button">.*?</div>\s*</div>', r'<AccordionItem title="\1">', content, flags=re.DOTALL)
        
        # Content wrappers
        content = re.sub(r'<div className="visit-section">', r'', content)
        content = re.sub(r'<div className="visit-content"[^>]*>', r'', content)
        
        # Now there are two hanging </div> tags closing visit-content and visit-section.
        # But wait! If I just removed <div className="visit-section"> and <div className="visit-content">,
        # then I introduced <AccordionItem> which needs ONE closing </AccordionItem>.
        # So I need to replace TWO closing </div> tags with ONE </AccordionItem>.
        # This is easy: look for `<div className="visit-grid">` up to `</div>\s*</div>\s*</div>`
        pass

# Let's do it much simpler:
def simple_fix():
    files = ['Work.jsx', 'Event.jsx', 'Guest.jsx', 'Industrial.jsx', 'Conference.jsx', 'Intern.jsx']
    for filename in files:
        filepath = f"src/pages/{filename}"
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if 'visit-section' not in content: continue
        
        if 'AccordionItem' not in content:
            content = content.replace("import React from 'react';", "import React from 'react';\nimport AccordionItem from '../components/AccordionItem';\n")

        # We need to construct the AccordionItem from the inside out.
        # Find all blocks starting with `<div className="visit-section">`
        # Because we know exactly what it looks like, it ends with `</div>` 3 times: 1 for visit-details, 1 for visit-grid, 1 for visit-content, 1 for visit-section... wait!
        # visit-details closes, then visit-grid closes, then visit-content closes, then visit-section closes.
        
        # Let's just use string parsing to extract Title and visit-grid block
        
        import re
        # Find all visit-sections
        pattern = re.compile(r'<div className="visit-section">.*?<h3>(.*?)</h3>.*?<div className="expand-button">[-+]</div>.*?</div>.*?<div className="visit-content"[^>]*>(.*?)</div>\s*</div>', re.DOTALL)
        
        def repl(match):
            title = match.group(1).strip()
            # Group 2 contains `<div className="visit-grid"> ... </div>` + one extra `</div>` maybe?
            # Wait, `<div className="visit-content">` contains `<div className="visit-grid"> ... </div>`.
            # So match.group(2) is just the `<div className="visit-grid">...</div>`.
            # Let's extract visit-grid correctly:
            inner_content = match.group(2).strip()
            return f'<AccordionItem title="{title}">\n{inner_content}\n</AccordionItem>'
            
        new_content = pattern.sub(repl, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Fixed", filename)
        
simple_fix()
