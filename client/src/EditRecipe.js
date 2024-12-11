import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecipe = ({ recipeId, onCancel, onUpdate }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        console.log('Editing recipe ID:', recipeId); // Debugging
        axios.get(`http://localhost:4000/api/recipes/${recipeId}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe:', error));
    }, [recipeId]);

    const handleSave = () => {
        axios.put(`http://localhost:4000/api/recipes/${recipeId}`, recipe)
            .then(response => {
                console.log('Recipe updated:', response.data);
                onUpdate(response.data); 
            })
            .catch(error => console.error('Error updating recipe:', error));
    };

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

