const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');  // Import the Recipe model

// POST route to create a new recipe
router.post('/recipes', async (req, res) => {
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const cookingTime = req.body.cookingTime;
    const image = req.body.image;

    try {
        // Create a new Recipe instance
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            cookingTime,
            image,
        });

        // Save the new recipe to the database
        await newRecipe.save();

        // Send the created recipe as the response
        res.status(201).json(newRecipe);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error saving recipe");
  }
});

// GET route to fetch all recipes
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); 
        res.status(200).json(recipes); 
    } catch (err) {
        console.error(err);
        res.status(400).send('Error fetching recipes');
    }
});

// GET route to fetch a specific recipe by ID
router.get('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        const recipe = await Recipe.findById(id); // Find the recipe by ID

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe); // Return the recipe data
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT route to update a recipe
router.put('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the recipe ID from the URL
        const updatedData = req.body; // Get the updated recipe data from the request body

        // Find the recipe by ID and update it
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated recipe after the update
            runValidators: true, // Ensure data validation
        });

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(updatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE route to delete a recipe
router.delete('/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters
        const deletedRecipe = await Recipe.findByIdAndDelete(id); // Find and delete the recipe by ID

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
