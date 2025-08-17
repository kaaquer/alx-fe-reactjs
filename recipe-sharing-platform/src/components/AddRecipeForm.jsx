import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else if (ingredients.split('\n').length < 2) {
      newErrors.ingredients = 'Please enter at least two ingredients.';
    }
    if (!steps.trim()) newErrors.steps = 'Preparation steps are required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }
    setErrors({});
    setSuccess(true);
    // Here you would handle posting the new recipe to a backend or updating state
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg md:max-w-2xl md:p-12"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Recipe</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="title">Recipe Title</label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium" htmlFor="steps">Preparation Steps (one per line)</label>
          <textarea
            id="steps"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
        >
          Submit Recipe
        </button>
        {success && (
          <p className="text-green-600 text-center mt-4">Recipe submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddRecipeForm;
