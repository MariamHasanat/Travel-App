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

    // Ensure that notes is an array
    data[index].notes = Array.isArray(data[index].notes) ? data[index].notes : [];

    // Add the note
    data[index].notes.push(note); 

    // Save updated data back to localStorage
    localStorage.setItem('tripData', JSON.stringify(data));

    // Update the UI after saving the note
    Client.updateUI();
}

export { addNote, submitNoteHandler };
