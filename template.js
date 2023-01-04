let tasks;

async function init() {
    await getTodos();
    await loadHTML('content', 'summary.html');
    loadScript();
    renderSummary();
}

async function loadHTML(id, filename) {
    let xhttp;
    let element = document.getElementById(id)
    let file = filename;
    if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) { element.innerHTML = this.responseText; }
                if (this.status == 400) { element.innerHTML = "<p>Page not found</p>" }
            }
        }
        xhttp.open("Get", file, true);
        xhttp.send();
    }
    return;
}

function loadScript() {
    const script = document.createElement('script')
    script.src = 'summary.js'
    document.head.prepend();
}

function changeColor(id) {
    const elemnts = document.querySelectorAll('.box_links_aside');
    elemnts.forEach(element => {
        element.style.backgroundColor = "#2A3647"
    });
    document.getElementById(id).parentElement.style.backgroundColor = "#091931"
}

async function getTodos() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/todos/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        tasks = await responseServer.json();
    } catch (error) {
        console.error(error)
    }
}