# Travel Application 

This is a simple application that fetches travel-related data from multiple APIs, including Geonames, Weatherbit, and Pixabay. The application receives a city, date, and duration as input, and in return, it provides the coordinates of the city, the weather forecast for the given date, and an image of the city.

## APIs Used:
- **Geonames API**: Used to fetch the coordinates of the city based on the city name.
- **Weatherbit API**: Used to fetch the weather forecast based on latitude and longitude.
- **Pixabay API**: Used to fetch an image of the city based on the city name.

## Project Setup
This project requires Node.js v22.12.0

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
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **Axios**: A promise-based HTTP client for the browser and Node.js to make API requests.
- **CORS**: A package to enable Cross-Origin Resource Sharing, helping to allow or restrict resources on your web server.
- **Body-Parser**: Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **Nodemon**: A utility that monitors for file changes in your Node.js application and automatically restarts the server.

## Development Dependencies:
- **@babel/core**: Babel compiler core functionality for transpiling JavaScript to a backward-compatible version.
- **@babel/plugin-transform-runtime**: Optimizes your compiled code by reusing Babel's helper functions.
- **@babel/preset-env**: Babel preset for compiling JavaScript based on your targeted environments.
- **Babel-Loader**: A webpack loader for Babel, enabling you to transpile files using Babel.
- **Clean-Webpack-Plugin**: A plugin for webpack to clean the output directory before each build.
- **Compression-Webpack-Plugin**: Webpack plugin for compression (e.g., Gzip) of your assets to reduce their size.
- **Copy-Webpack-Plugin**: A plugin to copy individual files or entire directories to the build folder.
- **CSS-Loader**: A webpack loader for handling CSS files and resolving dependencies within CSS files.
- **File-Loader**: A webpack loader for handling file imports (e.g., images or fonts) and copying them to the output directory.
- **HTML-Webpack-Plugin**: A plugin to simplify the creation of HTML files that include references to your webpack bundles.
- **Jest**: A testing framework for JavaScript, often used for unit testing and integration testing.
- **Jest-Environment-JSDOM**: Jest environment for simulating a browser environment in Node.js, used by Jest for DOM testing.
- **Sass**: A preprocessor scripting language that is interpreted or compiled into CSS.
- **Sass-Loader**: A webpack loader that compiles SCSS/SASS files into CSS.
- **Style-Loader**: A webpack loader that injects CSS into the DOM by adding a `<style>` tag.
- **Supertest**: A testing library for HTTP assertions, used to test API endpoints.
- **Terser-Webpack-Plugin**: A webpack plugin for minifying JavaScript files using the Terser JavaScript minifier.
- **Webpack**: A module bundler for JavaScript applications, used to bundle resources like JavaScript, CSS, and images.
- **Webpack-CLI**: Command-line interface for webpack, providing useful commands for bundling and building projects.
- **Webpack-Dev-Server**: A development server that provides live reloading and works seamlessly with webpack.
- **Workbox-Webpack-Plugin**: A plugin to integrate service workers with webpack for building progressive web apps (PWAs).

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

