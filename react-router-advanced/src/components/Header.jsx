import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout, user }) => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/">React Router Advanced</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li className="user-info">
                <span>Welcome, {user?.name || 'User'}!</span>
                <button onClick={onLogout} className="logout-btn">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
