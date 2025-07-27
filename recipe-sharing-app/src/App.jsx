import './App.css'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🍳 Recipe Sharing App</h1>
        <p>Share and discover delicious recipes with Zustand state management</p>
      </header>
      
      <main className="app-main">
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  )
}

export default App
