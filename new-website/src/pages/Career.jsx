import React from 'react';
import { FaBrain, FaDatabase, FaCode, FaMicroscope, FaShieldAlt, FaMicrochip } from 'react-icons/fa';
import { useCMS } from '../context/CMSContext';

export default function Career() {
  const { getData, StaticData } = useCMS();
  const data = getData('career', StaticData.CareerData);

  const iconMap = [
    <FaBrain />, <FaDatabase />, <FaCode />, <FaMicroscope />, <FaShieldAlt />, <FaMicrochip />
  ];

  return (
    <div className="page-transition">
      <div className="glass-card" style={{ marginBottom: '2.5rem', textAlign: 'center', background: 'linear-gradient(145deg, rgba(0, 240, 255, 0.05), var(--surface-light))' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Career Paths</h1>
        <p className="content-body" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
          Graduates of the Intelligent Computing department are highly sought after by top tech giants and research labs globally. This program perfectly prepares you for the following premium roles:
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {data.map((career, idx) => (
          <div key={idx} className="glass-card" style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem', 
              borderTop: '3px solid var(--primary-accent)', 
              borderRadius: '16px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 240, 255, 0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'; }}
          >
            <div style={{ fontSize: '3rem', color: 'var(--primary-accent)' }}>
              {iconMap[idx % iconMap.length]}
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', margin: 0 }}>
              {career.title}
            </h3>
            <p style={{ color: 'var(--text-highlight)', lineHeight: '1.7', margin: 0, fontSize: '1.05rem' }}>
              {career.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
