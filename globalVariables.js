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


let contacts = [{
    'id': 0,
    'lastName': 'Adamadam',
    'firstName': 'Adam',
    'email': 'ABC@gmail.com',
    'phone': '0157257445123',
    'color': 'red'
}, {
    'id': 1,
    'lastName': 'Bertaberta',
    'firstName': 'Berta',
    'email': 'BGI@gmail.com',
    'phone': '014525343243',
    'color': 'blue'
}, {
    'id': 2,
    'lastName': 'Charlie',
    'firstName': 'ABC',
    'email': 'CGI@gmail.com',
    'phone': '017879643243',
    'color': 'aqua'
}, {
    'id': 3,
    'lastName': 'Doradora',
    'firstName': 'Dora',
    'email': 'DGI@gmail.com',
    'phone': '017325378902',
    'color': 'brown'
}, {
    'id': 4,
    'lastName': 'Evaeva',
    'firstName': 'Eva',
    'email': 'EFG@gmail.com',
    'phone': '013368345639',
    'color': 'orange'
}];

let todos = [{
    'id': 0,
    'title': 'Call Designer',
    'description': 'To this or that...',
    'category': 'Design',
    'priority': 'low',
    'image': 'assets/img/low_task.png',
    'user': 'Aname',
    'due_date': 0,
    'status': 'open',
}, {
    'id': 1,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'medium',
    'image': 'assets/img/medium_task.png',
    'user': 'Bname',
    'due_date': 0,
    'status': 'feedback',
}, {
    'id': 2,
    'title': 'Call Media',
    'description': 'To this or that...',
    'category': 'Media',
    'priority': 'urgent',
    'image': 'assets/img/urgent_task.png',
    'user': 'Cname',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 3,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'low',
    'image': 'assets/img/low_task.png',
    'user': 'Dname',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 4,
    'title': 'Call Marketing',
    'description': 'To this or that...',
    'category': 'Marketing',
    'priority': 'low',
    'image': 'assets/img/low_task.png',
    'user': 'Ename',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 5,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'low',
    'image': 'assets/img/low_task.png',
    'user': 'Fname',
    'due_date': 0,
    'status': 'feedback',
}, {
    'id': 6,
    'title': 'Call Backoffice',
    'description': 'To this or that...',
    'category': 'Backoffice',
    'priority': 'medium',
    'image': 'assets/img/medium_task.png',
    'user': 'Gname',
    'due_date': 0,
    'status': 'closed',
}, {
    'id': 7,
    'title': 'Call Media',
    'description': 'To this or that...',
    'category': 'Media',
    'priority': 'medium',
    'image': 'assets/img/medium_task.png',
    'user': 'Hname',
    'due_date': 0,
    'status': 'closed'
}]

let users = []
let lastId;
let tasks;
let categoryLabels;
let subtasks;