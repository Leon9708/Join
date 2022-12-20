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
let tasksTodo = document.getElementById('tasksTodo');


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
    showDeadline();
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
    const sortafterDate = tasks.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    })
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    let closestDate = new Date(sortafterDate[sortafterDate.length - 1].due_date);
    let closestDateMonth = months[closestDate.getMonth()];
    let closestDateDay = closestDate.getDay()
    let closestDateYear = closestDate.getFullYear();

    document.getElementById('displayDate').innerHTML = `${closestDateMonth} ${closestDateDay}, ${closestDateYear}`;
    showPriority(sortafterDate);
}

function showPriority(sortafterDate) {
    let prio = sortafterDate[sortafterDate.length - 1].priority
    if (prio === 'M') {
        prio = "Medium"
    } else if (prio === 'L') {
        prio = "Low"
    } else if (prio === 'H') {
        prio = "Urgent"
    }

    document.getElementById('urgencyText').innerHTML = prio
}