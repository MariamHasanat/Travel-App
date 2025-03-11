function cancel(event) {
    event.preventDefault();

    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }

    // تحقق من وجود بيانات في localStorage
    const trips = JSON.parse(localStorage.getItem("tripData"));
    const addNewTripCard = document.getElementById("add-new-trip-card");
    const emptyContainer = document.getElementById("empty-container");

    // إذا كانت الـ localStorage فارغة
    if (!trips || trips.length === 0) {
        addNewTripCard.style.display = "none"; // إخفاء النموذج
        emptyContainer.style.display = "block"; // إظهار حالة الـ empty
    }else if (trips.length > 0){
        addNewTripCard.style.display = "none"; // إخفاء النموذج
        emptyContainer.style.display = "none"; // إظهار حالة الـ empty
    }
     else {
        addNewTripCard.style.display = "block"; // إظهار النموذج إذا كان هناك عناصر
        emptyContainer.style.display = "none"; // إخفاء حالة الـ empty
    }
}

export { cancel };
