import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  // Recipe management actions
  addRecipe: (newRecipe) => set(state => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  updateRecipe: (recipeId, updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === recipeId ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (recipeId) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId)
  })),
  setRecipes: (recipes) => set({ recipes }),
  
  // Search and filtering actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },
  
  filterRecipes: () => {
    const state = get();
    const filtered = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },
  
  // Initialize filtered recipes when recipes change
  initializeFilteredRecipes: () => {
    const state = get();
    set({ filteredRecipes: state.recipes });
  }
}));

export default useRecipeStore; 