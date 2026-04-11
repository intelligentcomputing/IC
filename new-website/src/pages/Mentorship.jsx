import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Mentorship() {
  const navigate = useNavigate();

  return (
    <div className="page-transition glass-card" style={{ padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Our Mentors</h1>
      </div>
      
      <div className="mentee-grid">
        <div className="mentee-card" onClick={() => navigate('/mentees')} style={{ cursor: 'pointer' }}>
            <img alt="Dr. Sheejakumari" src="/s.png"/>
            <h3>Dr.V.Sheejakumari</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Mentor&amp;HOD</p>
            <p>View Mentee Profile</p>
        </div>
        
        <div className="mentee-card" onClick={() => navigate('/jayamentees')} style={{ cursor: 'pointer' }}>
            <img alt="Dr. Jayaprakash" src="/ja.png"/>
            <h3>Dr.M.Jayaprakash</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Mentor</p>
            <p>View Mentee Profile</p>
        </div>
        
        <div className="mentee-card" onClick={() => navigate('/sureshmentees')} style={{ cursor: 'pointer' }}>
            <img alt="Dr. Sureshkumar" src="/su.png"/>
            <h3>Dr.V.Sureshkumar</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Mentor</p>
            <p>View Mentee Profile</p>
        </div>

        <div className="mentee-card" onClick={() => navigate('/ashwathymentees')} style={{ cursor: 'pointer' }}>
            <img alt="Dr. Ashwathy" src="/as.png"/>
            <h3>Dr.Ashwathy</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Mentor</p>
            <p>View Mentee Profile</p>
        </div>

        <div className="mentee-card" onClick={() => navigate('/soon')} style={{ cursor: 'pointer' }}>
            <img alt="Soon" src="/soon.avif"/>
            <h3>?????????</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Mentor</p>
            <p>View Mentee Profile</p>
        </div>
      </div>
    </div>
  );
}

