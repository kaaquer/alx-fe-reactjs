import { useState } from 'react';
import Search from './components/Search';
import ApiTest from './components/ApiTest';
import './App.css';

function App() {
  const [searched, setSearched] = useState(false);

  const handleSearch = (query) => {
    setSearched(true);
    console.log('Search performed for:', query);
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
        
        {searched && (
          <div className="search-info">
            <p>Search functionality is now handled by the Search component</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
