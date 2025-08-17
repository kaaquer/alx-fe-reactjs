import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🍳 Recipe Sharing App</h1>
          <p>Share and discover delicious recipes with Zustand state management</p>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={
              <div className="home-page">
                <div className="left-panel">
                  <AddRecipeForm />
                  <FavoritesList />
                </div>
                <div className="right-panel">
                  <SearchBar />
                  <RecommendationsList />
                  <RecipeList />
                </div>
              </div>
            } />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
