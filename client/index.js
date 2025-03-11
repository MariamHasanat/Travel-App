import './assets/background-image.png';
import './assets/logo.svg';
import './assets/empty-data.svg';
import './assets/delete-icon.svg';
import './assets/add-note-icon.svg';
import './assets/edit-note.svg';
import './assets/edit-note-disabled.svg';
import './styles/style.scss';
import { submitTripHandler } from './js/submitTrip';
import { deleteTrip } from './js/deleteTrip';
import { updateUI } from './js/updateUI';
import { cancel } from './js/cancel';
import { addNote, submitNoteHandler, editNoteHandler } from './js/addNote';
import { setTripDateRestrictions } from './js/dateRes';
import { sortTrips } from './js/sortTrips';
import { addTripBtn } from './js/addTripBtn';


document.getElementById('nextBtn').addEventListener('click', function () {
    document.getElementById('greetings-card').style.display = 'none';
    document.getElementById('empty-container').style.display = 'block';
});

document.addEventListener("DOMContentLoaded",
    () => {
        setTripDateRestrictions();
        document.getElementById('empty-container').style.display = 'none';
        document.getElementById('add-new-trip-card').style.display = 'none';
        document.getElementById('result-container').style.display = 'none';
        document.querySelector.addEventListener("click", (event) => {
            if (button.textContent.trim() === "Next") {
                button.closest(".container").classList.add("display-0");
                setTimeout(() => updateUI(), 100);
            }
        });
    });




export { addTripBtn, submitTripHandler, deleteTrip, updateUI, cancel, addNote, submitNoteHandler, editNoteHandler, sortTrips };
