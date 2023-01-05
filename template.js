async function render() {
    await getTodos();
    renderSummary();
    renderContacts();
    renderTask();
    renderBoard();
}
let lastId;
let tasks;
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