function renderBoard() {      
    updateHTML();                               
} 


// Placeholder!! Needs to be filled with input from 'Add Task'-field. 
let todos = [{
    'id': 0,
    'title': 'Design',
    'category': 'open',
}, {
    'id': 1,
    'title': 'Sales',
    'category': 'progress',
}, {
    'id': 2,
    'title': 'Backoffice',
    'category': 'closed',
},  {
    'id': 3,
    'title': 'Media',
    'category': 'feedback',
}];


let currentDraggedElement;


// Update container with Todo-Tasks based on categories ('open', 'in progress', 'awaiting feedback', 'done')
function updateHTML() {
    updateHTMLOpenTasks();
    updateHTMLInProgessTasks(); 
    updateHTMLFeedbackTasks();
    updateHTMLClosedTasks()
}


// Update container with category == 'open'.
function updateHTMLOpenTasks() {
    let open = todos.filter(t => t['category'] == 'open'); // filtert alle Todos in der Kategorie 'open'
    document.getElementById('open').innerHTML = '';
    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }
}


// Update container with category == 'progress'.
function updateHTMLInProgessTasks() {
    let progress = todos.filter(t => t['category'] == 'progress'); // filtert alle Todos in der Kategorie 'closed'
    document.getElementById('progress').innerHTML = '';
    for (let index = 0; index < progress.length; index++) {
        const element = progress[index];
        document.getElementById('progress').innerHTML += generateTodoHTML(element);
    }
}


// Update container with category == 'feedback'.
function updateHTMLFeedbackTasks() {
    let feedback = todos.filter(t => t['category'] == 'feedback'); // filtert alle Todos in der Kategorie 'closed'
    document.getElementById('feedback').innerHTML = '';
    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').innerHTML += generateTodoHTML(element);
    }
}


// Update container with category == 'closed'.
function updateHTMLClosedTasks() {
    let closed = todos.filter(t => t['category'] == 'closed'); // filtert alle Todos in der Kategorie 'closed'
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
return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}


// Needed to make dropping elements possible. 
function allowDrop(ev) {
ev.preventDefault();
}


// Change category when element is moved (E.g. todo-task with id 1: the category field is changed from 'open' to 'closed'.).
function moveTo(category) {
todos[currentDraggedElement]['category'] = category;
updateHTML();
}


// Change background color when element is dragged.
function highlight(id) {
document.getElementById(id).classList.add('drag_area_highlight');
}


function removeHighlight(id) {
document.getElementById(id).classList.remove('drag_area_highlight');
}