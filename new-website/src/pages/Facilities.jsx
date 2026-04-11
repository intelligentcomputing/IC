import React, { useState } from 'react';

export default function Facilities() {
  const [activeModal, setActiveModal] = useState(null);

  const facilityDetails = {
    library: {
      title: "Modern Library",
      image: "/li.jpg",
      description: (
        <>
          <p>Our state-of-the-art library spans three floors and features:</p>
          <ul className="feature-list">
            <li>Over 50,000 books across all disciplines</li>
            <li>Digital resource center with online journals and databases</li>
            <li>Individual and group study rooms</li>
            <li>24/7 access during exam periods</li>
            <li>Professional librarians for research assistance</li>
          </ul>
        </>
      )
    },
    lab: {
      title: "Research Laboratories",
      image: "/lab1.png",
      description: (
        <>
          <p>Our cutting-edge laboratories include:</p>
          <ul className="feature-list">
            <li>Advanced Computing Lab with latest hardware and software</li>
            <li>Biotechnology Research Center</li>
            <li>Physics and Chemistry Labs</li>
            <li>Engineering Workshop</li>
            <li>Innovation Hub for student projects</li>
          </ul>
        </>
      )
    },
    sports: {
      title: "Sports Complex",
      image: "/sp.jpeg",
      description: (
        <>
          <p>Our comprehensive sports facilities include:</p>
          <ul className="feature-list">
            <li>Olympic-size swimming pool</li>
            <li>Indoor basketball and volleyball courts</li>
            <li>Modern fitness center with trainers</li>
            <li>Cricket and football grounds</li>
            <li>Athletics track</li>
          </ul>
        </>
      )
    },
    hostel: {
      title: "Student Housing",
      image: "/ho.jpeg",
      description: (
        <p>Contemporary dormitories with modern amenities and comfortable living spaces.</p>
      )
    },
    cafeteria: {
      title: "Campus Dining",
      image: "/ca.jpeg",
      description: (
        <p>Multiple dining options offering diverse, nutritious meals in a welcoming atmosphere.</p>
      )
    },
    auditorium: {
      title: "Auditorium",
      image: "/hall.jpg",
      description: (
        <p>Modern auditorium for cultural events, seminars, and academic conferences.</p>
      )
    }
  };

  return (
    <div className="page-transition">
      <div className="glass-card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ justifyContent: 'center' }}>Our World-Class Facilities</h1>
        <p className="content-body">Empowering minds, shaping futures, and creating tomorrow's leaders through world-class education and cutting-edge facilities.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {Object.entries(facilityDetails).map(([key, fac]) => (
          <div 
            key={key} 
            className="glass-card" 
            style={{ padding: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => setActiveModal(key)}
          >
            <img src={fac.image} alt={fac.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }} />
            <h3>{fac.title}</h3>
            <p className="content-body" style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Click to view details</p>
          </div>
        ))}
      </div>

      {activeModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }} onClick={() => setActiveModal(null)}>
          <div className="glass-card" style={{ maxWidth: '600px', width: '90%', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setActiveModal(null)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            >×</button>
            <h2 className="section-title">{facilityDetails[activeModal].title}</h2>
            <div className="content-body">
              {facilityDetails[activeModal].description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

