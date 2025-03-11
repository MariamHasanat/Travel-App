function submitTripHandler(event) {
    event.preventDefault();
    const city = document.querySelector("input[placeholder='Enter Your Destination']").value;
    const departureDate = document.querySelector("#departureDate").value;
    const returnDate = document.querySelector("#returnDate").value;
    
    if (!departureDate || !returnDate) {
        alert("Both dates are required.");
        return;
    }

    const tripDuration = calculateTripDuration(departureDate, returnDate);
    const trip = { city, date: departureDate, duration: tripDuration };

    console.log(trip);
    postTrip('http://localhost:8081/getData', trip);
    document.getElementById('add-new-trip-card').style.display = 'none';
}

function calculateTripDuration(departureDate, returnDate) {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);
    
    const diffTime = returnD - departure;
    const diffDays = diffTime / (1000 * 3600 * 24); 

    if (diffDays === 0) {
        return "Arrival is today"; 
    }
    
    return diffDays + " day(s)";
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
