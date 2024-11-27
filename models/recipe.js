const mongoose = require('mongoose');

// Defining schema for my recipe app
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },          // Recipe title
    ingredients: { type: [String], required: true },  // List of ingredients
    instructions: { type: String, required: true },   // Cooking instructions
    cookingTime: { type: Number, required: true },    // Cooking time in minutes
    createdAt: { type: Date, default: Date.now }      // Time for recipe creation
});

// Create and export the Recipe model
const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;