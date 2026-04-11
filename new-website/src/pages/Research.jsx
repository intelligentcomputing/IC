import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { 
  Users, Calendar, ChevronLeft, Mail, 
  UserCheck, BookOpen, Clock, Briefcase, 
  GraduationCap, Target, Eye, Send
} from 'lucide-react';

export default function Research() {
  const { getData, StaticData } = useCMS();
  
  // View states: 'category' (landing), 'researchers' (prof list), 'team' (prof scholars), 'activities'
  const [view, setView] = useState('category'); 
  const [selectedProf, setSelectedProf] = useState(null);

  // Load live data with fallbacks
  const researchersSheeja = getData('ResearchersSheeja', StaticData.ResearchersSheeja);
  const researchersJaya = getData('ResearchersJaya', StaticData.ResearchersJaya);
  const researchersAsh = getData('ResearchersAsh', StaticData.ResearchersAsh);
  const researchActivities = getData('ResearchActivities', StaticData.ResearchActivities);
  const facultyList = getData('FacultyList', StaticData.FacultyList);

  // Finding specific data for the 3 Principal Investigators
  const findFaculty = (namePart) => facultyList.find(f => f.name.toUpperCase().includes(namePart.toUpperCase())) || {};

  const professorFolders = [
    { 
      id: 'sheeja', 
      name: 'Dr. V SHEEJA KUMARI', 
      details: findFaculty('SHEEJA'),
      data: researchersSheeja 
    },
    { 
      id: 'jaya', 
      name: 'Dr. M JAYAPRAKASH', 
      details: findFaculty('JAYAPRAKASH'),
      data: researchersJaya 
    },
    { 
      id: 'ash', 
      name: 'Dr. R.H ASWATHY', 
      details: findFaculty('ASWATHY'),
      data: researchersAsh 
    },
  ];

  // VIEW: LANDING
  if (view === 'category') {
    return (
      <div className="page-transition">
        <div className="glass-card" style={{ marginBottom: '3rem' }}>
          <h1 className="section-title">Departmental Research Forum</h1>
          <p className="content-body">Explore our specialized research clusters and the brilliant minds driving innovation in intelligent computing.</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', padding: '2rem 1rem' }}>
          <div 
            onClick={() => setView('researchers')}
            style={{ 
              width: '350px', height: '220px', backgroundColor: '#fdf6e3', borderRadius: '15px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e0d0b0'
            }}
          >
             <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
             <h3 style={{ color: '#004d40', fontSize: '1.5rem', fontWeight: 'bold' }}>Researchers</h3>
          </div>

          <div 
            onClick={() => setView('activities')}
            style={{ 
              width: '350px', height: '220px', backgroundColor: '#ffffff', borderRadius: '15px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #eee'
            }}
          >
             <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
             <h3 style={{ color: '#004d40', fontSize: '1.5rem', fontWeight: 'bold' }}>Research Activities</h3>
          </div>
        </div>
      </div>
    );
  }

  // VIEW: PROFESSOR PROFILES (Horizontal Detailed Cards - Matches Ref Image 2)
  if (view === 'researchers') {
    return (
      <div className="page-transition">
        <button 
          onClick={() => setView('category')}
          className="back-btn"
          style={{ backgroundColor: '#004d40', color: '#fff', marginBottom: '2rem' }}
        >
          <ChevronLeft size={18} /> Back to Categories
        </button>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          {professorFolders.map(prof => (
            <div key={prof.id} className="faculty-profile-horizontal glass-card" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', padding: '1.5rem' }}>
              <div className="profile-img-container">
                <img 
                  src={prof.details.image || '/logo.png'} 
                  alt={prof.name} 
                  style={{ width: '100%', height: '100%', borderRadius: '12px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
                />
              </div>
              
              <div className="profile-content">
                <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>{prof.name}</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <DetailItem label="DESIGNATION" value={prof.details.designation} />
                  <DetailItem label="DATE OF JOINING" value={prof.details.dateOfJoining} />
                  <DetailItem label="EDUCATIONAL QUALIFICATION" value={prof.details.education} span />
                  <DetailItem label="NATURE OF ASSOCIATION" value={prof.details.natureOfAssociation || 'Regular'} />
                  <DetailItem label="EXPERIENCE (IN YEARS)" value={prof.details.experience} />
                  <DetailItem label="AREA OF INTEREST" value={prof.details.areaOfInterest} span />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button 
                    onClick={() => { setSelectedProf(prof); setView('team'); }}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold', padding: '0.8rem 2rem' }}
                  >
                    VIEW CLUSTER <Eye size={18} />
                  </button>
                  <a 
                    href={`mailto:${prof.details.email}`}
                    className="btn btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textTransform: 'uppercase', fontWeight: 'bold', padding: '0.8rem 2rem' }}
                  >
                    CONTACT <Send size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW: TEAM VIEW (Refined Scholar Cards - Matches Ref Image 1)
  if (view === 'team') {
    return (
      <div className="page-transition">
        <button 
          onClick={() => setView('researchers')}
          className="back-btn"
          style={{ backgroundColor: '#004d40', color: '#fff', marginBottom: '2rem' }}
        >
          <ChevronLeft size={18} /> Back to Investigators
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {selectedProf.data.map((res, i) => (
            <div 
              key={i} 
              style={{ 
                backgroundColor: '#649e8c', borderRadius: '15px', padding: '2.5rem 1.5rem', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', 
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div style={{ 
                width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '50%',
                overflow: 'hidden', border: '5px solid rgba(255,255,255,0.25)', marginBottom: '1.5rem',
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
              }}>
                <img src={res.img || res.image} alt={res.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <h4 style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.2rem', letterSpacing: '1px' }}>{res.name}</h4>
              <p style={{ fontWeight: '600', opacity: 0.9, fontSize: '1rem', marginBottom: '1.2rem' }}>{res.role}</p>
              
              <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem' }}></div>
              
              <p style={{ fontSize: '0.95rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 1, letterSpacing: '0.5px' }}>
                {res.area || res.areaOfInterest}
              </p>
              
              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', opacity: 0.9 }}>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}><Clock size={16}/> Joined: {res.joined}</div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}><BookOpen size={16}/> {res.edu || res.education}</div>
                 <a href={`mailto:${res.email}`} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
                   <Mail size={16}/> {res.email}
                 </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VIEW: ACTIVITIES
  if (view === 'activities') {
    return (
      <div className="page-transition">
        <button 
          onClick={() => setView('category')}
          className="back-btn" 
          style={{ backgroundColor: '#004d40', color: '#fff', marginBottom: '2rem' }}
        >
          <ChevronLeft size={18} /> Back to Categories
        </button>

        <h2 className="section-title">Research Forum Logs</h2>
        
        <div className="activity-timeline">
          {researchActivities.map((act, i) => (
            <div key={i} className="activity-card-horizontal glass-card">
              <div className="act-img-container"><img src={act.img || act.image} alt={act.title} /></div>
              <div className="act-details">
                <div className="act-header">
                  <span className="act-date">{act.date}</span>
                  <span className={`act-status ${act.status.toLowerCase()}`}>{act.status}</span>
                </div>
                <h3>{act.title}</h3>
                <p><strong>Presenter:</strong> {act.presenter}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Helper component for faculty details
function DetailItem({ label, value, span }) {
  return (
    <div style={{ gridColumn: span ? '1 / span 2' : 'auto', marginBottom: '0.5rem' }}>
      <label style={{ color: 'var(--primary-accent)', fontSize: '0.75rem', fontWeight: 'bold', display: 'block', marginBottom: '0.2rem' }}>{label}:</label>
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem' }}>{value || 'N/A'}</span>
    </div>
  );
}
