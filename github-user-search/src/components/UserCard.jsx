import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="user-card" onClick={handleCardClick}>
      <div className="user-avatar">
        <img src={user.avatar_url} alt={`${user.login} avatar`} />
      </div>
      <div className="user-info">
        <h3 className="user-name">{user.login}</h3>
        {user.name && <p className="user-full-name">{user.name}</p>}
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          {user.public_repos !== undefined && (
            <span className="stat">
              <strong>{user.public_repos}</strong> repos
            </span>
          )}
          {user.followers !== undefined && (
            <span className="stat">
              <strong>{user.followers}</strong> followers
            </span>
          )}
          {user.following !== undefined && (
            <span className="stat">
              <strong>{user.following}</strong> following
            </span>
          )}
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          onClick={(e) => e.stopPropagation()}
        >
          View Profile on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard; 