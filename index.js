const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
require('dotenv').config(); // Allows us to use the `.env` file

const app = express(); // Initialize Express
const PORT = process.env.PORT || 4000; // Set the server port

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api', recipeRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server after successful database connection
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }) 
    .catch(err => console.log(err));


