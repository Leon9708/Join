async function renderContacts() {
    /*  await getTodos(); */
    filterLetters();
    showContacts();
}


// Placeholder!! Needs to be filled with input from 'Add Contact'-field. 


let colors = ['orange', 'purple', 'blue', 'red', 'aqua', 'brown', 'grey', 'green'];
let letters = [];

function filterLetters() {
    contacts.forEach(contact => {
        if (!letters.includes(contact.firstName.charAt(0))) {
            letters.push(contact.firstName.charAt(0))
        }
    });
    showLetters();
}

function showLetters() {
    document.getElementById('contactList').innerHTML = "";
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        document.getElementById('contactList').innerHTML += generateLetters(letter);
    }
}

function showContacts() {
    const cards = document.querySelectorAll('containerCard')
    for (let j = 0; j < cards.length; j++) {
        const card = cards[j];
        card.innerHTML = "";
    }
    for (let i = 0; i < contacts.length; i++) {
        const singleContact = contacts[i];

        let singleContactLetter = singleContact.firstName.charAt(0);
        let id = "boxContact" + singleContactLetter;


        document.getElementById(id).innerHTML += showContactsHTML(singleContact, i);
        document.getElementById('circle' + i).style.backgroundColor = singleContact.color;
    }
}

function createNewContact(event) {
    event.preventDefault();
    let fullName = document.getElementById('name').value;
    let [first, last] = fullName.split(' ');
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let id = contacts.length + 1;
    let color = document.getElementById('showContactImg').style.backgroundColor;

    let contact = {
        'id': id,
        'lastName': last,
        'firstName': first,
        'email': email,
        'phone': phone,
        'color': color
    }
    contacts.push(contact)
    renderContacts();
    renderTask();
    renderTasks();
    toggleOverlay();
}



function createColor() {
    let randomColor = colors[Math.floor(Math.random() * colors.length)]
    document.getElementById('showContactImg').style.backgroundColor = randomColor;
}

function toggleOverlay() {
    document.getElementById('overlay').classList.toggle("none");
    if (!overlay.classList.contains('none')) {
        createColor();
    }
}


function showName() {
    let circle = document.getElementById('showContactImg');
    let fullName = document.getElementById('name').value;
    let [first, last] = fullName.split(' ');
    circle.innerHTML = "";
    circle.innerHTML += first.charAt(0)
    circle.innerHTML += last.charAt(0)
}


function closeContactForm() {
    document.getElementById('contactForm').classList.add('none');
}

function showSelectedContact(i) {
    resetContactClicked();

    document.getElementById('showContactBox').innerHTML = '';
    document.getElementById('showContactBox').innerHTML = showSelectedContactHTML(contacts[i], i);

    document.getElementById('showContactCircle').style.backgroundColor = contacts[i].color;
    document.getElementById("buttonContact" + i).style.backgroundColor = "#2A3647"
    document.getElementById("contactName" + i).style.color = "white"
}

function resetContactClicked() {
    const contactCardButtons = document.querySelectorAll('.contact_card_button');
    const contactNames = document.querySelectorAll('.contact_name');

    for (let j = 0; j < contactCardButtons.length; j++) {
        contactCardButtons[j].style.backgroundColor = 'white';
        contactNames[j].style.color = 'black';
    }
}

function showContactsHTML(singleContact, i) {
    return `
    <div id="containerCard" class="container_cards">
        <button id="buttonContact${i}" class="contact_card_button" onclick="showSelectedContact(${i})">
            <div class="contact_list_container">
                <div id="circle${i}" class="contact_list_img">
                    <p>${singleContact['firstName'].charAt(0)}${singleContact['lastName'].charAt(0)}</p>
                </div>
                <div class="contact_content">
                    <div id="contact" class="contact_list_name">
                        <p class="contact_name" id="contactName${i}">${singleContact['firstName']} ${singleContact['lastName']}</p>
                    </div>
                    <div class="contact_list_email">
                        <p>${singleContact['email']}</p>
                    </div>
                </div>
            </div>
        </button>
    </div>
    `
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function generateLetters(letter) {
    return `   
    <div id="boxContact${letter}" class="box_contact">
        <div class="contact_letter">
            <h3>${letter}</h3>
        </div>
    </div>`
}

function showSelectedContactHTML(selectedContact, i) {
    return `
        <div class="contact_list_content">
            <div id="showContactCircle" class="show_contact_img">${selectedContact['firstName'].charAt(0)}${selectedContact['lastName'].charAt(0)}</div>
            <div class="show_contact_box_name_add_task">
                <p class="show_contact_name">${selectedContact['firstName']} ${selectedContact['lastName']}</p>
                <button onclick="toggleTask()" class="button_plus_add_task">
                    <p class="show_contact_plus">+</p>
                    <p class="show_contact_add_task">Add Task</p>
                </button>
            </div>
        </div>
        <h4 class="contact_information">Contact Information</h4>
        <div class="box_contact_content">
            <p class="contact_content_p">Email</p>
            <p class="contact_content_email">${selectedContact['email']}</p>
        </div>
        <div class="box_contact_content">
            <p class="contact_content_p">Phone</p>
            <p>${selectedContact['phone']}</p>   
        </div>
    `
}