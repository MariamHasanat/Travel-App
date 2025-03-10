import './assets/background-image.png';
import './assets/logo.svg';
import './assets/empty-data.svg';
import './assets/delete-icon.svg';
import './assets/add-note-icon.svg';
import './styles/style.scss';
import { submitTripHandler } from './js/submitTrip';
import { deleteTrip } from './js/deleteTrip';
import { updateUI } from './js/updateUI';

document.addEventListener("DOMContentLoaded", updateUI);


export { submitTripHandler, deleteTrip, updateUI };
