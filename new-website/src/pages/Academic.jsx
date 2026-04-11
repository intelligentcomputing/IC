import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function Academic() {
  const { getData, StaticData } = useCMS();
  const data = getData('academic', StaticData.AcademicData);

  return (
    <div className="page-transition">
      <div className="glass-card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Academic Offerings</h1>
        <p className="content-body" style={{ textAlign: 'center' }}>
          Discover our comprehensive range of specialized programs designed for the future of intelligent computing.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {data.map((section, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ background: 'var(--surface-medium)', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{section.icon}</span>
              <h2 style={{ margin: 0, color: 'var(--primary-accent)', fontSize: '1.8rem', fontWeight: 600 }}>{section.category}</h2>
            </div>
            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {section.programs.map((prog, pIdx) => (
                <div key={pIdx} style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.3s ease' }}
                     onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-accent)'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>{prog.title}</h3>
                  <p style={{ color: 'var(--text-highlight)', lineHeight: '1.6', margin: 0 }}>{prog.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
