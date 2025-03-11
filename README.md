# Travel Data Fetcher

This is a simple application that fetches travel-related data from multiple APIs, including Geonames, Weatherbit, and Pixabay. The application receives a city, date, and duration as input, and in return, it provides the coordinates of the city, the weather forecast for the given date, and an image of the city.

## APIs Used:
- **Geonames API**: Used to fetch the coordinates of the city based on the city name.
- **Weatherbit API**: Used to fetch the weather forecast based on latitude and longitude.
- **Pixabay API**: Used to fetch an image of the city based on the city name.

## Environment Setup:
1. Clone the repository using this [link](https://github.com/MariamHasanat/Travel-App).
2. Install dependencies by running:
   ```
   npm install
   ```
3. Set up the following API keys:
    - **Geonames**: [Sign up here](http://www.geonames.org/login) to get your Geonames username.
    - **Weatherbit**: [Sign up here](https://weatherbit.io/) to get your Weatherbit API key.
    - **Pixabay**: [Sign up here](https://pixabay.com/api/docs/) to get your Pixabay API key.

4. Replace the keys in the `apiKeys.js` file with your own keys:

```javascript
// apiKeys.js
module.exports = {
      PIXABAY_API_KEY: '49139632-d0fe9d9972f457673f34bcd58',
    WEATHERBIT_KEY: '4cf82283c9854c67b66becb2120cbd8c',
    GEONAMES_USERNAME: 'mariam_hasanat',
    GEONAMES_URL: 'http://api.geonames.org/searchJSON',
    WEATHERBIT_URL: 'https://api.weatherbit.io/v2.0/forecast/daily',
    PIXABAY_URL: 'https://pixabay.com/api/'
};
```


## Available Scripts:
- `npm start`: Starts the server using `nodemon` and runs the server from `src/server/index.js`.
- `npm build-prod`: Builds the project for production using `webpack` with the production configuration.
- `npm build-dev`: Runs the project in development mode with `webpack-dev-server` and automatically opens the browser.
- `npm test`: Runs the tests using `jest` to ensure everything is working correctly.

## Usage:
Once the server is running, you can make a POST request to `/getData` with the following data in the body:

```json
{
    "city": "Paris",
    "date": "2025-05-01",
    "duration": "9 day(s)"
}
```

The response will contain the following information:
- The city name, date, and country.
- Latitude and Longitude of the city.
- The weather forecast for the given date.
- A link to an image of the city.

## Dependencies:
- Express.js
- Axios
- CORS
- Body-Parser

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.