// Titles:
//('M', 'Media'),
//('D', 'Design'),
//('MA', 'Marketing'),
//('B', 'Backoffice'),
//('S', 'Sales'),
//('-', 'None')


// Placeholder!! Needs to be filled with input from 'Add Task'-field. 



async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

let priorities = ['Urgent', 'Medium', 'Low'];
let todos = [];
let currentCategory = [];
let currentDraggedElement;


// Update container with Todo-Tasks based on status ('open', 'in progress', 'awaiting feedback', 'done')
function renderBoard() {
    updateHTMLOpenTasks();
    updateHTMLInProgessTasks();
    updateHTMLFeedbackTasks();
    updateHTMLClosedTasks();
}


// Update container with status == 'open'.
function updateHTMLOpenTasks() {
    let openTasks = tasks.filter((task) => {
        return task['status'] == '1'
    });
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < openTasks.length; index++) {
        const element = openTasks[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element, index);
        /*    GetName(element, index) */
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

/* function GetName(task, index) {
    let filteredcontact = contacts.filter((ele) => {
        return task.user.includes(ele.lastName)
    });
    let firstLetterLastName = filteredcontact[0].lastName.substring(0, 1)
    document.getElementById('checkUser' + index).innerHTML += firstLetterLastName;
    document.getElementById('checkUser' + index).style.backgroundColor = filteredcontact[0].color
    document.getElementById('checkCategory' + index).style.backgroundColor = task.categories[0].color

}
 */




// Needed to make dropping elements possible. 
function allowDrop(ev) {
    ev.preventDefault();
}


// Change status when element is moved (E.g. todo-task with id 1: the status field is changed from 'open' to 'closed'.).
function moveTo(status) {
    let filteredTask = tasks.filter((task) => {
        return task['id'] === currentDraggedElement
    });
    filteredTask[0]['status'] = status;

    removeDragBackground()
    renderBoard();
}

function removeDragBackground() {
    const dragBackground = document.querySelectorAll('.drag_area_highlight');
    dragBackground.forEach(element => {
        element.parentNode.removeChild(element);
    });
}

// Change background color when element is dragged.
function highlight(id) {
    let category = document.getElementById(id).querySelector('.drag_area_highlight');
    if (category == null) {
        document.getElementById(id).innerHTML += `
        <div class="drag_area_highlight" ></div>`
    }
}
/* 
function removeHighlight(id) {
    document.getElementById(id).lastChild.removeChild();
} */

// ??? ////////////////////////////////////
// Show Task Details
function openBoardDetails(index) {
    document.getElementById('boardDetails').classList.remove('d_none');
    let boardContent = document.getElementById('boardContent');
    boardContent.innerHTML = '';
    let selectedBoard = tasks[index];
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

function toggleTask() {
    document.getElementById('overlayTask').classList.toggle("none");
}

/*
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
*/

function generateTodoHTML(element, index) {
    return `
<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
    <div onclick="openBoardDetails(${index})" class="todo_content">
        <div class="bg_category" id="checkCategory${index}">${element['categories'][0]['title']}</div>
        <div class="bg_title" id="checkTitle"><b>${element['title']}</b></div>
        <div class="bg_description" id="checkDescription">${element['description']}</div>
        <div class="todo_user_priority">
            <div class="todo_contact_img" id="checkUser${index}">${element['user'].charAt(0)}</div>
            <img class="priority_icon" src=${element['image']}>
        </div>
    </div>
</div>
`;
}