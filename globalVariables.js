async function getCategories() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/categories/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        categoryLabels = await responseServer.json();
    } catch (error) {
        console.error(error)
    }
}
async function getSubtasks() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/subtasks/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        subtasks = await responseServer.json();
    } catch (error) {
        console.error(error)
    }
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

async function postTodo(task) {
    const data = JSON.stringify(task);
    fetch('https://jonas34.pythonanywhere.com/todos/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

/* async function putToDo(task, url) {
    // Make a PUT request to the backend with the specified ID and data
    fetch(url, {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(task => {
            // Do something with the returned data
            console.log(task);
        })
        .catch(error => {
            // Handle any errors that occurred
            console.error(error);
        });
        
}  */
async function putToDo(task, url) {
    const data = JSON.stringify(task);
    fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}

/* function saveJSONToServer() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + '/save_json.php';
        xhttp.open('POST', serverURL);

        xhttp.onreadystatechange = function(oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };

        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(jsonFromServer));

    });
}
 */

let contacts = [{
    'id': 0,
    'lastName': 'Adamadam',
    'firstName': 'Adam',
    'email': 'ABC@gmail.com',
    'phone': '123',
    'color': 'red'
}, {
    'id': 1,
    'lastName': 'Bertaberta',
    'firstName': 'Berta',
    'email': 'BGI@gmail.com',
    'phone': '257',
    'color': 'blue'
}, {
    'id': 2,
    'lastName': 'Charlie',
    'firstName': 'ABC',
    'email': 'CGI@gmail.com',
    'phone': '357',
    'color': 'aqua'
}, {
    'id': 3,
    'lastName': 'Doradora',
    'firstName': 'Dora',
    'email': 'DGI@gmail.com',
    'phone': '457',
    'color': 'brown'
}, {
    'id': 4,
    'lastName': 'Evaeva',
    'firstName': 'Eva',
    'email': 'EFG@gmail.com',
    'phone': '543',
    'color': 'orange'
}];


async function render(id) {
    await getTodos();
    await getSubtasks();
    await getCategories();
    if (id === 'summary') {
        renderSummary();
    } else if (id === "board") {
        renderBoard();
    } else if (id === "task") {
        renderTask();
    } else if (id === "contacts") {
        renderContacts()
    }

}
let lastId;
let tasks;
let categoryLabels;
let subtasks;

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