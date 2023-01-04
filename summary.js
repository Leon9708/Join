async function renderSummary() {
    await getTodoss()
    tasksProgress = document.getElementById('tasksProgress');
    tasksAwaitingFeedback = document.getElementById('tasksAwaitingFeedback');
    tasksDone = document.getElementById('tasksDone');
    tasksTodo = document.getElementById('tasksTodo');
    displayInfo();

}

async function getTodoss() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/todos/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        tasks = await responseServer.json();
    } catch (error) {
        console.error(error)
    }
    taskss = tasks
}

let taskss;
let tasksProgress;
let tasksAwaitingFeedback;
let tasksDone;
let tasksTodo;



function displayInfo() {
    console.log(taskss)
    document.getElementById('tasksTotal').innerHTML = taskss.length;
    filterInProgress();
    filterAwaitingFeedback();
    filterDone();
    filterTodo();
    showDeadline();
}

function filterDone() {
    let filteredtasksDone = taskss.filter(function(task) {
        return task.status === 'Done';
    });
    if (filteredtasksDone.length === 0) {
        tasksDone.innerHTML = 0;
    } else {
        tasksDone.innerHTML = filteredtasksDone.length;
    }
}

function filterTodo() {
    let filteredTodo = taskss.filter(function(task) {
        return task.status === 'To do';
    });
    if (filteredTodo.length === 0) {
        tasksTodo.innerHTML = 0;
    } else {
        tasksTodo.innerHTML = filteredTodo.length;
    }
}

function filterAwaitingFeedback() {
    let filteredAwaitingFeedback = taskss.filter(function(task) {
        return task.status === 'Awaiting Feedback';
    });
    if (filteredAwaitingFeedback.length === 0) {
        tasksAwaitingFeedback.innerHTML = 0;
    } else {
        tasksAwaitingFeedback.innerHTML = filteredAwaitingFeedback.length;
    }
}

function filterInProgress() {
    let filteredTasksProgress = taskss.filter(function(task) {
        return task.status === 'In progress';
    });
    if (filteredTasksProgress.length === 0) {
        tasksProgress.innerHTML = 0;
    } else {
        tasksProgress.innerHTML = filteredTasksProgress.length;
    }
}

function showDeadline() {
    const sortafterDate = taskss.sort(function(a, b) {
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
    let imgPrio;
    let colorBackground;
    if (prio === 'M') {
        prio = "Medium"
        imgPrio = "./assets/img/medium_clicked_task.png"
        colorBackground = "#FFA800"
    } else if (prio === 'L') {
        prio = "Low"
        imgPrio = "./assets/img/low_clicked_task.png"
        colorBackground = "#FFA800"
    } else if (prio === 'H') {
        prio = "Urgent"
        imgPrio = "./assets/img/urgent_clicked_task.png"
        colorBackground = "#7AE229"
    }
    document.getElementById('boxPrioImg').style.backgroundColor = colorBackground
    document.getElementById('prioImg').src = imgPrio
    document.getElementById('urgencyText').innerHTML = prio
}