import { useState } from 'react';
import Search from './components/Search';
import UserCard from './components/UserCard';
import ApiTest from './components/ApiTest';
import { githubService } from './services/githubService';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const result = await githubService.searchUsers(query);
      setUsers(result.items || []);
    } catch (err) {
      setError('Failed to search users. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (username) => {
    try {
      // Demonstrate the fetchUserData function
      const userData = await githubService.fetchUserData(username);
      console.log('Fetched user data:', userData);
      // You could open the user's GitHub profile or show more details
      window.open(userData.html_url, '_blank');
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>

      <main className="app-main">
        <ApiTest />
        <Search onSearch={handleSearch} />
        
        {loading && (
          <div className="loading">
            <p>Searching for users...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && searched && users.length === 0 && (
          <div className="no-results">
            <p>No users found. Try a different search term.</p>
          </div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="results">
            <h2>Search Results ({users.length} users found)</h2>
            <div className="users-grid">
              {users.map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onClick={() => handleUserClick(user.login)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
