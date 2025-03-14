const loaderContainer = document.createElement('div');
loaderContainer.classList.add('loader-container');

const loader = document.createElement('img');
loader.src = '/assets/tube-spinner.svg';
loader.alt = 'loader image';
loader.classList.add('loader');

loaderContainer.appendChild(loader);


function submitTripHandler(event) {
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

    document.getElementById('add-new-trip-card').style.display = 'none';
    document.body.appendChild(loaderContainer);

    // clear the fields after submitting the data
    document.querySelector("input[placeholder='Enter Your Destination']").value = '';
    document.querySelector("#departureDate").value = '';
    document.querySelector("#returnDate").value = '';

}

function calculateTripDuration(departureDate, returnDate) {
    const departure = new Date(departureDate);
    const returnD = new Date(returnDate);

    const diffTime = returnD - departure;
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays === 0) {
        return "Arrival in the same day";
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
            saveToLocalStorage(data);
            document.body.removeChild(loaderContainer);
            Client.updateUI();
        })
        .catch(error => {
            console.log(error);
            const noResE = document.getElementById('no-res-container');
            noResE.classList.remove('display-0');
            document.body.removeChild(loaderContainer);
            noResE.style.display = 'flex';
        });
}

function saveToLocalStorage(newData) {
    let existingData = JSON.parse(localStorage.getItem('tripData')) || [];

    if (!Array.isArray(existingData)) {
        existingData = [];
    }

    existingData = [...existingData, newData];

    localStorage.setItem('tripData', JSON.stringify(existingData));
}

export { submitTripHandler, calculateTripDuration, postTrip };
