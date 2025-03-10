function submitTripHandler(event) {
    event.preventDefault();
    const city = document.querySelector("input[placeholder='Enter Your Destination']").value;
    const departureDate = document.querySelectorAll("#dateInput")[0].value;
    const returnDate = document.querySelectorAll("#dateInput")[1].value;
    const tripDuration = calculateTripDuration(departureDate, returnDate);
    const trip = { city, date: departureDate, duration: tripDuration };

    console.log(trip);
    postTrip('http://localhost:8081/getData', trip);
}

function calculateTripDuration(departureDate, returnDate) {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    return returnD - departure;
}

function postTrip(url, trip) {
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trip)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            saveToLocalStorage(data);
            Client.updateUI();
        })
        .catch(error => console.log(error));
}

function saveToLocalStorage(newData) {
    let existingData = JSON.parse(localStorage.getItem('tripData')) || [];

    if (!Array.isArray(existingData)) {
        existingData = [];
    }

    existingData = [...existingData, newData];

    localStorage.setItem('tripData', JSON.stringify(existingData));
}

export { submitTripHandler };
