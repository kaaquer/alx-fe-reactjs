import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const searchTerm = useRecipeStore(state => state.searchTerm);
  const initializeFilteredRecipes = useRecipeStore(state => state.initializeFilteredRecipes);
  const navigate = useNavigate();

  // Initialize filtered recipes when component mounts or recipes change
  useEffect(() => {
    initializeFilteredRecipes();
  }, [recipes, initializeFilteredRecipes]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const displayRecipes = searchTerm ? filteredRecipes : recipes;
  const isSearching = searchTerm && searchTerm.trim() !== '';

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      
      {isSearching && (
        <div className="search-results-info">
          <p>
            {filteredRecipes.length === 0 
              ? `No recipes found for "${searchTerm}"`
              : `Found ${filteredRecipes.length} recipe${filteredRecipes.length === 1 ? '' : 's'} for "${searchTerm}"`
            }
          </p>
        </div>
      )}
      
      {displayRecipes.length === 0 ? (
        <div className="no-recipes">
          {isSearching ? (
            <p>No recipes match your search criteria. Try a different search term.</p>
          ) : (
            <p>No recipes yet. Add your first recipe!</p>
          )}
        </div>
      ) : (
        <div className="recipes-grid">
          {displayRecipes.map(recipe => (
            <Link 
              key={recipe.id} 
              to={`/recipe/${recipe.id}`}
              className="recipe-card-link"
            >
              <div className="recipe-card">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recipe-card-footer">
                  <span className="click-hint">Click to view details</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList; 