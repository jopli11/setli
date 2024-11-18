// server/server.js
require('dotenv').config();
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
    try {
      // Your existing logic to call the Google API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.lat},${req.query.lng}&radius=${req.query.radius}&type=${req.query.type}&key=${process.env.GOOGLE_API_KEY}`
      );
  
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data from the Google API' });
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error in /api/nearby:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
