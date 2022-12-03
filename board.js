function renderBoard() {      
    updateHTML();                               
} 
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
    'priority': 'urgent',
    'user': 'Name1',
    'due_date': 0,
    'status': 'open',
}, {
    'id': 1,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'urgent',
    'user': 'Name2',
    'due_date': 0,
    'status': 'feedback',
}, {
    'id': 2,
    'title': 'Call Media',
    'description': 'To this or that...',
    'category': 'Media',
    'priority': 'urgent',
    'user': 'Name2',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 3,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'urgent',
    'user': 'Name3',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 4,
    'title': 'Call Marketing',
    'description': 'To this or that...',
    'category': 'Marketing',
    'priority': 'urgent',
    'user': 'Name5',
    'due_date': 0,
    'status': 'progress',
}, {
    'id': 5,
    'title': 'Call Sales',
    'description': 'To this or that...',
    'category': 'Sales',
    'priority': 'urgent',
    'user': 'Name6',
    'due_date': 0,
    'status': 'feedback',
}, {
    'id': 6,
    'title': 'Call Backoffice',
    'description': 'To this or that...',
    'category': 'Backoffice',
    'priority': 'urgent',
    'user': 'Name6',
    'due_date': 0,
    'status': 'closed',
}, {
    'id': 7,
    'title': 'Call Media',
    'description': 'To this or that...',
    'category': 'Media',
    'priority': 'urgent',
    'user': 'Name3',
    'due_date': 0,
    'status': 'closed'
}];


let currentDraggedElement;


// Update container with Todo-Tasks based on status ('open', 'in progress', 'awaiting feedback', 'done')
function updateHTML() {
    updateHTMLOpenTasks();
    updateHTMLInProgessTasks(); 
    updateHTMLFeedbackTasks();
    updateHTMLClosedTasks()
}


// Update container with status == 'open'.
function updateHTMLOpenTasks() {
    let open = todos.filter(t => t['status'] == 'open');
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }
}


// Update container with status == 'progress'.
function updateHTMLInProgessTasks() {
    let progress = todos.filter(t => t['status'] == 'progress');
    document.getElementById('progress').innerHTML = '';
    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').innerHTML += generateTodoHTML(element);
    }
}


// Update container with status == 'feedback'.
function updateHTMLFeedbackTasks() {
    let feedback = todos.filter(t => t['status'] == 'feedback');
    document.getElementById('feedback').innerHTML = '';
    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').innerHTML += generateTodoHTML(element);
    }
}


// Update container with status == 'closed'.
function updateHTMLClosedTasks() {
    let closed = todos.filter(t => t['status'] == 'closed');
    document.getElementById('closed').innerHTML = '';
    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element);
    }
}


// Dragging elements based on IDs. 
function startDragging(id) {
currentDraggedElement = id;
}


function generateTodoHTML(element) {
return `
<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">
    <div class="todo_content">
        <div class="bg_category" id="checkCategory">${element['category']}</div>
        <div class="bg_title" id="checkTitle"><b>${element['title']}</b></div>
        <div class="bg_description" id="checkDescription">${element['description']}</div>
        <div class="todo_user_priority">
            <div class="todo_contact_img">AB</div>
            <div class="bg_priority" id="checkPriority">${element['priority']}</div>
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


// Match Colors
function checkPriority() {
    'urgent'
    
}


// Matching colors (border-color) with Pokemon types
function matchCategoryColor(element){
    let categoryBackground = document.getElementById(`checkCategory${element['category']}`);
    if (categoryBackground == 'Media') {
        document.getElementById('checkCategory').classList.add('bg_media');
    }
    if (categoryBackground == 'Design') {
        document.getElementById('checkCategory').classList.add('bg_design');
    }
    if (categoryBackground == 'Marketing') {
        document.getElementById('checkCategory').classList.add('bg_marketing');
    }
    if (categoryBackground == 'Backoffice') {
        document.getElementById('checkCategory').classList.add('bg_backoffice');
    }
    if (categoryBackground == 'Sales') {
        document.getElementById('checkCategory').classList.add('bg_sales');
    }
    if (categoryBackground == 'None') {
        document.getElementById('checkCategory').classList.add('bg_none');
    } 
}