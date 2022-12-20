async function getTodos() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/todos/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        tasks = await responseServer.json();
        console.log(tasks);
    } catch (error) {
        console.error(error)
    }
}

async function renderBoard() {
    await getTodos();
    updateHTML();
    console.log('tasks', tasks)
}

let tasks;
// Titles:
//('M', 'Media'),
//('D', 'Design'),
//('MA', 'Marketing'),
//('B', 'Backoffice'),
//('S', 'Sales'),
//('-', 'None')


// Placeholder!! Needs to be filled with input from 'Add Task'-field. 
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
}];

let priorities = ['Urgent', 'Medium', 'Low'];

let currentCategory = [];

let currentDraggedElement;


// Update container with Todo-Tasks based on status ('open', 'in progress', 'awaiting feedback', 'done')
function updateHTML() {
    updateHTMLOpenTasks();
    updateHTMLInProgessTasks();
    updateHTMLFeedbackTasks();
    updateHTMLClosedTasks();
}


// Update container with status == 'open'.
function updateHTMLOpenTasks() {
    let open = tasks.filter(t => t['status'] == '1');
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element, index);
        GetName(element, index)
    }
}


// Update container with status == 'progress'.
function updateHTMLInProgessTasks() {
    let progress = tasks.filter(t => t['status'] == '2');
    document.getElementById('progress').innerHTML = '';
    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').innerHTML += generateTodoHTML(element, index);

    }
}


// Update container with status == 'feedback'.
function updateHTMLFeedbackTasks() {
    let feedback = tasks.filter(t => t['status'] == '3');
    document.getElementById('feedback').innerHTML = '';
    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').innerHTML += generateTodoHTML(element, index);

    }
}


// Update container with status == 'closed'.
function updateHTMLClosedTasks() {
    let closed = tasks.filter(t => t['status'] == '4');
    document.getElementById('closed').innerHTML = '';
    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element, index);

    }
}


// Dragging elements based on IDs. 
function startDragging(id) {
    currentDraggedElement = id;
}

function GetName(task, index) {
    let filteredcontact = contacts.filter((ele) => {
        return task.user.includes(ele.lastName)
    })
    let firstLetterLastName = filteredcontact[0].lastName.substring(0, 1)
    document.getElementById('checkUser' + index).innerHTML += firstLetterLastName
}


function generateTodoHTML(element, index) {
    return `
<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
    <div onclick="openBoardDetails(${index})" class="todo_content">
        <div class="bg_category" id="checkCategory">${element['categories'][0]['title']}</div>
        <div class="bg_title" id="checkTitle"><b>${element['title']}</b></div>
        <div class="bg_description" id="checkDescription">${element['description']}</div>x
        <div class="todo_user_priority">
            <div class="todo_contact_img" id="checkUser${index}">${element['user'].charAt(0)}</div>
            <img class="priority_icon" src=${element['image']}>
        </div>
    </div>
</div>
`;
}


// Needed to make dropping elements possible. 
function allowDrop(ev) {
    ev.preventDefault();
}


// Change status when element is moved (E.g. todo-task with id 1: the status field is changed from 'open' to 'closed'.).
function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}


// Change background color when element is dragged.
function highlight(id) {
    document.getElementById(id).classList.add('drag_area_highlight');
}


function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag_area_highlight');
}


// ??? ////////////////////////////////////
// Show Task Details
function openBoardDetails(index) {
    document.getElementById('boardDetails').classList.remove('d_none');
    let boardContent = document.getElementById('boardContent');
    boardContent.innerHTML = '';
    let selectedBoard = todos[index];
    boardContent.innerHTML += openBoardDetailstHTML(selectedBoard);
}


function openBoardDetailstHTML(selectedBoard) {
    return `
    <div><h3>${selectedBoard['user'].charAt(0)}</h3></div>
    <div><h3>${selectedBoard['user']}</h3></div>
    <div><h3>${selectedBoard['status']}</h3></div>
    `
}


// Close Board Details
function closeBoardDetails() {
    document.getElementById('boardDetails').classList.add('d_none');
}


// If Category == Media --> classlist.add('bg_media'), etc.
function matchColorWithCategory() {
    currentCategory = todos[i];
    let colorMatch = currentCategory['category'];
    if (colorMatch == 'Media') {
        document.getElementById('checkCategory').classList.add('bg_media');
    } else {
        document.getElementById('checkCategory').classList.add('bg_marketing');
    };
    //let category = document.getElementById('checkCategory');
    //If (category=='Media') {
    //  document.getElementById('checkCategory').classList.add('bg_media');
    //};
}