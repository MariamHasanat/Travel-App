function setTripDateRestrictions() {
    const departureInput = document.getElementById('departureDate');
    const returnInput = document.getElementById('returnDate');

    if (departureInput && returnInput) {
        const today = new Date().toISOString().split('T')[0]; // تنسيق YYYY-MM-DD
        departureInput.min = today;

        departureInput.addEventListener('change', function() {
            returnInput.min = departureInput.value;
        });

        returnInput.addEventListener('focus', function() {
            if (new Date(returnInput.value) < new Date(departureInput.value)) {
                returnInput.setCustomValidity('Return date must be after departure date');
            } else {
                returnInput.setCustomValidity('');
            }
        });
    } else {
        console.error("Missing departure or return input element.");
    }
}

export { setTripDateRestrictions };