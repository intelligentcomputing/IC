import React from 'react';
import { Target, Zap, Shield, Cpu } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Home() {
  const { getData, StaticData } = useCMS();
  const data = getData('home', StaticData.HomeData);

  const iconMap = {
    'Comprehensive Programs': <Target className="icon" style={{ color: '#00f0ff' }} size={30} />,
    'Modern Labs': <Cpu className="icon" style={{ color: '#8b5cf6' }} size={30} />,
    'Pioneering Research': <Zap className="icon" style={{ color: '#FCD34D' }} size={30} />,
    'Partnerships': <Shield className="icon" style={{ color: '#10B981' }} size={30} />
  };

  return (
    <div>
      <div className="glass-card" style={{ 
        backgroundImage: 'linear-gradient(rgba(4, 8, 20, 0.8), rgba(4, 8, 20, 0.9)), url("/iv5 (4).jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: '5rem 2rem',
        border: '1px solid var(--primary-accent)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, transparent 60%)' }}></div>
        <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', textShadow: '0 0 20px rgba(0, 240, 255, 0.5)', position: 'relative', zIndex: 1 }}>
          ABOUT US
        </h1>
        <p style={{ color: 'var(--primary-accent)', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '4px', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
          Department of Intelligent Computing
        </p>
      </div>

      <div className="glass-card">
        <h3 className="section-title">{data.aboutTitle}</h3>
        <p className="content-body">{data.aboutContent}</p>
      </div>

      <div className="glass-card">
        <h3 className="section-title">Key Highlights</h3>
        <img src="/sail.jpg" alt="Department Facilities" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }} />
        
        <ul className="feature-list">
          {data.keyHighlights.map((highlight, idx) => (
            <li key={idx}>
              {iconMap[highlight.title]}
              <p>{highlight.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-card">
        <h3 className="section-title">Salient Features</h3>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-highlight)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {data.salientFeatures.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
