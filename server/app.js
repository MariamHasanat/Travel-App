const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../dist'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// API Keys
const PIXABAY_API_KEY = '49139632-d0fe9d9972f457673f34bcd58';
const WEATHERBIT_API_KEY = '4cf82283c9854c67b66becb2120cbd8c';
const GEONAMES_USERNAME = 'mariam_hasanat';

// Geonames API - Get location details
app.get('/geonames', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GEONAMES_USERNAME}`);
        const { geonames } = response.data;
        if (geonames.length > 0) {
            res.json({
                lat: geonames[0].lat,
                lng: geonames[0].lng,
                country: geonames[0].countryName
            });
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Geonames API' });
    }
});

// Weatherbit API - Get weather details
app.get('/weather', async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Weatherbit API' });
    }
});

// Pixabay API - Get city image
app.get('/image', async (req, res) => {
    const { city } = req.query;
    try {
        const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(city)}&image_type=photo`);
        const images = response.data.hits;
        if (images.length > 0) {
            res.json({ imageUrl: images[0].webformatURL });
        } else {
            res.status(404).json({ error: 'No image found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Pixabay API' });
    }
});
