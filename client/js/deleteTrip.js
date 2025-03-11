function deleteTrip(index) {
    let trips = JSON.parse(localStorage.getItem('tripData')) || [];

    if (!Array.isArray(trips) || index < 0 || index >= trips.length) {
        console.error("Invalid index or no trips available.");
        return;
    }

    const isConfirmed = confirm("Are you sure you want to delete this trip?");
    
    if (!isConfirmed) {
        console.log("Trip deletion canceled.");
        return;
    }

    trips.splice(index, 1); // حذف الرحلة من الأراي
    localStorage.setItem('tripData', JSON.stringify(trips)); // تحديث localStorage

    Client.updateUI(); // إعادة تحميل الواجهة بعد الحذف
}

export { deleteTrip };