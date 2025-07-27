import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => state.favorites);
  const recipes = useRecipeStore(state => state.recipes);
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  // Get favorite recipes by filtering recipes array
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  const handleRemoveFavorite = (e, recipeId) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    removeFavorite(recipeId);
  };

  return (
    <div className="favorites-list">
      <h2>❤️ My Favorites</h2>
      
      {favoriteRecipes.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any favorites yet.</p>
          <p>Click the heart icon on any recipe to add it to your favorites!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favoriteRecipes.map(recipe => (
            <Link 
              key={recipe.id} 
              to={`/recipe/${recipe.id}`}
              className="favorite-recipe-link"
            >
              <div className="favorite-recipe-card">
                <div className="favorite-header">
                  <h3>{recipe.title}</h3>
                  <button
                    onClick={(e) => handleRemoveFavorite(e, recipe.id)}
                    className="remove-favorite-button"
                    title="Remove from favorites"
                  >
                    ❌
                  </button>
                </div>
                <p>{recipe.description}</p>
                <div className="favorite-footer">
                  <span className="favorite-badge">❤️ Favorite</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList; 