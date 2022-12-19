function renderContacts() {     
    showContacts();
} 


// Placeholder!! Needs to be filled with input from 'Add Contact'-field. 
let contacts = [{
    'id': 0,
    'name': 'Adam',
    'firstName': 'Adamadam',
    'email': 'ABC@gmail.com',
    'phone': '123',
}, {
    'id': 1,
    'name': 'Berta',
    'firstName': 'Bertaberta',
    'email': 'BGI@gmail.com',
    'phone': '257',
}, {
    'id': 2,
    'name': 'Charlie',
    'firstName': 'ABC',
    'email': 'CGI@gmail.com',
    'phone': '357',
}, {
    'id': 3,
    'name': 'Dora',
    'firstName': 'Doradora',
    'email': 'DGI@gmail.com',
    'phone': '457',
}, {
    'id': 4,
    'name': 'Eva',
    'firstName': 'Evaeva',
    'email': 'EFG@gmail.com',
    'phone': '543',
}];


function showContacts() {
    let contactList = document.getElementById('contactList'); 
    contactList.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const singleContact = contacts[i];
        contactList.innerHTML += showContactsHTML(singleContact, i);
        /*showFirstLetterName(i);*/
    }
}


function showContactsHTML(singleContact, i) {
    return `
    <button class="contact_card_button" onclick="showSelectedContact(${i})">
        <div class="contact_list_container">
            <div class="contact_list_img"><h3>${singleContact['name'].charAt(0)}</h3></div>
            <div class="contact_list">
                <div id="contact" class="contact_list_content">
                    <div><b>${singleContact['name']}</b></div>
                </div>
                <div class="contact_list_content">
                    <div>${singleContact['email']}</div>
                </div>
            </div>
        </div>
    </button>    
    `
}


// Show Contact Form to enter new Contact
function openContactForm(text){
    document.getElementById('contactForm').classList.remove('d_none');
    document.getElementById('contactContent').innerHTML = text;
}


function closeContactForm() {
    document.getElementById('contactForm').classList.add('d_none');
}


// Show SELECTED CONTACT
function showSelectedContact(i) {
    let contactCard = document.getElementById('contactCard');
    contactCard.innerHTML = '';
    let selectedContact = contacts[i];
    contactCard.innerHTML += showSelectedContactHTML(selectedContact);
}


function showSelectedContactHTML(selectedContact) {
    return `
    <div class="contact_list_container">
        <div class="contact_list">
            <div class="contact_list_content">
                <div class="contact_list_img"><h3>${selectedContact['name'].charAt(0)}</h3></div>
                <div><h3>${selectedContact['name']}</h3></div>
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