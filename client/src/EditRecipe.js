import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecipe = ({ recipeId, onCancel, onUpdate }) => {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/recipes/${recipeId}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe:', error));
    }, [recipeId]);
}
