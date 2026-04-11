import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JayaMentees as mentees } from '../data';

export default function Jayamentees() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  

  const filteredMentees = mentees.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <button className="back-button" onClick={() => navigate('/mentorship')}>
        ← Back to Mentors
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>MENTEES</h1>
      </div>
      
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <input 
          type="text" 
          placeholder="Search by name or ID..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '600px', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: 'var(--surface-heavy)', color: '#fff', fontSize: '1.1rem', outline: 'none' }}
        />
      </div>

      <div className="mentee-grid">
        {filteredMentees.map((m, i) => (
          <div className="mentee-card" key={i}>
            <img alt={m.name} src={m.img}/>
            <h2 className="mentee-name" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>{m.name}</h2>
            <p className="mentee-info" style={{ color: 'var(--text-muted)' }}>{m.year}</p>
            <p className="mentee-info" style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>{m.id}</p>
          </div>
        ))}
        {filteredMentees.length === 0 && (
            <p className="content-body" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No mentees found matching your search.</p>
        )}
      </div>
    </div>
  );
}


