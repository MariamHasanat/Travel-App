const axios = require('axios');
const { PIXABAY_API_KEY, WEATHERBIT_KEY, GEONAMES_USERNAME, GEONAMES_URL, WEATHERBIT_URL, PIXABAY_URL } = require('./apiKeys');

// Primary function to fetch data
async function fetchData(city, date, duration) {
    if (!city || !date) throw new Error('City and date are required');

    try {
        // 1. Get Coordinates from Geonames API
        const geoResponse = await axios.get(`${GEONAMES_URL}?q=${city}&maxRows=1&username=${GEONAMES_USERNAME}`);
        if (!geoResponse.data.geonames.length) throw new Error('City not found');

        const { lat, lng, countryName } = geoResponse.data.geonames[0];

        // 2. Get Weather from Weatherbit API
        const weatherResponse = await axios.get(`${WEATHERBIT_URL}/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_KEY}`);
        const forecast = weatherResponse.data.data.find(day => day.datetime === date);

        // 3. Get Image from Pixabay API
        const imageResponse = await axios.get(`${PIXABAY_URL}?key=${PIXABAY_API_KEY}&q=${city}&image_type=photo`);
        const imageUrl = imageResponse.data.hits.length ? imageResponse.data.hits[0].webformatURL : '';

        return { city, date, country: countryName, lat, lng, forecast, imageUrl, duration };
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

module.exports = { fetchData };
