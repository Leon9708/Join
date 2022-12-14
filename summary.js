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

let tasks;
let tasksTotal = document.getElementById('tasksTotal');
let tasksProgress = document.getElementById('tasksProgress');
let tasksAwaitingFeedback = document.getElementById('tasksAwaitingFeedback');
let tasksDone = document.getElementById('tasksDone');
let tasksTodo = document.getElementById('tasksTodo')


async function render() {
    await getTodos();
    displayInfo();
}

function displayInfo() {
    tasksTotal.innerHTML = tasks.length;
    filterInProgress();
    filterAwaitingFeedback();
    filterDone();
    filterTodo();
}

function filterDone() {
    let filteredtasksDone = tasks.filter(function(task) {
        return task.status === 'Done';
    });
    if (filteredtasksDone.length === 0) {
        tasksDone.innerHTML = 0;
    } else {
        tasksDone.innerHTML = filteredtasksDone.length;
    }
}

function filterTodo() {
    let filteredTodo = tasks.filter(function(task) {
        return task.status === 'To do';
    });
    if (filteredTodo.length === 0) {
        tasksTodo.innerHTML = 0;
    } else {
        tasksTodo.innerHTML = filteredTodo.length;
    }
}

function filterAwaitingFeedback() {
    let filteredAwaitingFeedback = tasks.filter(function(task) {
        return task.status === 'Awaiting Feedback';
    });
    if (filteredAwaitingFeedback.length === 0) {
        tasksAwaitingFeedback.innerHTML = 0;
    } else {
        tasksAwaitingFeedback.innerHTML = filteredAwaitingFeedback.length;
    }
}

function filterInProgress() {
    let filteredTasksProgress = tasks.filter(function(task) {
        return task.status === 'In progress';
    });
    if (filteredTasksProgress.length === 0) {
        tasksProgress.innerHTML = 0;
    } else {
        tasksProgress.innerHTML = filteredTasksProgress.length;
    }
}



function showDeadline() {
    document.getElementById('showDeadline').innerHTML = showDeadlineHTML();
}

/* function showDeadlineHTML() {
    return ` 
    <img class="urgency_logo_summary" src="./assets/img/urgency_high.png" alt="">
    <div class="box_urgency_info_summary">
        <p id="urgencyNum" class="urgency_num_summary">1</p>
        <p id="urgencyText" class="urgency_text_summary">Urgent</p>
    </div>`
} */