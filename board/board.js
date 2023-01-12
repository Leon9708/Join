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

async function requestStatus(filteredTask) {
    let date = setDate(filteredTask[0].due_date)
    filteredTask[0]['due_date'] = date;
    let urlId = filteredTask[0].id
    let url = "https://jonas34.pythonanywhere.com/todos/" + urlId + '/'
    if (filteredTask[0].status === '4') {
        await deleteToDo(filteredTask[0], url)
    } else {
        await putToDo(filteredTask[0], url)
    }
    removeDragBackground();
    renderBoard();
}

let priorities = ['Urgent', 'Medium', 'Low'];
let todos = [];
let currentCategory = [];
let currentDraggedElement;


// Update container with Todo-Tasks based on status ('open', 'in progress', 'awaiting feedback', 'done')
async function renderBoard() {
    updateHTMLOpenTasks();
    updateHTMLInProgessTasks();
    updateHTMLFeedbackTasks();
    /*      updateHTMLClosedTasks(); */
}


// Update container with status == 'open'.
function updateHTMLOpenTasks() {
    let openTasks = tasks.filter((task) => {
        return task['status'] == '1'
    });
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < openTasks.length; index++) {
        const element = openTasks[index];
        let openIndex = index + "o"
        document.getElementById('open').innerHTML += generateTodoHTML(element, openIndex);
        updateToDo(element, openIndex);
    }
}


// Update container with status == 'progress'.
function updateHTMLInProgessTasks() {
    let progress = tasks.filter((task) => {
        return task['status'] == '2'
    });
    document.getElementById('progress').innerHTML = '';
    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        let progressIndex = index + "p";
        document.getElementById('progress').innerHTML += generateTodoHTML(element, progressIndex);
        updateToDo(element, progressIndex);
    }
}


// Update container with status == 'feedback'.
function updateHTMLFeedbackTasks() {
    let feedback = tasks.filter((task) => {
        return task['status'] == '3'
    });
    document.getElementById('feedback').innerHTML = '';
    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        let feedbackIndex = index + "f";
        document.getElementById('feedback').innerHTML += generateTodoHTML(element, feedbackIndex);
        7
        updateToDo(element, feedbackIndex);

    }
}

// Update container with status == 'closed'.
function updateHTMLClosedTasks() {
    let closed = tasks.filter((task) => {
        return task['status'] == '4'
    });
    document.getElementById('closed').innerHTML = '';
    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        let closedIndex = index + "c";
        document.getElementById('closed').innerHTML += generateTodoHTML(element, closedIndex);
        updateToDo(element, closedIndex);

    }

}

function updateToDo(element, index) {
    getName(element, index);
    getSubtask(element, index);
}

// Dragging elements based on IDs. 
function startDragging(id) {
    currentDraggedElement = id;
}

function getName(task, index) {
    let splitUsers = task.user.split('/');
    splitUsers.splice(-1)
    let placeUser = 0;
    for (let i = 0; i < splitUsers.length; i++) {
        const splitUser = splitUsers[i];
        let Characters = "";
        let string = splitUser.toString();
        len = string.length

        for (let i = 0; i < len; i++) {
            if (string[i] === string[i].toUpperCase())
                Characters = Characters + string[i]
        }
        let letters = Characters.replace(/[^\w\s!?]/g, '')

        document.getElementById('checkUsers' + index).innerHTML += `<div class="todo_contact_img" id="checkUser${index}${i}">${letters[0]}${letters[1]}</div>`

        placeUser = 1.75 * i;
        if (i > 0) {
            document.getElementById('checkUser' + index + i).style.left = placeUser + 'rem'
        }

        addUserToBoard(index, splitUser, i, task)
    }
}

function addUserToBoard(index, splitUser, i, task) {
    let filteredcontacts = contacts.filter((contact) => {
        if (splitUser.includes(contact.lastName))
            return contact
    });
    document.getElementById('checkUser' + index + i).style.backgroundColor = filteredcontacts[0].color;
    document.getElementById('checkCategory' + index).style.backgroundColor = task.categories[0].color
}


/*    

   
*/


function getSubtask(element, index) {
    let doneTasks = 0;
    let TaskTotal = element.subtasks.length
    element.subtasks.forEach(subtask => {
        if (subtask.done === true) {
            doneTasks + 1;
        }
    });
    if (TaskTotal > 0) {
        document.getElementById('boxSubTask' + index).innerHTML = generateSubtasks(doneTasks, TaskTotal, index);

        let taskPercentDone = doneTasks / TaskTotal;
        document.getElementById('subtaskBar' + index).style.width = taskPercentDone;
    }
}

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
    requestStatus(filteredTask)
}

function setDate(date) {
    let year = date.substr(0, 4)
    let month = date.substr(5, 2)
    let day = date.substr(8, 2)
    date = month + "/" + day + "/" + year
    return date
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

function removeHighlight(id) {
    let element = document.getElementById(id);
    element.removeChild(element.lastChild);
}

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
    document.getElementById('overlayTask').classList.toggle("d_none");
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
            <div id="boxSubTask${index}" class="box_subcategories">
            
            </div>
            <div class="todo_user_priority">
                <div class="box_todo_contact_img" id="checkUsers${index}"></div>
                <img class="priority_icon" src=${element['image']}>
            </div>
        </div>
    </div>
    `
}

function generateSubtasks(doneTasks, TaskTotal, index) {
    return `
    <div class="box_subtask_bar">
        <div id="subtaskBar${index}" class="subtask_bar"></div>
    </div>
    <div class="box_subtask_num">
        <p class="subtask_num">${doneTasks}/${TaskTotal}</p>
        <p class="subtask_text">Done</p>
    </div>
    `


}