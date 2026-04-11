import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { LogIn, Save, Upload, Plus, Trash2, Layout, Users, BookOpen, GraduationCap, ShieldCheck, Lock, ArrowRight, RefreshCw, Key } from 'lucide-react';

const API_BASE = 'http://localhost:3001/api';

export default function AdminPortal() {
  const { getData, StaticData } = useCMS();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1 = Password, 2 = Secret PIN
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [db, setDb] = useState(null);
  const [activeSection, setActiveSection] = useState('WorkshopsData');
  const [loading, setLoading] = useState(false);

  // Load the current JSON database on login
  useEffect(() => {
    if (isLoggedIn) {
      import('../data.json').then(data => setDb(data.default));
    }
  }, [isLoggedIn]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const storedPassword = StaticData.AdminSettings.find(s => s.key === 'password').value;
    if (password.trim() === storedPassword.trim()) {
      setLoginStep(2);
    } else {
      alert('❌ Invalid Keycode');
    }
  };

  const handlePinVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() })
      });
      const result = await resp.json();
      if (result.success) {
        setIsLoggedIn(true);
      } else {
        alert('❌ Invalid Secret PIN');
      }
    } catch (err) {
      alert('Local server unreachable. Please run start-premium-website.bat');
    }
    setLoading(false);
  };

  const saveDatabase = async (updatedDb) => {
    setLoading(true);
    try {
      const resp = await fetch(`${API_BASE}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDb)
      });
      const result = await resp.json();
      if (result.success) {
        setDb(updatedDb);
        alert('✅ Website Updated Successfully!');
      }
    } catch (err) {
      alert('❌ Error Saving. Is CMS Server running?');
    }
    setLoading(false);
  };

  const handleImageUpload = async (e, sectionIndex, field = 'image') => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const resp = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
      const result = await resp.json();
      if (result.success) {
        const newDb = { ...db };
        newDb[activeSection][sectionIndex][field] = result.filename;
        setDb(newDb);
      }
    } catch (err) {
      alert('Upload failed.');
    }
  };

  const updateItem = (index, field, value) => {
    const newDb = { ...db };
    newDb[activeSection][index][field] = value;
    setDb(newDb);
  };

  const updateCredential = (key, value) => {
    if (!value) return;
    const newDb = { ...db };
    const setting = newDb['AdminSettings'].find(s => s.key === key);
    if (setting) setting.value = value;
    setDb(newDb);
    alert(`${key.replace('_',' ')} updated in editor. Click PUBLISH to save.`);
  };

  const addNewItem = () => {
    const newDb = { ...db };
    let emptyItem = {};
    if (activeSection.includes('Mentees')) {
      emptyItem = { name: '', id: '', year: '1st Year', img: 'placeholder.png' };
    } else if (activeSection.includes('Data')) {
      emptyItem = { title: 'New Activity', heading: '', image: 'placeholder.jpg', details: [], paragraphs: [] };
    } else if (activeSection === 'FacultyList') {
      emptyItem = { name: '', image: 's.png', designation: '', education: '', areaOfInterest: '', email: '' };
    }
    newDb[activeSection] = [emptyItem, ...newDb[activeSection]];
    setDb(newDb);
  };

  const deleteItem = (index) => {
    if (window.confirm('Delete this item?')) {
      const newDb = { ...db };
      newDb[activeSection].splice(index, 1);
      setDb(newDb);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-transition glass-card" style={{ maxWidth: '400px', margin: '100px auto', padding: '3rem', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <ShieldCheck size={64} color="var(--primary-accent)" />
        </div>
        
        <h2 style={{ letterSpacing: '2px' }}>Intelligence Gateway</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {loginStep === 1 ? 'Phase 1: Security Keycode' : 'Phase 2: Secret Digital PIN'}
        </p>

        {loginStep === 1 ? (
          <form onSubmit={handlePasswordSubmit}>
            <input 
              type="password" 
              placeholder="Enter Keycode" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--surface-heavy)', border: '1px solid var(--border-subtle)', color: '#fff', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '4px' }}
            />
            <button className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
              NEXT STEP <ArrowRight size={20}/>
            </button>
          </form>
        ) : (
          <form onSubmit={handlePinVerify}>
            <input 
              type="password" 
              placeholder="••••••" 
              value={pin}
              maxLength={6}
              onChange={(e) => setPin(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', background: 'var(--surface-heavy)', border: '1px solid var(--border-subtle)', color: '#fff', marginBottom: '1.5rem', textAlign: 'center', fontSize: '2rem', letterSpacing: '12px' }}
            />
            <button className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying...' : 'UNLOCK VAULT'}
            </button>
            <button type="button" onClick={() => setLoginStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '1.5rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </form>
        )}
      </div>
    );
  }

  if (!db) return <div className="glass-card">Synchronizing Vault...</div>;

  return (
    <div className="page-transition">
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ margin: 0 }}>Content Management System</h1>
        <button onClick={() => saveDatabase(db)} disabled={loading} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 2rem' }}>
          <Save size={20} /> {loading ? 'Saving...' : 'PUBLISH CHANGES'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '1rem', height: 'fit-content' }}>
          <h4 style={{ color: 'var(--primary-accent)', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Sections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.keys(db).map(key => (
              <button key={key} onClick={() => setActiveSection(key)} className={`btn ${activeSection === key ? 'btn-primary' : ''}`} style={{ textAlign: 'left', background: activeSection === key ? 'var(--primary-accent)' : 'transparent', color: activeSection === key ? '#000' : '#fff', border: 'none', padding: '0.8rem 1rem', borderRadius: '6px', fontWeight: '500' }}>
                {key.replace('Data', '').replace('List', '').replace('Settings', ' Security')}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ textTransform: 'capitalize' }}>Managing: {activeSection.replace('Data','').replace('List','').replace('Settings', 'Security')}</h2>
            {activeSection !== 'AdminSettings' && (
              <button onClick={addNewItem} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> Add New
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {db[activeSection].map((item, idx) => (
              <div key={idx} className="glass-card" style={{ background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                {activeSection !== 'AdminSettings' && <button onClick={() => deleteItem(idx)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}><Trash2 size={20} /></button>}

                {activeSection === 'AdminSettings' ? (
                  <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                      <h4 style={{ color: 'var(--primary-accent)', marginBottom: '1rem' }}><Lock size={16}/> {item.key.replace('_',' ')}</h4>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="password" placeholder={`New ${item.key}`} onChange={(e) => item._val = e.target.value} style={{ flex: 1, padding: '0.8rem', background: 'var(--surface-heavy)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff' }} />
                        <button onClick={() => updateCredential(item.key, item._val)} className="btn btn-secondary">Update {item.key.split('_')[1]}</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                      <img src={item.image || item.img || '/placeholder.png'} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }} onError={(e) => e.target.src = '/logo.png'} />
                      <label className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer' }}><Upload size={14} /> Change<input type="file" hidden onChange={(e) => handleImageUpload(e, idx, item.image ? 'image' : 'img')} /></label>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {Object.keys(item).map(field => field !== 'details' && field !== 'paragraphs' && field !== 'image' && field !== 'img' && field !== '_val' && (
                        <div key={field}>
                          <label style={{ fontSize: '0.8rem', color: 'var(--primary-accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>{field}</label>
                          <input type="text" value={item[field]} onChange={(e) => updateItem(idx, field, e.target.value)} style={{ width: '100%', padding: '0.6rem', background: 'var(--surface-heavy)', border: '1px solid var(--border-subtle)', borderRadius: '6px', color: '#fff' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
