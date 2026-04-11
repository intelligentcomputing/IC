import os
import re

DATA_JS_ADD = ""

def extract_faculty():
    path = "src/pages/Faculty.jsx"
    if not os.path.exists(path): return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find faculty blocks
    # <div className="faculty-card"> ... </div>
    # They have img src, h2 (name), p for details, mailto links, etc.
    cards = re.findall(r'<div className="faculty-card">(.*?)</div>\s*</div>', content, re.DOTALL)
    
    faculties = []
    for card in cards:
        img_match = re.search(r'<img[^>]*src="(.*?)"', card)
        img = img_match.group(1) if img_match else ""
        
        name_match = re.search(r'<h2>(.*?)</h2>', card)
        name = name_match.group(1).strip() if name_match else ""
        
        desig_match = re.search(r'<strong>Designation:</strong>(.*?)<', card)
        desig = desig_match.group(1).strip() if desig_match else ""
        
        doj_match = re.search(r'<strong>Date of Joining:</strong>(.*?)<', card)
        doj = doj_match.group(1).strip() if doj_match else ""
        
        edu_match = re.search(r'<strong>Educational Qualification</strong>(.*?)<', card)
        edu = edu_match.group(1).strip() if edu_match else ""
        
        nature_match = re.search(r'<strong>Nature of Association:</strong>(.*?)<', card)
        nature = nature_match.group(1).strip() if nature_match else ""
        
        exp_match = re.search(r'<strong>Experience \(in Years\):</strong>(.*?)<', card)
        exp = exp_match.group(1).strip() if exp_match else ""
        
        interest_match = re.search(r'<strong>Area of Interest:</strong>(.*?)<', card)
        interest = interest_match.group(1).strip() if interest_match else ""
        
        email_match = re.search(r'mailto:(.*?)"', card)
        email = email_match.group(1).strip() if email_match else ""
        
        view_match = re.search(r'<a[^>]*href="(.*?)"[^>]*>View', card)
        view = view_match.group(1).strip() if view_match else "#"
        
        pub_match = re.search(r'<div className="publications">.*?<h3>Publications</h3>.*?<p>(.*?)</p>', card, re.DOTALL)
        pub = pub_match.group(1).strip() if pub_match else ""
        
        doc = f"""  {{
    name: "{name}",
    image: "{img}",
    designation: "{desig}",
    dateOfJoining: "{doj}",
    education: "{edu}",
    natureOfAssociation: "{nature}",
    experience: "{exp}",
    areaOfInterest: "{interest}",
    email: "{email}",
    profileLink: "{view}",
    publications: "{pub}"
  }}"""
        faculties.append(doc)

    global DATA_JS_ADD
    DATA_JS_ADD += "export const FacultyList = [\n" + ",\n".join(faculties) + "\n];\n\n"

extract_faculty()

with open('src/data.js', 'a', encoding='utf-8') as f:
    f.write(DATA_JS_ADD)

# Next we rewrite Faculty.jsx completely instead of using regex
jsx = """import React from 'react';
import { FacultyList } from '../data';

export default function Faculty() {
  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <section id="professors">
        {FacultyList.map((faculty, index) => (
          <div key={index} className="faculty-card">
            <div className="faculty-header">
              <a href="mentees.html" style={{textDecoration: 'none'}}>
                <img alt={faculty.name} src={faculty.image} />
              </a>
              <div className="faculty-info">
                <h2>{faculty.name}</h2>
                <p><strong>Designation:</strong> {faculty.designation}</p>
                <p><strong>Date of Joining:</strong> {faculty.dateOfJoining}</p>
                <p><strong>Educational Qualification:</strong> {faculty.education}</p>
                <p><strong>Nature of Association:</strong> {faculty.natureOfAssociation}</p>
                <p><strong>Experience (in Years):</strong> {faculty.experience}</p>
                <p><strong>Area of Interest:</strong> {faculty.areaOfInterest}</p>
                <div className="button-group">
                  <a className="btn btn-primary" href={`mailto:${faculty.email}`}>Contact</a>
                  {faculty.profileLink !== '#' && (
                    <a className="btn btn-secondary" href={faculty.profileLink} target="_blank" rel="noreferrer">View</a>
                  )}
                </div>
              </div>
            </div>
            {faculty.publications && (
              <div className="publications">
                <h3>Publications</h3>
                <p>{faculty.publications}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
"""
with open('src/pages/Faculty.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx)
