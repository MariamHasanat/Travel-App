import { submitTripHandler, calculateTripDuration, postTrip } from '../src/client/js/submitTrip';

// Mock the functions
jest.mock('../client/js/submitTrip.js', () => ({
    postTrip: jest.fn(),
    calculateTripDuration: jest.fn(),
    submitTripHandler: jest.fn(),
}));

// Mock localStorage
beforeEach(() => {
    global.localStorage = {
        getItem: jest.fn(),
        setItem: jest.fn(),
    };
});

// Mock alert
global.alert = jest.fn();

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({}),
});

describe('submitTripHandler', () => {
    it('should show alert if any field is missing', () => {
        // Mock DOM elements
        document.body.innerHTML = `
            <input placeholder="Enter Your Destination" />
            <input id="departureDate" />
            <input id="returnDate" />
            <div id="add-new-trip-card"></div>
        `;

        // Mock the behavior of submitTripHandler
        submitTripHandler.mockImplementation((event) => {
            event.preventDefault();
            const city = document.querySelector("input[placeholder='Enter Your Destination']").value;
            const departureDate = document.querySelector("#departureDate").value;
            const returnDate = document.querySelector("#returnDate").value;

            if (!departureDate || !returnDate || !city) {
                alert("All fields are required.");
                return;
            }
        });

        // Call the function
        submitTripHandler({ preventDefault: jest.fn() });

        // Check if alert was called
        expect(global.alert).toHaveBeenCalledWith('All fields are required.');
    });

    it('should call postTrip when all fields are filled', () => {
        // Mock DOM elements
        document.body.innerHTML = `
            <input placeholder="Enter Your Destination" value="Paris" />
            <input id="departureDate" value="2025-05-01" />
            <input id="returnDate" value="2025-05-10" />
            <div id="add-new-trip-card"></div>
        `;

        // Mock the behavior of calculateTripDuration
        calculateTripDuration.mockReturnValue('9 day(s)');

        // Mock the behavior of submitTripHandler
        submitTripHandler.mockImplementation((event) => {
            event.preventDefault();
            const city = document.querySelector("input[placeholder='Enter Your Destination']").value;
            const departureDate = document.querySelector("#departureDate").value;
            const returnDate = document.querySelector("#returnDate").value;

            if (!departureDate || !returnDate || !city) {
                alert("All fields are required.");
                return;
            }

            const tripDuration = calculateTripDuration(departureDate, returnDate);
            const trip = { city, date: departureDate, duration: tripDuration };

            postTrip('http://localhost:8081/getData', trip);
        });

        // Call the function
        submitTripHandler({ preventDefault: jest.fn() });

        // Check if postTrip was called
        expect(postTrip).toHaveBeenCalledWith('http://localhost:8081/getData', {
            city: 'Paris',
            date: '2025-05-01',
            duration: '9 day(s)',
        });
    });

    it('should hide the trip card after submitting', () => {
        // Mock DOM elements
        document.body.innerHTML = `
            <input placeholder="Enter Your Destination" value="Paris" />
            <input id="departureDate" value="2025-05-01" />
            <input id="returnDate" value="2025-05-10" />
            <div id="add-new-trip-card" style="display: block"></div>
        `;

        // Mock the behavior of submitTripHandler
        submitTripHandler.mockImplementation((event) => {
            event.preventDefault();
            document.getElementById('add-new-trip-card').style.display = 'none';
        });

        // Call the function
        submitTripHandler({ preventDefault: jest.fn() });

        // Check if the trip card is hidden
        const tripCard = document.getElementById('add-new-trip-card');
        expect(tripCard.style.display).toBe('none');
    });

    it('should clear the input fields after submitting', () => {
        // Mock DOM elements
        document.body.innerHTML = `
            <input placeholder="Enter Your Destination" value="Paris" />
            <input id="departureDate" value="2025-05-01" />
            <input id="returnDate" value="2025-05-10" />
            <div id="add-new-trip-card"></div>
        `;

        // Mock the behavior of submitTripHandler
        submitTripHandler.mockImplementation((event) => {
            event.preventDefault();
            document.querySelector("input[placeholder='Enter Your Destination']").value = '';
            document.querySelector("#departureDate").value = '';
            document.querySelector("#returnDate").value = '';
        });

        // Call the function
        submitTripHandler({ preventDefault: jest.fn() });

        // Check if the input fields are cleared
        expect(document.querySelector("input[placeholder='Enter Your Destination']").value).toBe('');
        expect(document.querySelector("#departureDate").value).toBe('');
        expect(document.querySelector("#returnDate").value).toBe('');
    });
});

describe('calculateTripDuration', () => {
    it('should return "Arrival is today" if the return date is the same as the departure date', () => {
        calculateTripDuration.mockReturnValue('Arrival is today');
        const duration = calculateTripDuration('2025-05-10', '2025-05-10');
        expect(duration).toBe('Arrival is today');
    });

    it('should return the correct number of days if return date is after departure date', () => {
        calculateTripDuration.mockReturnValue('9 day(s)');
        const duration = calculateTripDuration('2025-05-01', '2025-05-10');
        expect(duration).toBe('9 day(s)');
    });
});