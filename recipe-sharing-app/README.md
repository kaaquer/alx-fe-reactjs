# Recipe Sharing Application

A modern React application for sharing and discovering recipes, built with Zustand for state management and React Router for navigation.

## Features

- **Add Recipes**: Simple form to add new recipes with title and description
- **View Recipes**: Display all added recipes in a clean, card-based layout
- **Recipe Details**: Click on any recipe to view its detailed information
- **Edit Recipes**: Modify existing recipes with an inline edit form
- **Delete Recipes**: Remove recipes with confirmation dialog
- **State Management**: Uses Zustand for efficient state management
- **Routing**: React Router for seamless navigation between views
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **React 18**: Latest React with hooks and modern features
- **React Router DOM**: Client-side routing for navigation
- **Vite**: Fast build tool and development server
- **Zustand**: Lightweight state management library
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
recipe-sharing-app/
├── src/
│   ├── components/
│   │   ├── AddRecipeForm.jsx    # Form component for adding recipes
│   │   ├── RecipeList.jsx       # Component to display recipes
│   │   ├── RecipeDetails.jsx    # Detailed view of a single recipe
│   │   ├── EditRecipeForm.jsx   # Form for editing existing recipes
│   │   ├── DeleteRecipeButton.jsx # Button for deleting recipes
│   │   └── recipeStore.js       # Zustand store configuration
│   ├── App.jsx                  # Main application component with routing
│   ├── App.css                  # Application styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Application entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe-sharing-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding a Recipe

1. Fill in the "Recipe Title" field with your recipe name
2. Add a description in the "Recipe Description" field
3. Click "Add Recipe" to save it to the application

### Viewing Recipes

All added recipes are automatically displayed in the right panel of the application. Each recipe shows:
- Recipe title
- Recipe description
- Click hint to view details

### Viewing Recipe Details

1. Click on any recipe card to navigate to its detailed view
2. The recipe details page shows the full recipe information
3. Use the "Back to Recipes" button to return to the main page

### Editing a Recipe

1. Navigate to the recipe details page
2. Click the "Edit Recipe" button
3. Modify the title and/or description
4. Click "Save Changes" to update the recipe
5. Click "Cancel" to discard changes

### Deleting a Recipe

1. Navigate to the recipe details page
2. Click the "Delete Recipe" button
3. Confirm the deletion in the confirmation dialog
4. The recipe will be removed and you'll be redirected to the main page

## State Management with Zustand

The application uses Zustand for state management, providing:

- **Simple API**: Easy to use and understand
- **Lightweight**: Minimal bundle size impact
- **TypeScript Support**: Full TypeScript support (if needed)
- **DevTools**: Built-in Redux DevTools support

### Store Structure

```javascript
const useRecipeStore = create(set => ({
  recipes: [],                                    // Array of recipe objects
  addRecipe: (newRecipe) => {},                  // Function to add new recipe
  updateRecipe: (recipeId, updatedRecipe) => {}, // Function to update recipe
  deleteRecipe: (recipeId) => {},                // Function to delete recipe
  setRecipes: (recipes) => {}                    // Function to set all recipes
}));
```

## Routing

The application uses React Router for navigation:

- `/` - Home page with recipe list and add form
- `/recipe/:recipeId` - Individual recipe details page

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- Recipe categories and tags
- Search and filter functionality
- Recipe ratings and reviews
- Image upload for recipes
- User authentication
- Recipe sharing via social media
- Print-friendly recipe cards
- Recipe ingredients and instructions
- Cooking time and difficulty level
- Recipe favorites and collections
