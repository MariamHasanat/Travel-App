function returnBack(event) {
    event.preventDefault();

    const noResE = document.getElementById('no-res-container');
    noResE.classList.add('display-0');
    noResE.style.display = 'none';

    // if no items in the local storage display empty and section is displayed
    const storedData = localStorage.getItem('tripData');
    const emptyState = document.querySelector('.empty');
    const dataArray = JSON.parse(storedData);
    const section = document.getElementById('section');

    if (section.style.display === 'none' && (!Array.isArray(dataArray) || dataArray.length === 0)) {
        emptyState.style.display = 'block';
    }

}

export { returnBack };