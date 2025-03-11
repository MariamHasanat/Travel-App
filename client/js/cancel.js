function cancel(event) {
    event.preventDefault();
    document.querySelectorAll("button").forEach(button => {
        if (button.textContent.trim() === "Cancel") {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const form = button.closest("form");
                if (form) {
                    form.reset();
                }
                button.closest(".container").classList.add("display-0");
            });
        }
    });
}

export { cancel };