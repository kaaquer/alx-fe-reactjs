import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId, size = 'medium' }) => {
  const favorites = useRecipeStore(state => state.favorites);
  const toggleFavorite = useRecipeStore(state => state.toggleFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation if used inside a link
    e.stopPropagation(); // Prevent event bubbling
    toggleFavorite(recipeId);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`favorite-button ${size} ${isFavorite ? 'favorited' : ''}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton; 