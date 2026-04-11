import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="top-nav">
      <div className="nav-brand">
        <Link to="/">
          <img src="/logo.png" alt="Department Logo" />
        </Link>
        <div className="nav-title">
          <h1>Department of Intelligent Computing</h1>
        </div>
      </div>
      <div>
        <Link to="/facilities">
          <img src="/logo3.jpg" alt="College Logo" style={{ height: '45px', borderRadius: '5px' }} />
        </Link>
      </div>
    </header>
  );
}
