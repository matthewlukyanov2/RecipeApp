const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');  // Import the Recipe model

// POST route to create a new recipe
router.post('/recipes', async (req, res) => {
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const cookingTime = req.body.cookingTime;

    try {
        // Create a new Recipe instance
        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            cookingTime,
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
        const recipes = await Recipe.find(); // Fetch recipes from MongoDB
        res.status(200).json(recipes); // Return the fetched recipes
    } catch (err) {
        console.error(err);
        res.status(400).send('Error fetching recipes');
    }
});



module.exports = router;
