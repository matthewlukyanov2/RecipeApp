import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecipe = ({ recipeId, onCancel, onUpdate }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
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
}
