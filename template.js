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


var links = document.querySelectorAll('a');

links.forEach(function(link) {
    link.addEventListener('click', handleLinkClick);
});

function handleLinkClick(event) {
    // Prevent the default link click behavior
    event.preventDefault();
    const nextURL = event.target.href;
    // Get the URL of the link that was clicked

    // Use the "history" API to change the URL of the current page
    window.history.pushState(nextState);

}


// This will create a new entry in the browser's history, without reloading


// This will replace the current entry in the browser's history, without reloading