let colorIDs;
let prioritys;
let dates;
let chosenSubtaskss = [];


function renderTasks() {
    loadSubtasks();
    loadCategorys();
    loadUsers();
    inputDates.min = new Date().toISOString().split("T")[0];
}

function checkValdations() {
    let user = document.getElementById('selectedUsers').innerText;
    let categoryLabel = document.getElementById('selectedLabels').innerText;
    let filteredLabels = categoryLabels.filter((ele) => {
        return ele.title === categoryLabel;
    });
    let filteredcontact = contacts.filter((ele) => {
        return user.includes(ele.lastName)
    })
    if (filteredLabels.length > 0 && filteredcontact.length > 0 && prioritys.length > 0 && chosenSubtaskss.length > 0) {
        createTasks(user, filteredLabels);
    } else {
        alert("unvalid Request, try again.")
    }

}

function createTasks(user, filteredLabels) {
    let title = document.getElementById('inputTitles');
    let description = document.getElementById('inputDescriptions');
    setDates();
    let task = {
        "title": title.value,
        "description": description.value,
        "categories": [{
            "id": filteredLabels[0].id,
            "title": filteredLabels[0].title,
            "color": filteredLabels[0].color
        }],
        "priority": prioritys,
        "user": user,
        "due_date": dates,
        "status": 1,
        "subtasks": chosenSubtaskss
    }
    postTodos(task);
    setBackFormulars(title, description)
}

function setBackFormulars(title, description) {
    title.value = "";
    description.value = "";
    document.getElementById('inputDates').value = "";
    document.getElementById('selectedUsers').innerHTML = `Select user`;
    unsetPrioHTMLs();
    unsetNewCategorys();
    loadSubtasks()
}

// category selection

function selectTitles(id) {
    let eId = id.slice(0, -1)
    if (eId === 'newCategory') {
        openInputCategorys();
    } else {
        selectedCategorys(eId);
    }
    toggleDropdowns();
};

function selectedCategorys(id) {
    let selectedCategory = categoryLabels.filter(function(ele) {
        return ele.title === id
    })
    document.getElementById('selectedLabels').innerHTML = selectedCategory[0].title;
    document.getElementById('selectedColors').style.backgroundColor = selectedCategory[0].color;
}

function openInputCategorys() {
    document.getElementById('placeSelectCategorys').innerHTML = "";
    document.getElementById('placeSelectCategorys').innerHTML = generateNewCategoryHTMLs();
    document.getElementById('boxButtonsColors').innerHTML = generateBoxButtonsHTMLs();
    createInputs();
}

function createNewCategorys() {
    let newLabel = document.getElementById('inputCategorys').value;
    let id = categoryLabels.length + 1;
    categoryLabels.push({ "id": id, "title": newLabel, "color": colorIDs });
    unsetNewCategorys();

    let newCategory = categoryLabels[categoryLabels.length - 1].title;
    let newColor = categoryLabels[categoryLabels.length - 1].color;
    document.getElementById('selectedLabels').innerHTML = newCategory;
    document.getElementById('selectedColors').style.backgroundColor = newColor;
    loadCategorys();
}

function loadCategorys() {
    document.getElementById('addCategorys').innerHTML = "";
    for (let i = 0; i < categoryLabels.length; i++) {
        document.getElementById('addCategorys').innerHTML += addCategoryHTMLs(i)
        document.getElementById('categoryelement_colors' + i).style.backgroundColor = categoryLabels[i].color;
    }
}

function toggleDropdowns() {
    const dropdown = document.getElementById("dropdowns");
    const dropdownUser = document.getElementById("dropdown2s");
    if (dropdownUser.classList.contains('display_none')) {
        dropdown.classList.toggle("display_none");
    }
}

function unsetNewCategorys() {
    document.getElementById('placeSelectCategorys').innerHTML = unsetNewCategoryHTMLs();
    document.getElementById('selectedLabels').innerHTML = "select task category"
}


function createInputs() {
    x = document.createElement('INPUT');
    x.setAttribute('class', 'input_category');
    x.setAttribute('type', 'text');
    x.setAttribute('placeHolder', 'Enter your category');
    x.setAttribute('maxLength', '25');
    x.setAttribute('minLength', '3')
    x.setAttribute('id', 'inputCategorys')
    x.setAttribute('name', 'newCategory')
    document.getElementById('BoxInputCategorys').appendChild(x);
}


function clickedColors(id) {
    colorIDs = id;
    document.getElementById('boxButtonsColors').innerHTML = generateBoxButtonsHTMLs();
    document.getElementById(colorIDs).style.boxShadow = "0 0 2px 0.5px rgba(0, 0, 0, 0.7)"
}

//user selection

function toggleDropdownUsers() {
    const dropdown = document.getElementById("dropdowns");
    const dropdownUser = document.getElementById("dropdown2s");
    if (dropdown.classList.contains('display_none')) {
        dropdownUser.classList.toggle('display_none');
    }
}

function selectUsers(e) {
    let eId = e.slice(0, -1)
    console.log(eId)
    let selectedUser = contacts.filter(function(ele) {
        return ele.id === +eId
    })
    document.getElementById('selectedUsers').innerHTML = `${selectedUser[0].firstName} ${selectedUser[0].lastName}`;
    toggleDropdownUsers();
};

function loadUsers() {
    document.getElementById('addUsers').innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        document.getElementById('addUsers').innerHTML += ` 
        <div id="${contact.id}s" onclick="selectUsers(this.id)" class="box_categoryelement">
            <input type="radio" name="where" value="internet" class="option">
            <label id="newCategory2s" class="select-item">${contact.firstName} ${contact.lastName}</label>
        </div>`
    }
}

// input date




function setDates() {
    let due_date_rev = document.getElementById('inputDates').value;
    let year = due_date_rev.substr(0, 4)
    let month = due_date_rev.substr(5, 2)
    let day = due_date_rev.substr(8, 2)
    dates = month + "/" + day + "/" + year
}

// choose prio

function selectUrgencys(prio) {
    if (prio === 'urgent') {
        unsetPrioHTMLs();
        urgents();
    } else if (prio === "medium") {
        unsetPrioHTMLs();
        mediums();
    } else if (prio === 'low') {
        unsetPrioHTMLs();
        lows();
    }
}

function urgents() {
    const urgent = document.getElementById("prioUrgents");
    document.getElementById('urgentButtons').classList.toggle('box_button_task_u');
    urgent.classList.toggle('urgency_img_u_clicked_task');
    urgent.classList.toggle('urgency_img_u_task');
    prioritys = "H";
}

function mediums() {
    const medium = document.getElementById("prioMediums");
    document.getElementById('mediumButtons').classList.toggle('box_button_task_m');
    medium.classList.toggle('urgency_img_m_clicked_task');
    medium.classList.toggle('urgency_img_m_task');
    prioritys = "M";
}

function lows() {
    const low = document.getElementById("prioLows");
    document.getElementById('lowButtons').classList.toggle('box_button_task_l');
    low.classList.toggle('urgency_img_l_clicked_task');
    low.classList.toggle('urgency_img_l_task');
    prioritys = "L";
}

//subtask

function openSubtasks() {
    document.getElementById('containerSubtasks').innerHTML = openSubtaskHTMLs();
    createInputSubtasks();
}

function CreateNewSubtasks(newSubtask) {
    let status = false;
    let statusStr = status.toString();
    subtasks.push({
        "title": newSubtask,
        "status": statusStr
    });
    document.getElementById('boxSubtaskss').innerHTML += subtasksHTMLs(subtasks[subtasks.length - 1], (subtasks.length - 1));
    unsetSubtaskHTMLs();
}

function filterSubtaskDuplicatess() {
    let newSubtask = document.getElementById('inputSubtasks').value
    const filteredSubtask = subtasks.filter((subtask) => {
        return subtask.title == newSubtask
    }).length > 0
    if (filteredSubtask) {
        alert('Subtask already exsits')
        unsetSubtaskHTMLs();
    } else {
        CreateNewSubtasks(newSubtask)
    }

}

function loadSubtasks() {
    document.getElementById('boxSubtaskss').innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];

        document.getElementById('boxSubtaskss').innerHTML += subtasksHTMLs(subtask, i);
    }
}

function checkedSubtasks(id) {
    let checkbox = document.getElementById(id);
    if (checkbox.checked === true) {
        let subtask = subtasks.filter(function(ele) {
            return ele.title === document.getElementById('subtasks' + id).innerHTML;
        });
        chosenSubtaskss.push(subtask[0]);
    } else {
        let chosenSubtask = chosenSubtaskss.filter(function(ele) {
            return ele.title === document.getElementById('subtasks' + id).innerHTML;
        });
        let index = chosenSubtaskss.indexOf(chosenSubtask[0])
        chosenSubtaskss.splice(index, 1)
    }
}

function createInputSubtasks() {
    x = document.createElement('INPUT');
    x.setAttribute('class', 'input_subtask');
    x.setAttribute('type', 'text');
    x.setAttribute('placeHolder', 'Add new subtask');
    x.setAttribute('maxLength', '25');
    x.setAttribute('minLength', '3')
    x.setAttribute('id', 'inputSubtasks')
    document.getElementById('subtaskInputs').appendChild(x);
}

// change HTML 

function unsetPrioHTMLs() {
    document.getElementById('containerButtonsTasks').innerHTML = `
    <button type="button" id="urgentButtons" onclick="selectUrgencys('urgent')" class="box_button_task ">
        <p class="text_urgency_task">Urgent</p>
        <div id="prioUrgents" class="urgency_img_u_task urgency_img_task"></div>
    </button>
    <button type="button" id="mediumButtons" onclick="selectUrgencys('medium')" class="box_button_task  ">
        <p class="text_urgency_task ">Medium</p>
    <div id="prioMediums" class="urgency_img_m_task urgency_img_task"></div>
    </button>
    <button type="button" id="lowButtons" onclick="selectUrgencys('low')" class="box_button_task ">
        <p class="text_urgency_task ">Low</p>
    <div id="prioLows" class="urgency_img_l_task urgency_img_task"></div>
    </button>   `
}

function generateNewCategoryHTMLs() {
    return `   
    <div class="container_input_category">
        <div class="box_input_category">
            <div id="BoxInputCategorys" class="place_input_category"></div>
            <div class="box_buttons_input_category">
                <button type="button" onclick="unsetNewCategorys()"  class="button_input_category">
                    <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
                </button>
                <div class="seperation_buttons_input_category"></div>
                <button type="submit" name="newCategory" onclick="createNewCategorys()" class="button_input_category">
                    <img class="img_button_input_category" src="assets/img/check_task.png" alt="#">
                </button>
            </div>
        </div>
        <div id="boxButtonsColors" class="box_buttons_color">
      
        </div>
    </div>`
}

function generateBoxButtonsHTMLs() {
    return `     
    <button type="button" onclick="clickedColors(this.id)" id="blues" class="button_color color_1"></button>
    <button type="button" onclick="clickedColors(this.id)" id="reds" class="button_color color_2"></button>
    <button type="button" onclick="clickedColors(this.id)" id="greens" class="button_color color_3"></button>
    <button type="button" onclick="clickedColors(this.id)" id="oranges" class="button_color color_4"></button>
    <button type="button" onclick="clickedColors(this.id)" id="purples" class="button_color color_5"></button>
    <button type="button" onclick="clickedColors(this.id)" id="yellows" class="button_color color_6"></button>`
}


function unsetNewCategoryHTMLs() {
    return `    
    <button type="button" onclick="toggleDropdowns()" id="selectButtonTasks" class="select_button_task">
        <span class="select_label" id="selectedLabels">Select task category</span>
        <div id="selectedColors" class="button_color"></div>
        <div id="arrows" class="arrow"></div>
    </button>`

}

function addCategoryHTMLs(i) {
    return `
        <div id="${categoryLabels[i].title}s" onclick="selectTitles(this.id)" class="box_categoryelement">
        <input class="option">
            <label  class="select-item">${categoryLabels[i].title}</label>
            <div id="categoryelement_colors${i}" class="button_color categoryelement_color"></div>
        </div>`
}

function openSubtaskHTMLs() {
    return ` 
    <div class="box_input_category">
        <div id="subtaskInputs" class="place_input_category"></div>
        <div class="box_buttons_input_category">
            <button type="button" onclick="unsetSubtaskHTMLs()"  class="button_input_category">
                <img class="img_button_input_category" src="assets/img/cross_task.png" alt="#">
            </button>
            <div class="seperation_buttons_input_category"></div>
            <button type="button" onclick="filterSubtaskDuplicatess()" class="button_input_category">
                <img class="img_button_input_category" src="assets/img/check_task.png" alt="#">
            </button>
        </div>
    </div>`
}

function unsetSubtaskHTMLs() {
    document.getElementById('containerSubtasks').innerHTML = `
        <button type="button" onclick="openSubtasks()" id="boxSubtaskInputs" class="box_subtask_input">
            <input  disabled="disabled" placeholder="Add new subtask" id="inputSubtasks" type="text" class="input_subtask">
            <div  class="button_subtask_input">
                <img class="img_subtask_task" src="./assets/img/plus_task.png" alt="#">
            </div>
        </button>
   `
}

function subtasksHTMLs(subtask, i) {
    return `    
    <div class="box_create_subtask">
        <label class="box_checkbox">
            <input onclick="checkedSubtasks(this.id)" id="${i}s" type="checkbox" >
            <span  class="checkmark"></span>
        </label>
        <p class="subtask" id="subtasks${i}">${subtask.title}</p>
    </div> 
    `
}