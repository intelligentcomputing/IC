import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Academic from './pages/Academic';
import Ashwathymentees from './pages/Ashwathymentees';
import Career from './pages/Career';
import Conference from './pages/Conference';
import Event from './pages/Event';
import Facilities from './pages/Facilities';
import Faculty from './pages/Faculty';
import Fdp from './pages/Fdp';
import Guest from './pages/Guest';
import Industrial from './pages/Industrial';
import Intern from './pages/Intern';
import Jayamentees from './pages/Jayamentees';
import Mentees from './pages/Mentees';
import Mentorship from './pages/Mentorship';
import News from './pages/News';
import Research from './pages/Research';
import Soon from './pages/Soon';
import Sureshmentees from './pages/Sureshmentees';
import Work from './pages/Work';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/ashwathymentees" element={<Ashwathymentees />} />
          <Route path="/career" element={<Career />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/event" element={<Event />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/fdp" element={<Fdp />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/industrial" element={<Industrial />} />
          <Route path="/intern" element={<Intern />} />
          <Route path="/jayamentees" element={<Jayamentees />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/news" element={<News />} />
          <Route path="/research" element={<Research />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/sureshmentees" element={<Sureshmentees />} />
          <Route path="/work" element={<Work />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="*" element={
            <div className="glass-card">
              <h3 className="section-title">Coming Soon</h3>
              <p className="content-body">This page is currently being migrated to the new design.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
