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

async function render() {
    await getTodos();
    renderSummary();
    renderContacts();
    renderTask();
    /*  renderBoard(); */

}
let lastId;
let tasks;

function changeHTML(id) {
    if (id == "s") {
        id = "summary";
    } else if (id === "b") {
        id = "board";
    } else if (id === "t") {
        id = "task";
    } else if (id === "c") {
        id = "contacts";
    }
    if (lastId) {
        document.getElementById(lastId).classList.add('d-none')
    }
    lastId = id;
    document.getElementById(id).classList.remove('d-none')
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

/* async function init() {
    await getTodos();
    await loadHTML('content', 'summary.html').then(function() {
        loadScript('summary');
    });

}

async function loadHTML(id, filename) {
    let xhttp;
    let element = document.getElementById(id);
    let file = filename;
    if (file) {
        return new Promise(function(resolve, reject) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML = this.responseText;
                        resolve();
                    }
                    if (this.status == 400) {
                        element.innerHTML = "<p>Page not found</p>";
                        reject();
                    }
                }
            };
            xhttp.open("Get", file, true);
            xhttp.send();
        });
    }
    return;
}

async function loadScript(id) {
    const templateJs = document.getElementById("templateJs");
    if (isScriptLoaded(id + '.js')) {
        const script = document.createElement('script')
        script.src = id + '.js'
        document.head.insertBefore(script, templateJs);
    }

}

function isScriptLoaded(src) {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src == src) {
            return false;
        }
    }
    return true;
}

function changeColor(id) {
    const elemnts = document.querySelectorAll('.box_links_aside');
    elemnts.forEach(element => {
        element.style.backgroundColor = "#2A3647"
    });
    document.getElementById(id).parentElement.style.backgroundColor = "#091931"
}



async function checkContent(name, filename, id) {
    let contentBox = document.getElementById("content");
    content = contentBox.innerHTML
    await loadHTML(name, filename).then(function() {
        let previousContent = contentBox.innerHTML;
        if (content !== previousContent) {
            loadScript(id);
        }
    });
    if (id = "summary") {
        renderSummary()
    } else if (id = "board") {
        renderBoard()
    } else if (id = "contacts") {
        renderContacts()
    } else if (id = "task") {
        renderTask()
    }
    changeColor(id);
} */