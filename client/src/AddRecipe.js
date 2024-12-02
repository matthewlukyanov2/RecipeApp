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
}

