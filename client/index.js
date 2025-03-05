import './assets/background-image.png';
import './assets/logo.svg';
import './styles/style.scss';


document.querySelector('.add-new-trip-card form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.querySelector("input[placeholder='Enter Your Destination']").value;
    const departureDate = document.querySelectorAll("#dateInput")[0].value;
    const returnDate = document.querySelectorAll("#dateInput")[1].value;
    if (!city || !departureDate || !returnDate) return alert('Please fill all fields');

    console.log({ city, date: departureDate });


    const response = await fetch('http://localhost:8081/getData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, date: departureDate })
    });
    
    const data = await response.json();
    if (data.error) return alert(data.error);
    
    document.getElementById('result').innerHTML = `
        <h3>${data.city}, ${data.country}</h3>
        <p>Weather: ${data.forecast.weather.description}</p>
        <img src="${data.imageUrl}" alt="City Image">
    `;
});
