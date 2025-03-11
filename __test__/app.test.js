const request = require('supertest');
const app = require('../server/app');
const axios = require('axios');

// محاكاة axios
jest.mock('axios');

describe('POST /getData', () => {
    it('should return 400 if city or date is missing', async () => {
        const res = await request(app).post('/getData').send({ city: 'Paris' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'City and date are required');
    });

    it('should return 404 if city is not found', async () => {
        axios.get.mockResolvedValueOnce({ data: { geonames: [] } });
        const res = await request(app).post('/getData').send({ city: 'Unknown', date: '2025-05-10', duration: 5 });
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'City not found');
    });

    it('should return weather and image data for a valid request', async () => {
        axios.get
            .mockResolvedValueOnce({ data: { geonames: [{ lat: 48.8566, lng: 2.3522, countryName: 'France' }] } }) // Geonames
            .mockResolvedValueOnce({ data: { data: [{ datetime: '2025-05-10', high_temp: 25, low_temp: 15, weather: { description: 'Sunny', icon: 'c01d' } }] } }) // Weatherbit
            .mockResolvedValueOnce({ data: { hits: [{ webformatURL: 'https://example.com/paris.jpg' }] } }); // Pixabay

        const res = await request(app).post('/getData').send({ city: 'Paris', date: '2025-05-10', duration: 5 });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            city: 'Paris',
            date: '2025-05-10',
            country: 'France',
            lat: 48.8566,
            lng: 2.3522,
            forecast: expect.any(Object),
            imageUrl: 'https://example.com/paris.jpg',
            duration: 5
        });
    });

    it('should return empty image URL if Pixabay returns no images', async () => {
        axios.get
            .mockResolvedValueOnce({ data: { geonames: [{ lat: 48.8566, lng: 2.3522, countryName: 'France' }] } })
            .mockResolvedValueOnce({ data: { data: [{ datetime: '2025-05-10', high_temp: 25, low_temp: 15, weather: { description: 'Sunny', icon: 'c01d' } }] } })
            .mockResolvedValueOnce({ data: { hits: [] } });

        const res = await request(app).post('/getData').send({ city: 'Paris', date: '2025-05-10', duration: 5 });

        expect(res.status).toBe(200);
        expect(res.body.imageUrl).toBe('');
    });

    it('should return 500 if an API call fails', async () => {
        axios.get.mockRejectedValue(new Error('API Error'));
        const res = await request(app).post('/getData').send({ city: 'Paris', date: '2025-05-10', duration: 5 });
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty('error', 'Error fetching data');
    });
});
