import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [image, setImage] = useState(''); 


    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
          title,
          ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
          instructions,
          cookingTime: parseInt(cookingTime),
          image
        };

        axios.post('http://localhost:4000/api/recipes', newRecipe)
        .then(response => {
          console.log('Recipe added:', response.data);
          //reset the form fields after a successful submission
          setTitle('');
          setIngredients('');
          setInstructions('');
          setCookingTime('');
          setImage(''); 
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
        });
    };

    return (
        <div>
          <h2>Add a New Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>
            <div>
              <label>Ingredients (comma separated)</label>
              <input 
                type="text" 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
                required
              />
            </div>
            <div>
              <label>Instructions</label>
              <textarea 
                value={instructions} 
                onChange={(e) => setInstructions(e.target.value)} 
                required
              />
            </div>
            <div>
              <label>Cooking Time (minutes)</label>
              <input 
                type="number" 
                value={cookingTime} 
                onChange={(e) => setCookingTime(e.target.value)} 
                required
              />
            </div>
            <div>
              <label>Image URL</label> 
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <button type="submit">Add Recipe</button>
          </form>
        </div>
      );
    };
    
    export default AddRecipe;



