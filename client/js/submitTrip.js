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
    const duration = returnD - departure;
    return duration;
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
            updateUI(data);
        })
        .catch(error => console.log(error));
}

function updateUI(data) {
    if (data.error) return alert(data.error);
    document.getElementById('result').innerHTML = `
        <h3>${data.city}, ${data.country}</h3>
        <p>Weather: ${data.forecast.weather.description}</p>
        <img src="${data.imageUrl}" alt="City Image">
        <p>Duration: ${data.duration}</p>
    `;
}

export { submitTripHandler }; 