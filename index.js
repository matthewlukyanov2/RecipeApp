const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
require('dotenv').config(); 

const app = express(); // Initialize Express
const PORT = process.env.PORT || 4000; // Set the server port

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api', recipeRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // Start the server 
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }) 
    .catch(err => console.log(err));


