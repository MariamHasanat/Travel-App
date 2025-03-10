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
        updateUI();
    })
    .catch(error => console.log(error));
}

function saveToLocalStorage(data) {
    localStorage.setItem('tripData', JSON.stringify(data));
}

function updateUI() {
    const storedData = localStorage.getItem('tripData');
    const emptyState = document.querySelector('.empty');
    const resultContainer = document.getElementById('result');

    if (!storedData) {
        emptyState.style.display = 'block';
        resultContainer.style.display = 'none';
        return;
    }

    const data = JSON.parse(storedData);
    if (data.error) return alert(data.error);

    emptyState.style.display = 'none'; // إخفاء حالة عدم وجود بيانات
    resultContainer.innerHTML = `
        <h3>${data.city}, ${data.country}</h3>
        <p>Weather: ${data.forecast.weather.description}</p>
        <img src="${data.imageUrl}" alt="City Image">
        <p>Duration: ${data.duration}</p>
    `;
}

// استدعاء التحديث عند تحميل الصفحة لضمان تحديث الواجهة إذا كان هناك بيانات محفوظة
document.addEventListener("DOMContentLoaded", updateUI);

export { submitTripHandler };
