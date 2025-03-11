import './assets/background-image.png';
import './assets/logo.svg';
import './assets/empty-data.svg';
import './assets/delete-icon.svg';
import './assets/add-note-icon.svg';
import './assets/edit-note.svg';
import './assets/edit-note-disabled.svg';
import './styles/style.scss';
import './styles/section.scss'
import { submitTripHandler } from './js/submitTrip';
import { deleteTrip } from './js/deleteTrip';
import { updateUI } from './js/updateUI';
import { cancel } from './js/cancel';
import { addNote, submitNoteHandler, editNoteHandler } from './js/addNote';
import { setTripDateRestrictions } from './js/dateRes';
import { sortTrips } from './js/sortTrips';
import { addTripBtn } from './js/addTripBtn';

document.addEventListener("DOMContentLoaded", () => {
    setTripDateRestrictions();

    // التحقق من وجود بيانات في localStorage
    const trips = JSON.parse(localStorage.getItem("tripData")) || [];
    console.log(trips.length);
    

    if (trips.length > 0) {
        updateUI();
    } else {
        // إخفاء كل شيء ما عدا greetings-card
        document.getElementById("greetings-card").style.display = "block";
        document.getElementById("empty-container").style.display = "none";
        document.getElementById("add-new-trip-card").style.display = "none";
        document.getElementById("result-container").style.display = "none";
    }
});

document.getElementById("nextBtn").addEventListener("click", function () {
    document.getElementById("greetings-card").style.display = "none";
    document.getElementById("empty-container").style.display = "block";
});

export { addTripBtn, submitTripHandler, deleteTrip, updateUI, cancel, addNote, submitNoteHandler, editNoteHandler, sortTrips };
