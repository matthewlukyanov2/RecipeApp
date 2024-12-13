import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditRecipe from './EditRecipe';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // Loading state to show when fetching data
  const [error, setError] = useState(null); // Error state to handle fetch failures
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
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);
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

  // Show error message if fetch fails
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading recipes...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Recipe List</h1>

      {/* Recipe List Grid */}
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <div className="card shadow-sm">
                {/* Image with fallback error*/}
                <img
                  src={recipe.image || "https://via.placeholder.com/150"} // Default if no image URL
                  alt={recipe.title || "Recipe Image"}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => e.target.src = "https://via.placeholder.com/150"} 
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                  <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-primary"
                      onClick={() => setEditingRecipe(recipe)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteRecipe(recipe._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

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
