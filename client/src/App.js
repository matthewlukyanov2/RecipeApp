import logo from './logo.svg';
import './App.css';
import RecipeList from './RecipeList';

function App() {
  return (
    <div className="App">
       <header className="App-header">
        <h1>Welcome to the Recipe App</h1>
      </header>
      <main>
        <RecipeList /> {/* Render the RecipeList component */}
      </main>
    </div>
  );
}

export default App;
