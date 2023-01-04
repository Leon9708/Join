window.addEventListener("message", function(event) {
    // Wenn die Nachricht "remove_d_none" ist, entfernen Sie die Klasse "d_none" von dem Element
    if (event.data === "remove_d_none") {
        let element = document.getElementById("board");
        element.classList.remove("d_none");
    }
});

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/* let tasks;

function changeView(id) {
    document.getElementById(id).classList.remove('d_none')
}