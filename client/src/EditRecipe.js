import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecipe = ({ recipeId, onCancel, onUpdate }) => {
    // State to store the recipe data when fetched from the backend
    const [recipe, setRecipe] = useState(null);

     // Fetch the recipe data when recipeId changes
    useEffect(() => {
        console.log('Editing recipe ID:', recipeId); // Debugging
        axios.get(`http://localhost:4000/api/recipes/${recipeId}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe:', error));
    }, [recipeId]);

    // Handle save operation for the edited recipe
    const handleSave = () => {
        axios.put(`http://localhost:4000/api/recipes/${recipeId}`, recipe)
            .then(response => {
                console.log('Recipe updated:', response.data);
                onUpdate(response.data); 
            })
            .catch(error => console.error('Error updating recipe:', error));
    };

    // Show loading message if recipe data is not yet loaded
    if (!recipe) return <div>Loading...</div>;

    //test
    return (
        <div className="container mt-4">
      <h2 className="text-center">Edit Recipe</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <input
            type="text"
            className="form-control"
            value={recipe.ingredients.join(', ')}
            onChange={(e) =>
              setRecipe({
                ...recipe,
                ingredients: e.target.value.split(',').map((i) => i.trim()),
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            value={recipe.instructions}
            onChange={(e) =>
              setRecipe({ ...recipe, instructions: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cooking Time</label>
          <input
            type="number"
            className="form-control"
            value={recipe.cookingTime}
            onChange={(e) =>
              setRecipe({
                ...recipe,
                cookingTime: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={handleSave}
        >
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;

