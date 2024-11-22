// server/server.js
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle nearby search requests
app.get('/api/nearby', async (req, res) => {
  console.log('Received request to /api/nearby with params:', req.query);
  try {
    const radius = req.query.radius || 10000; // Default radius is 10 km
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${req.query.lat},${req.query.lng}`,
        radius,
        type: req.query.type,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    console.log('Response from Google API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error in /api/nearby:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
