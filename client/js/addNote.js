function addNote(index) {
    const noteForm = document.querySelector(".add-note");
    noteForm.classList.remove("display-0");
    noteForm.dataset.index = index;
};

function getData() {
    const data = JSON.parse(localStorage.getItem('tripData'));
    return data ? data : []; // If data is not found, return an empty array
}


function submitNoteHandler(event) {
    event.preventDefault();
    
    // Get the data from localStorage
    const data = getData(); 
    const index = document.querySelector(".add-note").dataset.index;
    
    if (!data || !data[index]) {
        console.error('Data for the specified trip not found!');
        return;
    }

    const note = document.getElementById('add-note').value;
    if (!note) {
        console.error('Note is empty!');
        return;
    }

    // Check if the note's length is less than or equal to 60 characters
    if (note.length > 60) {
        alert("The note cannot exceed 60 characters!");
        return; // Stop further execution if the note is too long
    }

    // Store the note as a string
    data[index].notes = note; 

    // Save updated data back to localStorage
    localStorage.setItem('tripData', JSON.stringify(data));

    // Update the UI after saving the note
    Client.updateUI();
}

// Function to allow editing a note
function editNoteHandler(index) {
    const data = getData();
    
    if (!data || !data[index] || !data[index].notes) {
        console.error('Note not found!');
        return;
    }
    
    const note = data[index].notes;
    
    // Show the note form and pre-fill it with the existing note
    const noteForm = document.querySelector(".add-note");
    noteForm.classList.remove("display-0");
    noteForm.dataset.index = index; // Assign index to dataset for later use

    // Pre-fill the textarea with the current note
    document.getElementById('add-note').value = note;
}

export { addNote, submitNoteHandler, editNoteHandler };
