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

// Function to fetch all pages of results
const fetchAllPages = async (params) => {
  let allResults = [];
  let nextPageToken = null;

  do {
    if (nextPageToken) {
      params.pagetoken = nextPageToken; // Add next_page_token to the params
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for the token to become valid (Google's requirement)
    }

    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, { params });
    const data = response.data;
    allResults = [...allResults, ...data.results];
    nextPageToken = data.next_page_token || null;
  } while (nextPageToken && allResults.length < 60); // Limit results to 60 (API limit)

  return allResults;
};

// Route to handle nearby search requests
app.get('/api/nearby', async (req, res) => {
  console.log('Received request to /api/nearby with params:', req.query);

  try {
    const params = {
      location: req.query.location,
      radius: req.query.radius || 10000, // Default radius is 10 km
      type: req.query.type,
      key: process.env.GOOGLE_API_KEY,
    };

    const results = await fetchAllPages(params);
    console.log('Fetched results:', results.length);
    res.json({ results });
  } catch (error) {
    console.error('Error in /api/nearby:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
