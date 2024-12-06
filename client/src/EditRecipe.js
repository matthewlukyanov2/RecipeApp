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

    return (
        <div className="edit-recipe">
            <h2>Edit Recipe</h2>
            <input
                type="text"
                value={recipe.title}
                onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            />
            <input
                type="text"
                value={recipe.ingredients.join(', ')}
                onChange={(e) =>
                    setRecipe({
                        ...recipe,
                        ingredients: e.target.value.split(',').map(i => i.trim()),
                    })
                }
            />
            <textarea
                value={recipe.instructions}
                onChange={(e) =>
                    setRecipe({ ...recipe, instructions: e.target.value })
                }
            />
            <input
                type="number"
                value={recipe.cookingTime}
                onChange={(e) =>
                    setRecipe({ ...recipe, cookingTime: parseInt(e.target.value) })
                }
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditRecipe;

