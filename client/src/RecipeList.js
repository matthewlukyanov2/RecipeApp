import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);  // State to store recipes
    const [loading, setLoading] = useState(true); 
}  

// Fetch recipes from the API
useEffect(() => {
    axios.get('http://localhost:4000/api/recipes')
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);



export default RecipeList;