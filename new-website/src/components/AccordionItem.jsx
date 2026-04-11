import React, { useState } from 'react';

export default function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2rem', cursor: 'pointer', border: isOpen ? '1px solid var(--primary-accent)' : '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
            padding: '1.5rem 2rem', 
            background: isOpen ? 'var(--primary-accent)' : 'var(--surface-medium)', 
            color: isOpen ? '#000' : '#fff', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            transition: 'background 0.3s ease'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '600' }}>{title}</h3>
        <div style={{ fontSize: '1.8rem', fontWeight: '400', lineHeight: 1 }}>{isOpen ? '−' : '+'}</div>
      </div>
      <div 
        style={{ 
          maxHeight: isOpen ? '2000px' : '0', 
          opacity: isOpen ? 1 : 0, 
          transition: 'all 0.4s ease', 
          overflow: 'hidden' 
        }}
      >
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
