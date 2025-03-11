const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { fetchData } = require('./dataFetcher');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('../../dist'));

const PORT = 8081;

app.post('/getData', async (req, res) => {
    const { city, date, duration } = req.body;

    try {
        const data = await fetchData(city, date, duration);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
