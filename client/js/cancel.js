function cancel(event) {
    event.preventDefault();
    
    const form = event.target.closest("form");
    if (form) {
        form.reset();
    }

    event.target.closest(".container").classList.add("display-0");
}

export { cancel };
