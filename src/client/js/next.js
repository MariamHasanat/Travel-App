function next(event) {
    event.preventDefault();
    document.getElementById("greetings-card").style.display = "none";
    document.getElementById("empty-container").style.display = "block";
}

export { next };