import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const navigate = useNavigate();

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="recipe-card"
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div className="recipe-card-footer">
                <span className="click-hint">Click to view details</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList; 