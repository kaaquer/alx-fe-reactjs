import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      updateRecipe(recipe.id, {
        title: title.trim(),
        description: description.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)} 
        className="edit-button"
      >
        Edit Recipe
      </button>
    );
  }

  return (
    <div className="edit-recipe-form">
      <h3>Edit Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit-title">Recipe Title:</label>
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-description">Recipe Description:</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter recipe description"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm; 