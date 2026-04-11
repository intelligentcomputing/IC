import glob
import os
import re
from bs4 import BeautifulSoup

def fix_activity_pages():
    files = ['Work.jsx', 'Event.jsx', 'Guest.jsx', 'Industrial.jsx', 'Conference.jsx', 'Intern.jsx']
    for filename in files:
        filepath = f"src/pages/{filename}"
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # If it doesn't have visit-section, it might not need accordion
        if 'visit-section' not in content: continue

        # We must carefully inject the import for AccordionItem
        if 'AccordionItem' not in content:
            content = content.replace("import React from 'react';", "import React from 'react';\nimport AccordionItem from '../components/AccordionItem';\n")
        
        soup = BeautifulSoup(content, 'html.parser')
        
        sections = soup.find_all('div', class_='visit-section')
        if not sections: continue
        
        for section in sections:
            header = section.find('div', class_='visit-header')
            if not header: continue
            title_node = header.find('h3')
            title = title_node.text if title_node else "Event Details"
            
            # The content remains inside visit-content
            # Note: in JSX the style attribute is style={{display:'block'}}. BS4 parses it as block}}
            content_div = section.find('div', class_='visit-content')
            if content_div:
                # We want the INNER HTML of content_div
                inner_html = "".join([str(c) for c in content_div.contents])
            else:
                inner_html = ""
                
            new_jsx = f'<AccordionItem title="{title}">\n{inner_html}\n</AccordionItem>'
            
            # Replace the entire visit-section with new_jsx
            # We can't easily replace nodes directly with raw strings in BS4 if it's JSX (due to { } parsing issues built into BS4)
            # So let's use regex matching based on the fact that these boundaries are predictable
        
        # ACTUALLY, regex is safer if we just find `<div className="visit-section">` to its end. 
        # But we can just use string replacements on the original file!
        new_content = content
        
        # Regex to find visit-section blocks
        pattern = re.compile(r'<div className="visit-section">.*?<div className="visit-header">.*?<h3>(.*?)</h3>.*?</div>.*?<div className="visit-content"[^>]*>(.*?)</div>\s*</div>', re.DOTALL)
        
        def repl(match):
            title = match.group(1)
            inner = match.group(2)
            return f'<AccordionItem title="{title}">{inner}</AccordionItem>'
            
        new_content = pattern.sub(repl, new_content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Fixed Accordions inside {filename}")

def fix_mentee_pages():
    files = ['Ashwathymentees.jsx', 'Jayamentees.jsx', 'Sureshmentees.jsx', 'Mentees.jsx']
    for filename in files:
        filepath = f"src/pages/{filename}"
        if not os.path.exists(filepath): continue
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        if '<input' not in content and 'useState' in content: 
            continue # Already fixed

        # Find all mentee cards
        pattern = re.compile(r'<div className="mentee-card".*?<img alt="[^"]*" src="([^"]*)"/>.*?<h2 className="mentee-name">(.*?)</h2>.*?<p className="mentee-info">(.*?)</p>.*?<p className="mentee-info">(.*?)</p>.*?</div>', re.DOTALL)
        
        matches = pattern.findall(content)
        if not matches: continue
        
        data_array = []
        for match in matches:
            img, name, year, id_num = match
            name = name.strip()
            data_array.append(f'{{ name: "{name}", img: "{img}", year: "{year}", id: "{id_num}" }}')
            
        array_str = "  const mentees = [\n    " + ",\n    ".join(data_array) + "\n  ];"
        
        # Construct the new component
        page_name = filename.replace('.jsx', '')
        
        new_component = f"""import React, {{ useState }} from 'react';
import {{ useNavigate }} from 'react-router-dom';

export default function {page_name}() {{
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

{array_str}

  const filteredMentees = mentees.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <button className="back-button" onClick={{() => navigate('/mentorship')}}>
        ← Back to Mentors
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>MENTEES</h1>
      </div>
      
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          value={{searchTerm}}
          onChange={{e => setSearchTerm(e.target.value)}}
          style={{ width: '100%', maxWidth: '600px', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: 'var(--surface-heavy)', color: '#fff', fontSize: '1.1rem', outline: 'none' }}
        />
      </div>

      <div className="mentee-grid">
        {{filteredMentees.map((m, i) => (
          <div className="mentee-card" key={{i}}>
            <img alt={{m.name}} src={{m.img}}/>
            <h2 className="mentee-name" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>{{m.name}}</h2>
            <p className="mentee-info" style={{ color: 'var(--text-muted)' }}>{{m.year}}</p>
            <p className="mentee-info" style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{{m.id}}</p>
          </div>
        ))}}
        {{filteredMentees.length === 0 && (
            <p className="content-body" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No mentees found matching your search.</p>
        )}}
      </div>
    </div>
  );
}}
"""
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_component)
            
        print(f"Fixed Search logic inside {filename}")

fix_activity_pages()
fix_mentee_pages()
