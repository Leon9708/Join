async function getCategories() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/categories/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        categoryLabels = await responseServer.json();
        console.log(categoryLabels);
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
        console.log(subtasks);
    } catch (error) {
        console.error(error)
    }
}

async function postTodo(task) {
    const data = JSON.stringify(task);
    console.log('data', data)
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

const dropdown = document.getElementById("dropdown");
const dropdownUser = document.getElementById("dropdown2");

let categoryLabels;
let colorID;
let priority;
let subtasks;
let date;
let chosenSubtasks = [];


async function renderTask() {
    await getSubtasks();
    await getCategories();
    loadSubtask();
    loadCategory();
    loadUser();
}

function checkValdation() {
    let user = document.getElementById('selectedUser').innerText;
    let categoryLabel = document.getElementById('selectedLabel').innerText;
    let filteredLabels = categoryLabels.filter((ele) => {
        return ele.title === categoryLabel;
    });
    let filteredcontact = contacts.filter((ele) => {
        return user.includes(ele.lastName)
    })
    if (filteredLabels.length > 0 && filteredcontact.length > 0 && priority.length > 0 && chosenSubtasks.length > 0) {
        createTask(user, filteredLabels);
    } else {
        alert("unvalid Request, try again.")
    }

}

function createTask(user, filteredLabels) {
    let title = document.getElementById('inputTitle');
    let description = document.getElementById('inputDescription');
    setDate();
    let task = {
        "title": title.value,
        "description": description.value,
        "categories": [{
            "id": filteredLabels[0].id,
            "title": filteredLabels[0].title,
            "color": filteredLabels[0].color
        }],
        "priority": priority,
        "user": user,
        "due_date": date,
        "status": 1,
        "subtasks": chosenSubtasks
    }
    postTodo(task);
    setBackFormular(title, description)
}

function setBackFormular(title, description) {
    title.value = "";
    description.value = "";
    document.getElementById('inputDate').value = "";
    document.getElementById('selectedUser').innerHTML = `Select user`;
    unsetPrioHTML();
    unsetNewCategory();
    loadSubtask()
}

// category selection

function selectTitle(id) {
    if (id === 'newCategory') {
        openInputCategory();
    } else {
        selectedCategory(id);
    }
    toggleDropdown();
};

function selectedCategory(id) {
    let selectedCategory = categoryLabels.filter(function(ele) {
        return ele.title === id
    })
    document.getElementById('selectedLabel').innerHTML = selectedCategory[0].title;
    document.getElementById('selectedColor').style.backgroundColor = selectedCategory[0].color;
}

function openInputCategory() {
    document.querySelector('.place_select_category').innerHTML = generateNewCategoryHTML();
    document.querySelector('.box_buttons_color').innerHTML = generateBoxButtonsHTML();
    createInput();
}

function createNewCategory() {
    let newLabel = document.querySelector('.input_category').value;
    let id = categoryLabels.length + 1;
    categoryLabels.push({ "id": id, "title": newLabel, "color": colorID });
    unsetNewCategory();

    let newCategory = categoryLabels[categoryLabels.length - 1].title;
    let newColor = categoryLabels[categoryLabels.length - 1].color;
    document.getElementById('selectedLabel').innerHTML = newCategory;
    document.getElementById('selectedColor').style.backgroundColor = newColor;
    loadCategory();
}

function loadCategory() {
    document.getElementById('addCategory').innerHTML = "";
    for (let i = 0; i < categoryLabels.length; i++) {
        document.getElementById('addCategory').innerHTML += addCategoryHTML(i)
        document.getElementById('categoryelement_color' + i).style.backgroundColor = categoryLabels[i].color;
    }
}

function toggleDropdown() {
    if (dropdownUser.classList.contains('hidden')) {
        dropdown.classList.toggle("hidden");
    }
}

function unsetNewCategory() {
    document.querySelector('.place_select_category').innerHTML = unsetNewCategoryHTML();
    document.getElementById('selectedLabel').innerHTML = "select task category"
}


function createInput() {
    x = document.createElement('INPUT');
    x.setAttribute('class', 'input_category');
    x.setAttribute('type', 'text');
    x.setAttribute('placeHolder', 'Enter your category');
    x.setAttribute('maxLength', '25');
    x.setAttribute('minLength', '3')
    x.setAttribute('id', 'inputCategory')
    x.setAttribute('name', 'newCategory')
    document.querySelector('.place_input_category').appendChild(x);
}


function clickedColor(id) {
    colorID = id;
    document.getElementById('boxButtonsColor').innerHTML = generateBoxButtonsHTML();
    document.getElementById(colorID).style.boxShadow = "0 0 2px 0.5px rgba(0, 0, 0, 0.7)"
}

//user selection

function toggleDropdownUser() {
    if (dropdown.classList.contains('hidden')) {
        dropdownUser.classList.toggle('hidden');
    }
}

function selectUser(e) {
    let selectedUser = contacts.filter(function(ele) {
        return ele.id === +e
    })
    document.getElementById('selectedUser').innerHTML = `${selectedUser[0].firstName} ${selectedUser[0].lastName}`;
    toggleDropdownUser();
};

function loadUser() {
    document.getElementById('addUser').innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        document.getElementById('addUser').innerHTML += ` 
        <div id="${contact.id}" onclick="selectUser(this.id)" class="box_categoryelement">
            <input type="radio" name="where" value="internet" class="option">
            <label id="newCategory2" class="select-item">${contact.firstName} ${contact.lastName}</label>
        </div>`
    }
}

// input date

/* 
inputDate.min = new Date().toISOString().split("T")[0]; */

function setDate() {
    let due_date_rev = document.getElementById('inputDate').value;
    let year = due_date_rev.substr(0, 4)
    let month = due_date_rev.substr(5, 2)
    let day = due_date_rev.substr(8, 2)
    date = month + "/" + day + "/" + year
}

// choose prio

function selectUrgency(prio) {
    if (prio === 'urgent') {
        unsetPrioHTML();
        urgent();
    } else if (prio === "medium") {
        unsetPrioHTML();
        medium();
    } else if (prio === 'low') {
        unsetPrioHTML();
        low();
    }
}

function urgent() {
    const urgent = document.getElementById("prioUrgent");
    document.getElementById('urgentButton').classList.toggle('box_button_task_u');
    urgent.classList.toggle('urgency_img_u_clicked_task');
    urgent.classList.toggle('urgency_img_u_task');
    priority = "H";
}

function medium() {
    const medium = document.getElementById("prioMedium");
    document.getElementById('mediumButton').classList.toggle('box_button_task_m');
    medium.classList.toggle('urgency_img_m_clicked_task');
    medium.classList.toggle('urgency_img_m_task');
    priority = "M";
}

function low() {
    const low = document.getElementById("prioLow");
    document.getElementById('lowButton').classList.toggle('box_button_task_l');
    low.classList.toggle('urgency_img_l_clicked_task');
    low.classList.toggle('urgency_img_l_task');
    priority = "L";
}

//subtask

function openSubtask() {
    document.getElementById('containerSubtask').innerHTML = openSubtaskHTML();
    createInputSubtask();
}

function CreateNewSubtask(newSubtask) {
    let status = false;
    let statusStr = status.toString();
    subtasks.push({
        "title": newSubtask,
        "status": statusStr
    });
    document.getElementById('boxSubtasks').innerHTML += subtasksHTML(subtasks[subtasks.length - 1], (subtasks.length - 1));
    unsetSubtaskHTML();
}

function filterSubtaskDuplicates() {
    let newSubtask = document.querySelector('.input_subtask').value
    const filteredSubtask = subtasks.filter((subtask) => {
        return subtask.title == newSubtask
    }).length > 0
    if (filteredSubtask) {
        alert('Subtask already exsits')
        unsetSubtaskHTML();
    } else {
        CreateNewSubtask(newSubtask)
    }

}

function loadSubtask() {
    document.getElementById('boxSubtasks').innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];

        document.getElementById('boxSubtasks').innerHTML += subtasksHTML(subtask, i);
    }
}

function checkedSubtask(id) {
    let checkbox = document.getElementById(id);
    if (checkbox.checked === true) {
        let subtask = subtasks.filter(function(ele) {
            return ele.title === document.getElementById('subtask' + id).innerHTML;
        });
        chosenSubtasks.push(subtask[0]);
    } else {
        let chosenSubtask = chosenSubtasks.filter(function(ele) {
            return ele.title === document.getElementById('subtask' + id).innerHTML;
        });
        let index = chosenSubtasks.indexOf(chosenSubtask[0])
        chosenSubtasks.splice(index, 1)
    }
    console.log(chosenSubtasks)
}

function createInputSubtask() {
    x = document.createElement('INPUT');
    x.setAttribute('class', 'input_subtask');
    x.setAttribute('type', 'text');
    x.setAttribute('placeHolder', 'Add new subtask');
    x.setAttribute('maxLength', '25');
    x.setAttribute('minLength', '3')
    x.setAttribute('id', 'inputSubtask')
    document.getElementById('subtaskInput').appendChild(x);
}

// change HTML 

function unsetPrioHTML() {
    document.getElementById('containerButtonsTask').innerHTML = `
    <button type="button" id="urgentButton" onclick="selectUrgency('urgent')" class="box_button_task ">
        <p class="text_urgency_task">Urgent</p>
        <div id="prioUrgent" class="urgency_img_u_task urgency_img_task"></div>
    </button>
    <button type="button" id="mediumButton" onclick="selectUrgency('medium')" class="box_button_task  ">
        <p class="text_urgency_task ">Medium</p>
    <div id="prioMedium" class="urgency_img_m_task urgency_img_task"></div>
    </button>
    <button type="button" id="lowButton" onclick="selectUrgency('low')" class="box_button_task ">
        <p class="text_urgency_task ">Low</p>
    <div id="prioLow" class="urgency_img_l_task urgency_img_task"></div>
    </button>   `
}

function generateNewCategoryHTML() {
    return `   
    <div class="container_input_category">
        <div class="box_input_category">
            <div id="BoxInputCategory" class="place_input_category"></div>
            <div class="box_buttons_input_category">
                <button type="button" onclick="unsetNewCategory()"  class="button_input_category">
                    <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
                </button>
                <div class="seperation_buttons_input_category"></div>
                <button type="submit" name="newCategory" onclick="createNewCategory()" class="button_input_category">
                    <img class="img_button_input_category" src="assets/img/check_task.png" alt="#">
                </button>
            </div>
        </div>
        <div id="boxButtonsColor" class="box_buttons_color">
      
        </div>
    </div>`
}

function generateBoxButtonsHTML() {
    return `     
    <button type="button" onclick="clickedColor(this.id)" id="blue" class="button_color color_1"></button>
    <button type="button" onclick="clickedColor(this.id)" id="red" class="button_color color_2"></button>
    <button type="button" onclick="clickedColor(this.id)" id="green" class="button_color color_3"></button>
    <button type="button" onclick="clickedColor(this.id)" id="orange" class="button_color color_4"></button>
    <button type="button" onclick="clickedColor(this.id)" id="purple" class="button_color color_5"></button>
    <button type="button" onclick="clickedColor(this.id)" id="yellow" class="button_color color_6"></button>`
}


function unsetNewCategoryHTML() {
    return `    
    <button type="button" onclick="toggleDropdown()" id="selectButtonTask" class="select_button_task">
        <span class="select_label" id="selectedLabel">Select task category</span>
        <div id="selectedColor" class="button_color"></div>
        <div id="arrow" class="arrow"></div>
    </button>`

}

function addCategoryHTML(i) {
    return `
        <div id="${categoryLabels[i].title}" onclick="selectTitle(this.id)" class="box_categoryelement">
        <input class="option">
            <label  class="select-item">${categoryLabels[i].title}</label>
            <div id="categoryelement_color${i}" class="button_color categoryelement_color"></div>
        </div>`
}

function openSubtaskHTML() {
    return ` 
    <div class="box_input_category">
        <div id="subtaskInput" class="place_input_category"></div>
        <div class="box_buttons_input_category">
            <button type="button" onclick="unsetSubtaskHTML()"  class="button_input_category">
                <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
            </button>
            <div class="seperation_buttons_input_category"></div>
            <button type="button" onclick="filterSubtaskDuplicates()" class="button_input_category">
                <img class="img_button_input_category" src="assets/img/check_task.png" alt="#">
            </button>
        </div>
    </div>`
}

function unsetSubtaskHTML() {
    document.getElementById('containerSubtask').innerHTML = `
        <button type="button" onclick="openSubtask()" id="boxSubtaskInput" class="box_subtask_input">
            <input  disabled="disabled" placeholder="Add new subtask" id="inputSubtask" type="text" class="input_subtask">
            <div  class="button_subtask_input">
                <img class="img_subtask_task" src="./assets/img/plus_task.png" alt="#">
            </div>
        </button>
   `
}

function subtasksHTML(subtask, i) {
    return `    
    <div class="box_create_subtask">
        <label class="box_checkbox">
            <input onclick="checkedSubtask(this.id)" id="${i}" type="checkbox" >
            <span  class="checkmark"></span>
        </label>
        <p class="subtask" id="subtask${i}">${subtask.title}</p>
    </div> 
    `
}