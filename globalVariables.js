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

async function deleteSubtask(subtask, url) {
    /* console.log(url)
    console.log(subtask)     */
    const data = JSON.stringify(subtask);
    fetch(url, {
            method: 'DELETE',
            body: data
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
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

async function deleteToDo(task, url) {
    const data = JSON.stringify(task);
    fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
}



let contacts = [{
    'id': 0,
    'lastName': 'Adam',
    'firstName': 'Marks',
    'email': 'A_Marks@gmail.com',
    'phone': '924782934',
    'color': 'red'
}, {
    'id': 1,
    'lastName': 'Michael',
    'firstName': 'Bertram',
    'email': 'Bertram25@gmx.com',
    'phone': '25798264',
    'color': 'blue'
}, {
    'id': 2,
    'lastName': 'Charlie',
    'firstName': 'Landon',
    'email': 'CL@gmail.com',
    'phone': '357342',
    'color': 'aqua'
}, {
    'id': 3,
    'lastName': 'Dora',
    'firstName': 'Hurts',
    'email': 'DoHurts@gmail.com',
    'phone': '4572342',
    'color': 'brown'
}, {
    'id': 4,
    'lastName': 'Eva',
    'firstName': 'Müller',
    'email': 'EviMüller21@gmail.com',
    'phone': '543204249',
    'color': 'orange'
}];

let users = [] 


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