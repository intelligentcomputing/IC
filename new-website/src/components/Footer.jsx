import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ 
      marginTop: 'auto',
      background: 'linear-gradient(to bottom, #02040a, #000000)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top glowing accent line */}
      <div style={{ position: 'absolute', top: 0, left: '0', width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--primary-accent), transparent)', opacity: 0.5 }}></div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        
        {/* Brand & Map Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/collogo.png" alt="University Logo" style={{ height: '60px', borderRadius: '8px' }} />
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.2rem', margin: 0, letterSpacing: '1px' }}>SIMATS</h2>
              <span style={{ color: 'var(--primary-accent)', fontSize: '0.9rem', fontWeight: 600 }}>Intelligent Computing</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
            Pioneering the future of technology through advanced research, artificial intelligence, and cutting-edge software engineering.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="https://www.instagram.com/intelligentcomputingdept/" className="social-btn"><FaInstagram size={18} /></a>
            <a href="https://x.com/Intelligentdept" className="social-btn"><FaTwitter size={18} /></a>
            <a href="http://www.linkedin.com/in/intelligent-computing-59b794348" className="social-btn"><FaLinkedin size={18} /></a>
            <a href="https://www.youtube.com/channel/UCxCW2kzBmtX-FTLXYUw8RTQ" className="social-btn"><FaYoutube size={18} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <li><Link to="/about" style={{ color: 'var(--text-highlight)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary-accent)'} onMouseLeave={e=>e.target.style.color='var(--text-highlight)'}>About Department</Link></li>
            <li><Link to="/academic" style={{ color: 'var(--text-highlight)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary-accent)'} onMouseLeave={e=>e.target.style.color='var(--text-highlight)'}>Academic Offerings</Link></li>
            <li><Link to="/faculty" style={{ color: 'var(--text-highlight)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary-accent)'} onMouseLeave={e=>e.target.style.color='var(--text-highlight)'}>Our Faculty</Link></li>
            <li><Link to="/research" style={{ color: 'var(--text-highlight)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary-accent)'} onMouseLeave={e=>e.target.style.color='var(--text-highlight)'}>Research Forum</Link></li>
            <li><Link to="/career" style={{ color: 'var(--text-highlight)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e=>e.target.style.color='var(--primary-accent)'} onMouseLeave={e=>e.target.style.color='var(--text-highlight)'}>Career Opportunities</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Contact Info</h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: 'var(--text-highlight)' }}>
            <FaMapMarkerAlt style={{ color: 'var(--primary-accent)', fontSize: '1.2rem', marginTop: '4px' }} />
            <div>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '0.2rem' }}>Simats Engineering Campus</strong>
              Saveetha Institute of Medical and Technical Sciences, Chennai, Tamil Nadu.
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-highlight)' }}>
            <FaEnvelope style={{ color: 'var(--primary-accent)' }} />
            <a href="mailto:intelligentcomputing@saveetha.com" style={{ color: 'var(--text-highlight)', textDecoration: 'none' }}>intelligentcomputing@saveetha.com</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-highlight)' }}>
            <FaPhone style={{ color: 'var(--primary-accent)' }} />
            <span>+91 XXXXX XXXXX</span>
          </div>
        </div>

        {/* Google Map Embedded */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>Find Us</h3>
          <div style={{ borderRadius: '12px', padding: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.152448075539!2d80.01389277484239!3d13.025962287294465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528bac1ae5a3bb%3A0xe16a7b4e839e6daf!2sSIMATS%20ENGINEERING!5e0!3m2!1sen!2sin!4v1737120239260!5m2!1sen!2sin" 
              width="100%" 
              height="180" 
              style={{ border: 0, display: 'block', borderRadius: '8px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
      
      {/* Copyright Bar */}
      <div style={{ 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        padding: '1.5rem 2rem', 
        textAlign: 'center', 
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        background: '#000'
      }}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Department of Intelligent Computing - SIMATS Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
}
