import logo from './logo.svg';
import './App.css';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';

function App() {
  return (
    <div className="App">
       <header className="App-header">
       <h1>Recipe App</h1>
        {/* AddRecipe Component */}
        <AddRecipe />
        {/* RecipeList Component */}
        <RecipeList />
      </header>
    </div>
  );
}

export default App;
