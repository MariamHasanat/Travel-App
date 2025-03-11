function cancel(event) {
    event.preventDefault();

    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }

    const trips = JSON.parse(localStorage.getItem("tripData"));
    const addNewTripCard = document.getElementById("add-new-trip-card");
    const emptyContainer = document.getElementById("empty-container");

    if (!trips || trips.length === 0) {
        addNewTripCard.style.display = "none";
        emptyContainer.style.display = "block"; 
    }else if (trips.length > 0){
        addNewTripCard.style.display = "none"; 
        emptyContainer.style.display = "none"; 
    }
     else {
        addNewTripCard.style.display = "block"; 
        emptyContainer.style.display = "none";
    }
}

export { cancel };
