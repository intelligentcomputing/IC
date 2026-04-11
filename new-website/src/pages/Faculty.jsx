import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

export default function Faculty() {
  const { getData, StaticData } = useCMS();
  const list = getData('faculty', StaticData.FacultyList);

  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <section id="professors">
        {list.map((faculty, index) => (
          <div key={index} className="faculty-card">
            <div className="faculty-header">
              {/* Use dynamic routes instead of hardcoded .html */}
              <Link to={faculty.menteeRoute || '/mentorship'} style={{textDecoration: 'none'}}>
                <img alt={faculty.name} src={faculty.image} />
              </Link>
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
                  {faculty.profileLink && faculty.profileLink !== '#' && (
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
