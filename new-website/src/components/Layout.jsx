import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (e.target.tagName === 'IMG') {
        const isExcluded = e.target.closest('.nav-brand') || e.target.closest('.no-lightbox');
        if (!isExcluded) {
          setLightboxImg(e.target.src);
        }
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      
      {/* Ambient Background for Widescreen Side Gaps */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 60%)', filter: 'blur(80px)', animation: 'floatBlob 15s infinite alternate ease-in-out' }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, transparent 60%)', filter: 'blur(80px)', animation: 'floatBlob 20s infinite alternate-reverse ease-in-out' }}></div>
        <style>{`@keyframes floatBlob { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(50px, 100px) scale(1.1); } }`}</style>
      </div>

      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="page-content">
          {children}
        </main>
      </div>
      <Footer />
      
      {/* Premium Global Lightbox */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out',
            opacity: 1,
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <img 
            src={lightboxImg} 
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              borderRadius: '8px',
              boxShadow: '0 10px 50px rgba(0,0,0,0.5), 0 0 30px rgba(0, 240, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              transform: 'scale(1)',
              animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }} 
            alt="Expanded view" 
            className="no-lightbox"
          />
          <div style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#fff', fontSize: '3rem', cursor: 'pointer', transition: 'color 0.2s', zIndex: 100000 }} onMouseEnter={e => e.target.style.color='var(--primary-accent)'} onMouseLeave={e => e.target.style.color='#fff'}>
            &times;
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
    </div>
  );
}
