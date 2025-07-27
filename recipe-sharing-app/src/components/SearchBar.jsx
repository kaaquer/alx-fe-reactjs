import { useState, useEffect } from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const searchTerm = useRecipeStore(state => state.searchTerm);

  // Debounce search to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Search recipes by title or description..."
          className="search-input"
        />
        {localSearchTerm && (
          <button 
            onClick={handleClearSearch}
            className="clear-search-button"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-info">
          <span>Searching for: "{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 