import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [cookingTime, setCookingTime] = useState('');
}

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
          title,
          ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
          instructions,
          cookingTime: parseInt(cookingTime)
        };

        axios.post('http://localhost:4000/api/recipes', newRecipe)
        .then(response => {
          console.log('Recipe added:', response.data);
          //reset the form fields after a successful submission
          setTitle('');
          setIngredients('');
          setInstructions('');
          setCookingTime('');
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
        });
    };



