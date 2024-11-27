const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');  // Import the Recipe model

// POST route to create a new recipe
router.post('/recipes', async (req, res) => {
    const title = req.body.title;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const cookingTime = req.body.cookingTime;

    res.status(200).send("POST route setup for creating recipes");
});

module.exports = router;
