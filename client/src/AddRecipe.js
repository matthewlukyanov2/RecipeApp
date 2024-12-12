import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
          <form onSubmit={handleSubmit}>
          <h2>Add a New Recipe</h2>       
            <div>
              <label htmlFor="title">Title</label>
              <input 
                id="title"
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>
            <div>
              <label htmlFor="ingredients">Ingredients (comma separated)</label>
              <input 
                id="ingredients"
                type="text" 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
                required
              />
            </div>
            <div>
              <label htmlFor="instructions">Instructions</label>
              <textarea 
                id="instructions"
                value={instructions} 
                onChange={(e) => setInstructions(e.target.value)} 
                required
              />
            </div>
            <div>
              <label htmlFor="cookingTime">Cooking Time (minutes)</label>
              <input 
                id="cookingTime"
                type="number" 
                value={cookingTime} 
                onChange={(e) => setCookingTime(e.target.value)} 
                required
              />
            </div>
            <div>
              <label htmlFor="image">Image URL</label> 
              <input
                id="image"
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



