const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('../dist'));

const PORT = 8081;

// API Keys
const PIXABAY_API_KEY = '49139632-d0fe9d9972f457673f34bcd58';
const WEATHERBIT_KEY = '4cf82283c9854c67b66becb2120cbd8c';
const GEONAMES_USERNAME = 'mariam_hasanat';


app.post('/getData', async (req, res) => {
    const { city, date } = req.body;
    console.log({ city, date });
    if (!city || !date) return res.status(400).json({ error: 'City and date are required' });
    
    try {
        // 1. Get Coordinates from Geonames API
        const geoResponse = await axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${GEONAMES_USERNAME}`);
        if (!geoResponse.data.geonames.length) return res.status(404).json({ error: 'City not found' });

        const { lat, lng, countryName } = geoResponse.data.geonames[0];
        
        // 2. Get Weather from Weatherbit API
        const weatherResponse = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_KEY}`);
        const forecast = weatherResponse.data.data.find(day => day.datetime === date);
        
        // 3. Get Image from Pixabay API
        const imageResponse = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`);
        const imageUrl = imageResponse.data.hits.length ? imageResponse.data.hits[0].webformatURL : '';

        console.log({ city, country: countryName, lat, lng, forecast, imageUrl });
        
        res.json({ city, country: countryName, lat, lng, forecast, imageUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
