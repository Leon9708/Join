let tasks;

async function init() {
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
    if (isScriptLoaded(id + '.js')) {
        const script = document.createElement('script')
        script.src = id + '.js'
        document.head.appendChild(script);
    }
    if (id = "summary") {
        renderSummary()
    } else if (id = "board") {
        renderBoard()
    } else if (id = "contacts") {
        renderContacts()
    } else if (id = "task") {
        renderTask()
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

async function checkContent(name, filename, id) {
    let contentBox = document.getElementById("content");
    content = contentBox.innerHTML
    await loadHTML(name, filename).then(function() {
        let previousContent = contentBox.innerHTML;
        if (content !== previousContent) {
            loadScript(id);
        }
    });
    changeColor(id);
}