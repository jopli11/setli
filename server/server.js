require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to fetch paginated results
const fetchAllPages = async (params) => {
  let allResults = [];
  let nextPageToken = null;

  do {
    if (nextPageToken) {
      params.pagetoken = nextPageToken;
      console.log('Waiting for next_page_token...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
    }

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, { params });
      console.log(`Fetched page with URL: ${response.config.url}`);
      const data = response.data;

      if (data.results.length === 0) {
        console.warn('No results found on this page.');
        break;
      }

      allResults = [...allResults, ...data.results];
      nextPageToken = data.next_page_token || null;
      console.log(`Fetched ${data.results.length} results. Total so far: ${allResults.length}`);
    } catch (error) {
      console.error('Error fetching results:', error.response?.data || error.message);
      nextPageToken = null;
    }
  } while (nextPageToken && allResults.length < 60);

  return allResults;
};

// Route to handle nearby search requests
app.get('/api/nearby', async (req, res) => {
  console.log('Received request to /api/nearby with params:', req.query);

  try {
    const params = {
      location: `${req.query.lat},${req.query.lng}`,
      radius: req.query.radius || 10000, // Default 10 km radius
      type: req.query.type,
      key: process.env.GOOGLE_API_KEY,
    };

    const results = await fetchAllPages(params);
    console.log('Total results fetched:', results.length);
    res.json({ results });
  } catch (error) {
    console.error('Error in /api/nearby:', error.response?.data || error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
