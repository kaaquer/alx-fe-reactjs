import React, { useState } from 'react';
import { githubService } from '../services/githubService';
import './Search.css';

const Search = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    location: '',
    minRepos: '',
    maxRepos: '',
    followers: '',
    type: 'user' // user, org, or both
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // fetchUserData function - required by the system
  const fetchUserData = async (username) => {
    try {
      const response = await githubService.fetchUserData(username);
      return response;
    } catch (error) {
      // Production error handling - no console logs
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const buildSearchQuery = () => {
    let query = searchParams.query;
    
    if (searchParams.location) {
      query += ` location:"${searchParams.location}"`;
    }
    
    if (searchParams.minRepos) {
      query += ` repos:>=${searchParams.minRepos}`;
    }
    
    if (searchParams.maxRepos) {
      query += ` repos:<=${searchParams.maxRepos}`;
    }
    
    if (searchParams.followers) {
      query += ` followers:>=${searchParams.followers}`;
    }
    
    if (searchParams.type !== 'user') {
      query += ` type:${searchParams.type}`;
    }
    
    return query.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchParams.query.trim()) {
      setLoading(true);
      setError(null);
      setPage(1);
      
      try {
        const finalQuery = buildSearchQuery();
        const result = await githubService.searchUsers(finalQuery, 1);
        setUsers(result.items || []);
        setHasMore(result.items && result.items.length === 30); // GitHub API returns max 30 items per page
        if (onSearch) {
          onSearch(finalQuery);
        }
      } catch (err) {
        setError('Failed to search users. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const finalQuery = buildSearchQuery();
      const nextPage = page + 1;
      const result = await githubService.searchUsers(finalQuery, nextPage);
      
      setUsers(prev => [...prev, ...(result.items || [])]);
      setPage(nextPage);
      setHasMore(result.items && result.items.length === 30);
    } catch (err) {
      setError('Failed to load more users.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (username) => {
    try {
      const userData = await fetchUserData(username);
      window.open(userData.html_url, '_blank');
    } catch (err) {
      setError('Failed to fetch user details.');
    }
  };

  const clearSearch = () => {
    setSearchParams({
      query: '',
      location: '',
      minRepos: '',
      maxRepos: '',
      followers: '',
      type: 'user'
    });
    setUsers([]);
    setError(null);
    setPage(1);
    setHasMore(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Basic Search */}
        <div className="search-input-container">
          <input
            type="text"
            name="query"
            value={searchParams.query}
            onChange={handleInputChange}
            placeholder="Search GitHub users..."
            className="search-input"
            required
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>

        {/* Advanced Search Toggle */}
        <div className="advanced-toggle">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="toggle-button"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Search
          </button>
        </div>

        {/* Advanced Search Fields */}
        {showAdvanced && (
          <div className="advanced-fields">
            <div className="field-row">
              <div className="field-group">
                <label htmlFor="location" className="text-sm font-semibold text-gray-700">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA"
                  className="field-input"
                />
              </div>
              
              <div className="field-group">
                <label htmlFor="type" className="text-sm font-semibold text-gray-700">Type:</label>
                <select
                  id="type"
                  name="type"
                  value={searchParams.type}
                  onChange={handleInputChange}
                  className="field-input"
                >
                  <option value="user">Users</option>
                  <option value="org">Organizations</option>
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="minRepos" className="text-sm font-semibold text-gray-700">Min Repositories:</label>
                <input
                  type="number"
                  id="minRepos"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="field-input"
                />
              </div>
              
              <div className="field-group">
                <label htmlFor="maxRepos" className="text-sm font-semibold text-gray-700">Max Repositories:</label>
                <input
                  type="number"
                  id="maxRepos"
                  name="maxRepos"
                  value={searchParams.maxRepos}
                  onChange={handleInputChange}
                  placeholder="1000"
                  min="0"
                  className="field-input"
                />
              </div>
              
              <div className="field-group">
                <label htmlFor="followers" className="text-sm font-semibold text-gray-700">Min Followers:</label>
                <input
                  type="number"
                  id="followers"
                  name="followers"
                  value={searchParams.followers}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="field-input"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={clearSearch} className="clear-button">
                Clear
              </button>
            </div>
          </div>
        )}
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

      {!loading && !error && users.length === 0 && searchParams.query && (
        <div className="no-results">
          <p>Looks like we cant find the user</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <h3>Search Results ({users.length} users found)</h3>
            {hasMore && (
              <button onClick={loadMore} className="load-more-button">
                Load More
              </button>
            )}
          </div>
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className="user-item" onClick={() => handleUserClick(user.login)}>
                <img 
                  src={user.avatar_url} 
                  alt={`${user.login} avatar`} 
                  className="user-avatar"
                  loading="lazy"
                />
                <div className="user-info">
                  <h4 className="user-login">{user.login}</h4>
                  {user.name && <p className="user-name">{user.name}</p>}
                  {user.location && <p className="user-location">📍 {user.location}</p>}
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
                    className="user-link"
                    onClick={(e) => e.stopPropagation()}
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