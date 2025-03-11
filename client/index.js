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
import { addNote, submitNoteHandler, editNoteHandler } from './js/addNote'

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".button-next").forEach(button => {
        button.addEventListener("click", (event) => {
            if (button.textContent.trim() === "Next") {
                button.closest(".container").classList.add("display-0");
                setTimeout(() => updateUI(), 100);
            }
        });
    });

});


export { submitTripHandler, deleteTrip, updateUI, cancel, addNote, submitNoteHandler, editNoteHandler };
