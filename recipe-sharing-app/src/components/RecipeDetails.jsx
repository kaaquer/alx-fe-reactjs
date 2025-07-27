import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(recipeId))
  );

  if (!recipe) {
    return (
      <div className="recipe-details">
        <div className="error-message">
          <h2>Recipe Not Found</h2>
          <p>The recipe you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Recipes
        </button>
        <h1>{recipe.title}</h1>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-info">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>
        
        <div className="recipe-actions">
          <EditRecipeForm recipe={recipe} />
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails; 