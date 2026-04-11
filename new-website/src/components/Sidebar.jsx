import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, Users, BookOpen, UserPlus, 
  MapPin, Mic, Calendar, Laptop, 
  Globe, Briefcase, GraduationCap, Award, Newspaper,
  Settings
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: 'About', path: '/', icon: <Building2 size={20} /> },
    { name: 'Faculty', path: '/faculty', icon: <Users size={20} /> },
    { name: 'Research Forum', path: '/research', icon: <BookOpen size={20} /> },
    { name: 'Mentorship', path: '/mentorship', icon: <UserPlus size={20} /> },
    { name: 'Industrial Visits', path: '/industrial', icon: <MapPin size={20} /> },
    { name: 'Guest Lectures', path: '/guest', icon: <Mic size={20} /> },
    { name: 'Events', path: '/event', icon: <Calendar size={20} /> },
    { name: 'Workshops', path: '/work', icon: <Laptop size={20} /> },
    { name: 'Conference', path: '/conference', icon: <Globe size={20} /> },
    { name: 'Internships', path: '/intern', icon: <Briefcase size={20} /> },
    { name: 'Academic Offerings', path: '/academic', icon: <GraduationCap size={20} /> },
    { name: 'Career Ops', path: '/career', icon: <Award size={20} /> },
    { name: 'FDP', path: '/fdp', icon: <Newspaper size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link 
            key={link.path} 
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <Link 
            to="/admin-portal" 
            className={location.pathname === '/admin-portal' ? 'active' : ''}
            style={{ opacity: 0.7 }}
          >
            <Settings size={20} />
            Manage Content
          </Link>
        </div>
      </nav>
    </aside>
  );
}
