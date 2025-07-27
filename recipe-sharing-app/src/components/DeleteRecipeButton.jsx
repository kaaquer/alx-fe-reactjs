import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/');
  };

  if (!showConfirmation) {
    return (
      <button 
        onClick={() => setShowConfirmation(true)} 
        className="delete-button"
      >
        Delete Recipe
      </button>
    );
  }

  return (
    <div className="delete-confirmation">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
      <div className="confirmation-actions">
        <button 
          onClick={handleDelete} 
          className="confirm-delete-button"
        >
          Yes, Delete
        </button>
        <button 
          onClick={() => setShowConfirmation(false)} 
          className="cancel-delete-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRecipeButton; 