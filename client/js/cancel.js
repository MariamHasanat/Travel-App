function cancel(event) {
    event.preventDefault();
    
    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }

    event.target.closest(".container").style.display = "none";;
}

export { cancel };
