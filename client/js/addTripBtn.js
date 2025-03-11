function addTripBtn(event) {
    event.preventDefault();
    document.getElementById('empty-container').style.display = 'none';
    document.getElementById('add-new-trip-card').style.display = 'block';
}

export { addTripBtn };