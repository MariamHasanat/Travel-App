function formatDate(timestamp) {
    if (!timestamp) return null;

    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

function calculateDaysLeft(timestamp) {
    if (!timestamp) return null;

    const tripDate = new Date(timestamp);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    tripDate.setHours(0, 0, 0, 0);

    if (tripDate.toDateString() === today.toDateString()) {
        return "Trip is today";
    }

    const diff = tripDate - today;
    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));

    return daysLeft >= 0 ? daysLeft + ` day(s)` : "Trip has passed";
}

function updateUI() {
    const storedData = localStorage.getItem('tripData');
    const emptyState = document.querySelector('.empty');
    const resultContainer = document.getElementById('result-container');
    const section = document.getElementById('section');
    const dataArray = JSON.parse(storedData);

    emptyState.style.display = 'none';
    resultContainer.style.display = 'flex';
    resultContainer.innerHTML = '';


    if (section.style.display !== 'none' && (!Array.isArray(dataArray) || dataArray.length === 0)) { // this in case of delete the last element
        const emElement = document.createElement('img');
        emElement.src = 'assets/empty-data.svg';
        emElement.alt = 'empty-data image';
        emElement.style.width = "200px";
        emElement.style.height = "auto";
        emElement.style.margin = "auto";

        resultContainer.appendChild(emElement);
        return;
    }


    dataArray.forEach((data, index) => {
        if (!data) {
            console.error("Data is not defined for trip:", data);
            emptyState.style.display = 'block';
            section.style.display = 'none';
            return;
        }

        const card = document.createElement('div');
        card.classList.add('card');

        const hasNotes = data.notes?.trim().length > 0;

        if (data.imageUrl) {
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${data.imageUrl})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }else{
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))`;
            card.style.backgroundColor = '#219EBC';
            card.style.backgroundPosition = 'center';
        }

        card.innerHTML = `
            <div>
                <h3>My Trip to: ${data.city}, ${data.country || 'Unknown Country'}</h3>
                <p>Departing: ${formatDate(data.date) || 'No Data'}</p>
                <p>Time Left: ${calculateDaysLeft(data.date) || 'No Data'} | Duration: ${data.duration}</p>
                <p>Weather: ${data.forecast ? `High: ${data.forecast.high_temp}°C | Low: ${data.forecast.low_temp}°C | ${data.forecast.weather.description || 'No Data'} &nbsp;<img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.forecast.weather.icon}.png" alt="Weather Icon">
                </p>`: `No Weather Data Found</p>`}
                <span class="notes">
                    ${data.notes ? `<p>Notes: <span class="note-item">📝 ${data.notes}</span></p>` : ''}
                </span>
            </div>
            <div class="buttons">
                <button type="button" id="add-note-btn-${index}" onclick="return Client.addNote(${index})" class="${hasNotes ? 'display-0' : ''}">
                    <img src="/assets/add-note-icon.svg" alt="add-note-icon">
                </button>
                <button type="button" onclick="return Client.editNoteHandler(${index})" class="${!hasNotes ? 'display-0' : ''}">
                    <img src="/assets/edit-note.svg" alt="edit-note-icon">
                </button>
                <button type="button" onclick="return Client.deleteTrip(${index})">
                    <img src="/assets/delete-icon.svg" alt="delete-icon">
                </button>
            </div>
        `;

        document.getElementById("section").style.display = "flex";
        resultContainer.appendChild(card);
    });
}

export { updateUI, formatDate, calculateDaysLeft };