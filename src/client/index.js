import './assets/background-image.png';
import './assets/logo.svg';
import './assets/empty-data.svg';
import './assets/delete-icon.svg';
import './assets/add-note-icon.svg';
import './assets/edit-note.svg';
import './assets/server-error.svg'
import './styles/style.scss';
import './styles/section.scss';
import './styles/models.scss';
import './styles/note.scss';
import './styles/addNewTrip.scss';
import './styles/serverErrorStyle.scss'
import { returnBack } from './js/returnBack';
import { submitTripHandler } from './js/submitTrip';
import { deleteTrip } from './js/deleteTrip';
import { updateUI } from './js/updateUI';
import { cancel } from './js/cancel';
import { addNote, submitNoteHandler, editNoteHandler } from './js/addNote';
import { setTripDateRestrictions } from './js/dateRes';
import { addTripBtn } from './js/addTripBtn';
import { cancelAddNote } from './js/cancelAddNote';
import { next } from './js/next';

document.addEventListener("DOMContentLoaded", () => {
    setTripDateRestrictions();

    const trips = JSON.parse(localStorage.getItem("tripData")) || [];

    if (trips.length > 0) {
        updateUI();
    } else {
        document.getElementById("greetings-card").style.display = "block";
        document.getElementById("empty-container").style.display = "none";
        document.getElementById("add-new-trip-card").style.display = "none";
        document.getElementById("section").style.display = "none";
    }
});



export { addTripBtn, returnBack, cancelAddNote, submitTripHandler, deleteTrip, updateUI, cancel, addNote, submitNoteHandler, editNoteHandler, setTripDateRestrictions, next };
