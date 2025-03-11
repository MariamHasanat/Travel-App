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

        const durationInDays = Math.floor(data.duration / (1000 * 60 * 60 * 24));

        const card = document.createElement('div');
        card.classList.add('card');

        if (data.imageUrl) {
            card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${data.imageUrl})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }

        card.innerHTML = `
            <div>
                <h3>${data.city}, ${data.country || 'Unknown Country'}</h3>
                <p>Weather: ${data.forecast.weather.description || 'No Data'}</p>
                <p>Duration: ${durationInDays} day(s)</p>
                
                 <span class="notes">
                    ${Array.isArray(data.notes) ? `<p>Notes: <div class="notes-container">` + data.notes.map(note => `<span class="note-item">📝 ${note}</span>`).join(', ')+`</div></p>` : ''
            }
                </span>
              
               
            </div>
            <div class="buttons">
                <button type="button" onclick="return Client.addNote(${index})">
                    <img src="/assets/add-note-icon.svg" alt="add-note-icon">
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