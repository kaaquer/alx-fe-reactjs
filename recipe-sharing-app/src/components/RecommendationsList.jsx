import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);
  const initializeRecommendations = useRecipeStore(state => state.initializeRecommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);

  // Initialize recommendations when component mounts or when recipes/favorites change
  useEffect(() => {
    initializeRecommendations();
  }, [recipes, favorites, initializeRecommendations]);

  const handleRefreshRecommendations = () => {
    generateRecommendations();
  };

  return (
    <div className="recommendations-list">
      <div className="recommendations-header">
        <h2>🎯 Recommended for You</h2>
        <button 
          onClick={handleRefreshRecommendations}
          className="refresh-recommendations-button"
          title="Get new recommendations"
        >
          🔄 Refresh
        </button>
      </div>
      
      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <p>No recommendations available yet.</p>
          <p>Add some recipes to your favorites to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <Link 
              key={recipe.id} 
              to={`/recipe/${recipe.id}`}
              className="recommendation-recipe-link"
            >
              <div className="recommendation-recipe-card">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <div className="recommendation-footer">
                  <span className="recommendation-badge">🎯 Recommended</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="recommendations-info">
        <p>
          <small>
            💡 Recommendations are based on your favorite recipes and browsing patterns.
          </small>
        </p>
      </div>
    </div>
  );
};

export default RecommendationsList; 