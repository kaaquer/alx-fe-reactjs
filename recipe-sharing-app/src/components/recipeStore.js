import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
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
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
    favorites: state.favorites.filter(id => id !== recipeId)
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
  },

  // Favorites management actions
  addFavorite: (recipeId) => set(state => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  toggleFavorite: (recipeId) => set(state => {
    const isFavorite = state.favorites.includes(recipeId);
    if (isFavorite) {
      return { favorites: state.favorites.filter(id => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),

  // Recommendations actions
  generateRecommendations: () => {
    const state = get();
    const favoriteRecipes = state.recipes.filter(recipe => 
      state.favorites.includes(recipe.id)
    );
    
    // Simple recommendation logic based on favorites
    let recommended = [];
    
    if (favoriteRecipes.length > 0) {
      // Get recipes that are not in favorites
      const nonFavoriteRecipes = state.recipes.filter(recipe => 
        !state.favorites.includes(recipe.id)
      );
      
      // Simple recommendation: show some non-favorite recipes
      // In a real app, this would use more sophisticated algorithms
      recommended = nonFavoriteRecipes
        .sort(() => 0.5 - Math.random()) // Shuffle
        .slice(0, Math.min(3, nonFavoriteRecipes.length)); // Take up to 3
    } else {
      // If no favorites, show random recipes
      recommended = state.recipes
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.min(3, state.recipes.length));
    }
    
    set({ recommendations: recommended });
  },

  // Initialize recommendations when component mounts
  initializeRecommendations: () => {
    get().generateRecommendations();
  }
}));

export default useRecipeStore; 