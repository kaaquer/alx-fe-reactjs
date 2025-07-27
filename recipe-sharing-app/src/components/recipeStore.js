import { create } from 'zustand'

const useRecipeStore = create(set => ({
  recipes: [],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  updateRecipe: (recipeId, updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  setRecipes: (recipes) => set({ recipes })
}));

export default useRecipeStore; 