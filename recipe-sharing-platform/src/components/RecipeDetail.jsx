import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((r) => r.id === Number(id));
        setRecipe(found);
      });
  }, [id]);

  if (!recipe) {
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;
  }

  // Mock ingredients and instructions for demonstration
  const ingredients = recipe.ingredients || [
    'Ingredient 1',
    'Ingredient 2',
    'Ingredient 3',
  ];
  const instructions = recipe.instructions || [
    'Step 1: Do something.',
    'Step 2: Do something else.',
    'Step 3: Finish up.',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{recipe.title}</h1>
        <p className="text-gray-700 mb-4">{recipe.summary}</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700">
            {instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        <Link to="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Back to Home</Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
