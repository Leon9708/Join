const dropdown = document.getElementById("dropdown");

const selectButtonTask2 = document.getElementById('selectButtonTask2');
const dropdown2 = document.getElementById("dropdown2");
const options2 = document.querySelectorAll(".option2");
const selectLabel2 = document.getElementById('selectLabel2');

let colorID;

let categoryLabels = []
let tasks = [
    {}
]

function createTask() {
    let title = document.getElementById('inputTitle').value;
    let description = document.getElementById('inputDescription').value;
    let category = document.getElementById('selectedLabel').innerText;
    let label = categoryLabels.filter(function(ele) {
        return ele.label === category
    })
    let color = label.color;

    let task = { "title": title, "description": description, "category": category, "color": color, }
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
        document.getElementById('addCategory').innerHTML += `
        <div id="${categoryLabels[i].label}" onclick="selectTitle(this.id)" class="box_categoryelement">
        <input class="option">
            <label  class="select-item">${categoryLabels[i].label}</label>
            <div id="categoryelement_color${i}" class="button_color categoryelement_color"></div>
        </div>`
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

selectButtonTask2.addEventListener("click", function(e) {
    e.preventDefault();
    toggleHidden2();
});

function toggleHidden2() {
    if (dropdown.classList.contains('hidden')) {
        dropdown2.classList.toggle('hidden');
    }
}

options2.forEach(function(option) {
    option.addEventListener("click", function(e) {
        setSelectTitle2(e);
    });
});

function setSelectTitle2(e) {
    const labelElement2 = document.querySelector(`label[for="${e.target.id}"]`).innerText;
    selectLabel2.innerText = labelElement2;
    toggleHidden2();
};

//Choose Prio 

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
    const urgent = document.getElementById("PrioUrgent");
    document.getElementById('urgentButton').classList.toggle('box_button_task_u');
    urgent.classList.toggle('urgency_img_u_clicked_task');
    urgent.classList.toggle('urgency_img_u_task');
}

function medium() {
    const medium = document.getElementById("PrioMedium");
    document.getElementById('mediumButton').classList.toggle('box_button_task_m');
    medium.classList.toggle('urgency_img_m_clicked_task');
    medium.classList.toggle('urgency_img_m_task');
}

function low() {
    const low = document.getElementById("PrioLow");
    document.getElementById('lowButton').classList.toggle('box_button_task_l');
    low.classList.toggle('urgency_img_l_clicked_task');
    low.classList.toggle('urgency_img_l_task');
}

function unsetPrioHTML() {
    document.getElementById('containerButtonsTask').innerHTML = `<button id="urgentButton" onclick="selectUrgency('urgent')" class="box_button_task ">
    <p class="text_urgency_task">Urgent</p>
    <div id="PrioUrgent" class="urgency_img_u_task urgency_img_task"></div>
</button>
<button id="mediumButton" onclick="selectUrgency('medium')" class="box_button_task  ">
    <p class="text_urgency_task ">Medium</p>
   <div id="PrioMedium" class="urgency_img_m_task urgency_img_task"></div>
</button>
<button id="lowButton" onclick="selectUrgency('low')" class="box_button_task ">
    <p class="text_urgency_task ">Low</p>
  <div id="PrioLow" class="urgency_img_l_task urgency_img_task"></div>
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
    return `     <button onclick="clickedColor(this.id)" id="blue" class="button_color color_1"></button>
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