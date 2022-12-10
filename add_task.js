const dropdown = document.getElementById("dropdown");
const dropdown2 = document.getElementById("dropdown2");
let priority;
let colorID;
let categoryLabels = []
let subtaskID = 0;
let subtasks = []


function createTask() {
    let title = document.getElementById('inputTitle');
    let description = document.getElementById('inputDescription');
    let category = document.getElementById('selectedLabel').innerText;
    let due_date = document.getElementById('inputDate');
    let label = categoryLabels.filter(function(ele) {
        return ele.label === category
    })
    let color = label.color;
    let task = {
        "title": title.value,
        "description": description.value,
        "categories": [{
            "title": label,
            "color": color
        }],
        "prority": priority,
        "due_date": due_date.value,
    }
    title.value = "";
    description.value = "";
    due_date.value = "";
    unsetPrioHTML();
    unsetNewCategory();
    document.getElementById('selectedUser').innerHTML = `Select user`;
}

//first Select section

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
        return ele.label === id
    })
    document.getElementById('selectedLabel').innerHTML = selectedCategory[0].label;
    document.getElementById('selectedColor').style.backgroundColor = selectedCategory[0].color;
}

function openInputCategory() {
    document.querySelector('.place_select_category').innerHTML = generateNewCategoryHTML();
    document.querySelector('.box_buttons_color').innerHTML = generateBoxButtonsHTML();
    createInput();
}

function createNewCategory() {
    let newLabel = document.querySelector('.input_category').value;
    categoryLabels.push({ "label": newLabel, "color": colorID });
    unsetNewCategory();

    let newCategory = categoryLabels[categoryLabels.length - 1].label;
    let newColor = categoryLabels[categoryLabels.length - 1].color;
    document.getElementById('selectedLabel').innerHTML = newCategory;
    document.getElementById('selectedColor').style.backgroundColor = newColor;
    addCategory();
}

function addCategory() {
    document.getElementById('addCategory').innerHTML = "";
    for (let i = 0; i < categoryLabels.length; i++) {
        document.getElementById('addCategory').innerHTML += addCategoryHTML()
        document.getElementById('categoryelement_color' + i).style.backgroundColor = categoryLabels[i].color;
    }
}

function toggleDropdown() {
    if (dropdown2.classList.contains('hidden')) {
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
    document.querySelector('.place_input_category').appendChild(x);
}


function clickedColor(id) {
    colorID = id;
    document.getElementById('boxButtonsColor').innerHTML = generateBoxButtonsHTML();
    document.getElementById(colorID).style.boxShadow = "0 0 2px 0.5px rgba(0, 0, 0, 0.7)"
}

//second Select section

function toggleDropdown2() {
    if (dropdown.classList.contains('hidden')) {
        dropdown2.classList.toggle('hidden');
    }
}

function selectUser(e) {
    let selectedUser = contacts.filter(function(ele) {
        return ele.id === +e
    })
    document.getElementById('selectedUser').innerHTML = `${selectedUser[0].firstName} ${selectedUser[0].name}`;
    toggleDropdown2();
};

function loadUser() {
    document.getElementById('addUser').innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        document.getElementById('addUser').innerHTML += ` 
        <div id="${contact.id}" onclick="selectUser(this.id)" class="box_categoryelement">
            <input type="radio" name="where" value="internet" class="option">
            <label id="newCategory2" class="select-item">${contact.firstName} ${contact.name}</label>
        </div>`
    }
}

//choose Prio 

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
    priority = "urgent";
}

function medium() {
    const medium = document.getElementById("prioMedium");
    document.getElementById('mediumButton').classList.toggle('box_button_task_m');
    medium.classList.toggle('urgency_img_m_clicked_task');
    medium.classList.toggle('urgency_img_m_task');
    priority = "medium";
}

function low() {
    const low = document.getElementById("prioLow");
    document.getElementById('lowButton').classList.toggle('box_button_task_l');
    low.classList.toggle('urgency_img_l_clicked_task');
    low.classList.toggle('urgency_img_l_task');
    priority = "low";
}

//subtask

function openSubtask() {
    document.getElementById('containerSubtask').innerHTML = openSubtaskHTML();
    createInputSubtask();
}

function newSubtask() {
    let newSubtask = document.querySelector('.input_subtask').value;
    if (newSubtask.length >= 3) {
        unsetSubtaskHTML();
        subtaskID++;
        console.log('newSubtask', newSubtask)
        subtasks.push({
            "id": subtaskID,
            "subtask": newSubtask
        })
        loadSubtask();
    }
}

function loadSubtask() {
    document.getElementById('boxSubtasks').innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        document.getElementById('boxSubtasks').innerHTML += subtasksHTML(subtask);
    }
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

function unsetPrioHTML() {
    document.getElementById('containerButtonsTask').innerHTML = `
    <button id="urgentButton" onclick="selectUrgency('urgent')" class="box_button_task ">
        <p class="text_urgency_task">Urgent</p>
        <div id="prioUrgent" class="urgency_img_u_task urgency_img_task"></div>
    </button>
    <button id="mediumButton" onclick="selectUrgency('medium')" class="box_button_task  ">
        <p class="text_urgency_task ">Medium</p>
    <div id="prioMedium" class="urgency_img_m_task urgency_img_task"></div>
    </button>
    <button id="lowButton" onclick="selectUrgency('low')" class="box_button_task ">
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
                <button onclick="unsetNewCategory()"  class="button_input_category">
                    <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
                </button>
                <div class="seperation_buttons_input_category"></div>
                <button onclick="createNewCategory()" class="button_input_category">
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
    <button onclick="clickedColor(this.id)" id="blue" class="button_color color_1"></button>
    <button onclick="clickedColor(this.id)" id="red" class="button_color color_2"></button>
    <button onclick="clickedColor(this.id)" id="green" class="button_color color_3"></button>
    <button onclick="clickedColor(this.id)" id="orange" class="button_color color_4"></button>
    <button onclick="clickedColor(this.id)" id="purple" class="button_color color_5"></button>
    <button onclick="clickedColor(this.id)" id="yellow" class="button_color color_6"></button>`
}


function unsetNewCategoryHTML() {
    return `    
    <button onclick="toggleDropdown()" id="selectButtonTask" class="select_button_task">
        <span class="select_label" id="selectedLabel">Select task category</span>
        <div id="selectedColor" class="button_color"></div>
        <div id="arrow" class="arrow"></div>
    </button>`

}

function addCategoryHTML() {
    return `
        <div id="${categoryLabels[i].label}" onclick="selectTitle(this.id)" class="box_categoryelement">
        <input class="option">
            <label  class="select-item">${categoryLabels[i].label}</label>
            <div id="categoryelement_color${i}" class="button_color categoryelement_color"></div>
        </div>`
}

function openSubtaskHTML() {
    return ` 
    <div class="box_input_category">
        <div id="subtaskInput" class="place_input_category"></div>
        <div class="box_buttons_input_category">
            <button onclick="unsetSubtaskHTML()"  class="button_input_category">
                <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
            </button>
            <div class="seperation_buttons_input_category"></div>
            <button onclick="newSubtask()" class="button_input_category">
                <img class="img_button_input_category" src="assets/img/check_task.png" alt="#">
            </button>
        </div>
    </div>`
}

function unsetSubtaskHTML() {
    document.getElementById('containerSubtask').innerHTML = `
        <button onclick="openSubtask()" id="boxSubtaskInput" class="box_subtask_input">
            <input  disabled="disabled" placeholder="Add new subtask" id="inputSubtask" type="text" class="input_subtask">
            <div  class="button_subtask_input">
                <img class="img_subtask_task" src="./assets/img/plus_task.png" alt="#">
            </div>
        </button>
   `
}

function subtasksHTML(subtask) {
    return `  
    <div class="box_create_subtask">
        <label class="box_checkbox">
            <input type="checkbox" >
            <span class="checkmark"></span>
        </label>
        <p class="subtask" id="subtask${subtask.subtaskID}">${subtask.subtask}</p>
    </div> 
    `
}