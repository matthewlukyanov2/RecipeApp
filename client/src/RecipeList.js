import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditRecipe from './EditRecipe';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);  // State to store recipes
  const [loading, setLoading] = useState(true); // Loading state to show when fetching data
  const [editingRecipe, setEditingRecipe] = useState(null); // Edit form to edit any recipe

  // Fetch recipes from the API
  useEffect(() => {
    fetchRecipes();
    }, []);

    const fetchRecipes = () => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        
      });
  };


  const deleteRecipe = (id) => {
    axios.delete(`http://localhost:4000/api/recipes/${id}`)
            .then(() => {
                console.log(`Recipe with id ${id} deleted`);
                setRecipes(recipes.filter(recipe => recipe._id !== id)); // Update UI by removing deleted recipe
            })
            .catch(error => {
                console.error("Error deleting recipe:", error);
            });
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
    setEditingRecipe(null);
  };

  // Ensure return is inside the function
  if (loading) {
    return <div>Loading recipes...</div>;
  }


  return (
    <div className="container mt-4">
      <h1>Recipe List</h1>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe._id}>
              <h3>{recipe.title}</h3>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
              <button onClick={() => setEditingRecipe(recipe)}>Edit</button>
              <button onClick={() => deleteRecipe(recipe._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
      {/* Conditionally render EditRecipe */}
      {editingRecipe && (
        <EditRecipe
          recipeId={editingRecipe._id}
          onCancel={() => setEditingRecipe(null)} 
          onUpdate={handleUpdate} 
        />
      )}

    </div>
  );
};

export default RecipeList;
