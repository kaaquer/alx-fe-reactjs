const ProfileDetails = ({ user }) => {
  return (
    <div className="profile-details">
      <h3>Profile Details</h3>
      <p>This is a nested route showing detailed user information.</p>
      
      <div className="details-section">
        <h4>Personal Information</h4>
        <div className="detail-item">
          <label>Full Name:</label>
          <span>{user?.name || 'Not available'}</span>
        </div>
        <div className="detail-item">
          <label>Email Address:</label>
          <span>{user?.email || 'Not available'}</span>
        </div>
        <div className="detail-item">
          <label>User ID:</label>
          <span>{user?.id || 'Not available'}</span>
        </div>
        <div className="detail-item">
          <label>Account Status:</label>
          <span className="status-active">Active</span>
        </div>
      </div>

      <div className="details-section">
        <h4>Account Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Posts Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">127</div>
            <div className="stat-label">Comments Made</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">89</div>
            <div className="stat-label">Likes Received</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">30</div>
            <div className="stat-label">Days Active</div>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h4>Recent Activity</h4>
        <ul className="activity-list">
          <li>Updated profile picture - 2 days ago</li>
          <li>Posted a new blog article - 1 week ago</li>
          <li>Commented on "React Router Tutorial" - 1 week ago</li>
          <li>Liked "Advanced React Patterns" - 2 weeks ago</li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;
