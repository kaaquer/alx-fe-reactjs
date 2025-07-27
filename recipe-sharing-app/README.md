# Recipe Sharing Application

A modern React application for sharing and discovering recipes, built with Zustand for state management.

## Features

- **Add Recipes**: Simple form to add new recipes with title and description
- **View Recipes**: Display all added recipes in a clean, card-based layout
- **State Management**: Uses Zustand for efficient state management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **React 18**: Latest React with hooks and modern features
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
│   │   └── recipeStore.js       # Zustand store configuration
│   ├── App.jsx                  # Main application component
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

## State Management with Zustand

The application uses Zustand for state management, providing:

- **Simple API**: Easy to use and understand
- **Lightweight**: Minimal bundle size impact
- **TypeScript Support**: Full TypeScript support (if needed)
- **DevTools**: Built-in Redux DevTools support

### Store Structure

```javascript
const useRecipeStore = create(set => ({
  recipes: [],                    // Array of recipe objects
  addRecipe: (newRecipe) => {},   // Function to add new recipe
  setRecipes: (recipes) => {}     // Function to set all recipes
}));
```

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
