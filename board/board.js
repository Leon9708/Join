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
    let date = correctDate(filteredTask[0].due_date)
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
    getPrio(element, index);
}



function getName(task, index) {
    let splitUsers = task.user.split('/');
    splitUsers.splice(-1)

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

        addUserToBoard(index, splitUser, i, task, letters)
    }
}

function getSubtask(task, index) {
    let doneTasks = 0;
    let TaskTotal = task.subtasks.length
    task.subtasks.forEach(subtask => {
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

function getPrio(task, index) {
    if (task.priority === 'H') {
        document.getElementById('prio' + index).src = "../assets/img/urgent_task.png"
    } else if (task.priority === "M") {
        document.getElementById('prio' + index).src = "../assets/img/medium_task.png"
    } else if (task.priority === 'L') {
        document.getElementById('prio' + index).src = "../assets/img/low_task.png"
    }
}

function addUserToBoard(index, splitUser, i, task, letters) {
    let placeUser = 0;
    document.getElementById('checkUsers' + index).innerHTML += `<div class="todo_contact_img" id="checkUser${index}${i}">${letters[0]}${letters[1]}</div>`

    placeUser = 1.75 * i;
    if (i > 0) {
        document.getElementById('checkUser' + index + i).style.left = placeUser + 'rem'
    }
    let filteredcontacts = contacts.filter((contact) => {
        if (splitUser.includes(contact.lastName))
            return contact
    });
    document.getElementById('checkUser' + index + i).style.backgroundColor = filteredcontacts[0].color;
    document.getElementById('checkCategory' + index).style.backgroundColor = task.categories[0].color
}

function correctDate(date) {
    if (!date.includes('/')) {
        let year = date.substr(0, 4)
        let month = date.substr(5, 2)
        let day = date.substr(8, 2)
        date = month + "/" + day + "/" + year
    }
    return date

}


// Needed to make dropping elements possible. 
function allowDrop(ev) {
    ev.preventDefault();
}

// Dragging elements based on IDs. 
function startDragging(id) {
    currentDraggedElement = id;
}

// Change status when element is moved (E.g. todo-task with id 1: the status field is changed from 'open' to 'closed'.).
function moveTo(status) {
    let filteredTask = tasks.filter((task) => {
        return task['id'] === currentDraggedElement
    });
    filteredTask[0]['status'] = status;
    requestStatus(filteredTask)
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

function toggleTask(id) {
    document.getElementById('overlayTask').classList.toggle("d_none");
    if (!overlayTask.classList.contains('d_none')) {
        document.getElementById('overlayTask').innerHTML = taskOverlayHTML(id);
    }
}

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
                <img id="prio${index}" class="priority_icon" src="">
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

function taskOverlayHTML(id) {
    return `
<div class="background_overlay">
<div class="overlay_add_task">
<div class="place_add_task">
    <button onclick="toggleTask()" class="close_overlay_task">
        <img class="img_close_overlay_task" src="../assets/img/cross.png" alt="">
    </button>
    <div class="container_heading_task">
        <h1 class="heading_task">Add Task</h1>
    </div>
    <div>
        <form>
            <div class="main">
                <div class="place_input_left_task">
                    <div class="container_input_task">
                        <label>Title</label>
                        <input id="inputTitle" required class="input_task" minlength="3" maxlength="30" type="text" placeholder="Enter a title">
                    </div>
                    <div class="container_input_task">
                        <label>Description</label>
                        <textarea id="inputDescription" class="input_task_description" type="text" placeholder="Enter a Description"></textarea>
                    </div>
                    <div class="select_group">
                        <label class="label_select" for="button">Category</label>
                        <div id="placeSelectCategory" class="place_select_category">
                            <button type='button' onclick="toggleDropdown()" id="selectButtonTask" class="select_button_task">
                            <span class="select_label" id="selectedLabel">Select task category</span>
                            <div id="selectedColor" class="button_color selected_category_color"></div>
                            <div id="arrow" class="arrow"></div>
                        </button>
                        </div>
                        <div class="dropdown display_none" id="dropdown">
                            <div id="newCategory" onclick="selectTitle(this.id)" class="box_categoryelement">
                                <input type="radio" name="where" value="internet" class="option">
                                <label id="newCategory" class="select-item">New category</label>
                            </div>
                            <div id="addCategory">

                            </div>
                        </div>
                    </div>
                    <div class="select_group_2">
                        <label class="label_select " for="button">Assigned to</label>
                        <div id="placeSelectCategory2 " class="place_select_category">
                            <button type='button' onclick="toggleDropdownUser()" id="selectButtonTask2" class="select_button_task ">
                            <span class="select_label" id="selectedUser">Select user</span>
                            <div id="arrow " class="arrow "></div>
                        </button>
                        </div>
                        <div class="dropdown display_none" id="dropdown2">
                            <div id="addUser">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seperation_task "></div>
                <div class="place_input_right_task ">
                    <div class="container_input_task ">
                        <label>Due date</label>
                        <div class="box_input_date ">
                            <input id="inputDate" type="date" class="input_task" required>
                        </div>
                    </div>
                    <div class="container_input_task ">
                        <label>Prio</label>
                        <div id="containerButtonsTask" class="container_buttons_task ">
                            <button type='button' id="urgentButton" onclick="selectUrgency( 'urgent') " class="box_button_task ">
                        <p class="text_urgency_task ">Urgent</p>
                        <div id="prioUrgent" class="urgency_img_u_task urgency_img_task "></div>
                    </button>
                            <button type='button' id="mediumButton" onclick="selectUrgency( 'medium') " class="box_button_task ">
                        <p class="text_urgency_task ">Medium</p>
                    <div id="prioMedium" class="urgency_img_m_task urgency_img_task "></div>
                    </button>
                            <button type='button' id="lowButton" onclick="selectUrgency( 'low') " class="box_button_task ">
                        <p class="text_urgency_task ">Low</p>
                    <div id="prioLow" class="urgency_img_l_task urgency_img_task "></div>
                    </button>
                        </div>
                    </div>
                    <div class="container_input_task">
                        <label>Subtasks</label>
                        <div class="container_subtask" id="containerSubtask">
                            <button type='button' onclick="openSubtask()" id="boxSubtaskInput" class="box_subtask_input">
                            <input required minlength="3" disabled="disabled" placeholder="Add new subtask" id="inputSubtask" type="text" class="input_subtask_fake">
                            <div  class="button_subtask_input">
                            <img class="img_subtask_task" src="../assets/img/plus_task.png" alt="#">
                            </div>
                        </button>
                        </div>
                        <div id="boxSubtasks" class="place_subtasks">

                        </div>
                    </div>
                    <div class="container_buttons_bottom_task ">
                        <button onclick="clearInputAddTask()" type='button' class="clear_button_task ">
                        <p class="text_clear_task ">Clear</p>
                        <div class="img_clear_task "></div>
                        </button>
                        <button onclick="checkValdation(${id});" type="button" value="submit" class="create_button_task ">
                        <p class=" ">Create Task</p>
                        <img src="../assets/img/check_white_task.png " alt="# ">
                    </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
</div>
`
}