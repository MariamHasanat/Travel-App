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
    
    if (tripDate.toDateString() === today.toDateString()) {
        return "Trip is today";
    }

    const diff = tripDate - today; 
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return daysLeft >= 0 ? daysLeft + ` day(s)` : "Trip has passed";
}

function updateUI() {
    const storedData = localStorage.getItem('tripData');
    const emptyState = document.querySelector('.empty');
    const resultContainer = document.getElementById('result-container');

    if (!storedData) {
        emptyState.style.display = 'block';
        resultContainer.style.display = 'none';
        return;
    }

    const dataArray = JSON.parse(storedData);

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        emptyState.style.display = 'block';
        resultContainer.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    resultContainer.style.display = 'flex';
    resultContainer.innerHTML = '';

    dataArray.forEach((data, index) => {
        if (!data || !data.forecast || !data.forecast.weather) {
            console.error("Data is incomplete for trip:", data);
            return;
        }

        const card = document.createElement('div');
        card.classList.add('card');

        const hasNotes = data.notes?.trim().length > 0;

        if (data.imageUrl) {
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(${data.imageUrl})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }

        card.innerHTML = `
            <div>
                <h3>My Trip to: ${data.city}, ${data.country || 'Unknown Country'}</h3>
                <p>Departing: ${formatDate(data.date) || 'No Data'}</p>
                <p>Time Left: ${calculateDaysLeft(data.date) || 'No Data'} | Duration: ${data.duration}</p>
                <p>Weather: High: ${data.forecast.high_temp}°C | Low: ${data.forecast.low_temp}°C | ${data.forecast.weather.description || 'No Data'} &nbsp;<img class="weather-icon" src="https://www.weatherbit.io/static/img/icons/${data.forecast.weather.icon}.png" alt="Weather Icon">
                </p>
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

        resultContainer.appendChild(card);
    });
}

export { updateUI };