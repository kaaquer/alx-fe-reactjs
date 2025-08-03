import React, { useState } from 'react';
import { githubService } from '../services/githubService';
import './Search.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      setLoading(true);
      setError(null);
      
      try {
        const result = await githubService.searchUsers(query.trim());
        setUsers(result.items || []);
        if (onSearch) {
          onSearch(query.trim());
        }
      } catch (err) {
        setError('Failed to search users. Please try again.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub users..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>

      {/* Display search results */}
      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && users.length === 0 && query && (
        <div className="no-results">
          <p>Looks like we cant find the user</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="search-results">
          <h3>Search Results ({users.length} users found)</h3>
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item">
                <img 
                  src={user.avatar_url} 
                  alt={`${user.login} avatar`} 
                  className="user-avatar"
                />
                <div className="user-info">
                  <h4 className="user-login">{user.login}</h4>
                  {user.name && <p className="user-name">{user.name}</p>}
                  <a 
                    href={user.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="user-link"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search; 