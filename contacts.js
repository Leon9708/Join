async function getContacts() {
    try {
        let responseServer = await fetch('https://jonas34.pythonanywhere.com/todos/', { method: 'GET', headers: { 'Content-Type': 'application/json', } });
        if (!responseServer.ok)
            throw new Error("Response not ok")
        contacts = await responseServer.json();
        console.log(contacts);
    } catch (error) {
        console.error(error)
    }
}


async function renderContacts() {
    /*  await getTodos(); */
    await filterLetters();
    showContacts();
}


// Placeholder!! Needs to be filled with input from 'Add Contact'-field. 
let contacts = [{
    'id': 0,
    'lastName': 'Adamadam',
    'firstName': 'Adam',
    'email': 'ABC@gmail.com',
    'phone': '123',
    'color': ''
}, {
    'id': 1,
    'lastName': 'Bertaberta',
    'firstName': 'Berta',
    'email': 'BGI@gmail.com',
    'phone': '257',
    'color': ''
}, {
    'id': 2,
    'lastName': 'Charlie',
    'firstName': 'ABC',
    'email': 'CGI@gmail.com',
    'phone': '357',
    'color': ''
}, {
    'id': 3,
    'lastName': 'Doradora',
    'firstName': 'Dora',
    'email': 'DGI@gmail.com',
    'phone': '457',
    'color': ''
}, {
    'id': 4,
    'lastName': 'Evaeva',
    'firstName': 'Eva',
    'email': 'EFG@gmail.com',
    'phone': '543',
    'color': ''
}];
/* let randomColor = colors[Math.floor(Math.random() * colors.length)] */
let colors = ['orange', 'purple', 'blue', 'red', 'aqua', 'brown', 'grey', 'green'];
let letters = [];

async function filterLetters() {
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
    for (let i = 0; i < contacts.length; i++) {
        const singleContact = contacts[i];

        let singleContactLetter = singleContact.firstName.charAt(0);
        let id = "boxContact" + singleContactLetter;


        /*    document.getElementById('circle' + i).style.backgroundColor = singleContact.color; */
        document.getElementById(id).innerHTML += showContactsHTML(singleContact, i);
    }
}

function openContactForm(text) {
    document.getElementById('contactForm').classList.remove('d_none');
    document.getElementById('contactContent').innerHTML = text;
}


function closeContactForm() {
    document.getElementById('contactForm').classList.add('d_none');
}

function showSelectedContact(i) {
    const contactCardButtons = document.querySelectorAll('.contact_card_button');
    const contactNames = document.querySelectorAll('.contact_name');

    for (let j = 0; j < contactCardButtons.length; j++) {
        contactCardButtons[j].style.backgroundColor = 'white';
        contactNames[j].style.color = 'black';
    }

    document.getElementById('contactCard').innerHTML = '';
    contactCard.innerHTML += showSelectedContactHTML(contacts[i]);

    document.getElementById("buttonContact" + i).style.backgroundColor = "#2A3647"
    document.getElementById("contactName" + i).style.color = "white"
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


function generateLetters(letter) {
    return `   
    <div id="boxContact${letter}" class="box_contact">
        <div class="contact_letter">
            <h3>${letter}</h3>
        </div>
    </div>`
}

function showSelectedContactHTML(selectedContact) {
    return `
    <div class="contact_list_container">
        <div class="contact_list">
            <div class="contact_list_content">
                <div class="show_contact_img"><h3>${selectedContact['firstName'].charAt(0)}${selectedContact['lastName'].charAt(0)}</h3></div>
                <div><h3>${selectedContact['lastName']}</h3></div>
            </div>
            <div><h4>Contact Information</h4></div>
            <div class="contact_list_content">
                <div><b>Email: </b>${selectedContact['email']}</div>
            </div>
            <div class="contact_list_content">
                <div><b>Phone: </b>${selectedContact['phone']}</div>
            </div>
        </div>
    </div>        
    `
}