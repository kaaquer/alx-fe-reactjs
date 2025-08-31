import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = ({ user }) => {
  const location = useLocation();
  
  return (
    <div className="profile">
      <h2>User Profile</h2>
      <p>Welcome, {user?.name || 'User'}! This page demonstrates nested routes.</p>
      
      <div className="profile-layout">
        <nav className="profile-nav">
          <ul>
            <li>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                Profile Overview
              </Link>
            </li>
            <li>
              <Link to="/profile/details" className={location.pathname === '/profile/details' ? 'active' : ''}>
                Profile Details
              </Link>
            </li>
            <li>
              <Link to="/profile/settings" className={location.pathname === '/profile/settings' ? 'active' : ''}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="profile-content">
          <Routes>
            <Route path="/" element={<ProfileOverview user={user} />} />
            <Route path="/details" element={<ProfileDetails user={user} />} />
            <Route path="/settings" element={<ProfileSettings user={user} />} />
            <Route path="*" element={<Navigate to="/profile" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Profile Overview Component (default nested route)
const ProfileOverview = ({ user }) => {
  return (
    <div className="profile-overview">
      <h3>Profile Overview</h3>
      <div className="user-info">
        <div className="info-item">
          <strong>Name:</strong> {user?.name || 'Not available'}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {user?.email || 'Not available'}
        </div>
        <div className="info-item">
          <strong>User ID:</strong> {user?.id || 'Not available'}
        </div>
      </div>
      <p>This is the default nested route. Use the navigation above to explore other sections.</p>
    </div>
  );
};

export default Profile;
