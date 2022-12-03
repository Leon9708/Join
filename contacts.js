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
    }
}


function showContactsHTML(singleContact, i) {
    return `
    <div class="contact_list_container">
        <div class="contact_list_img">AB</div>
        <div class="contact_list">
            <div class="contact_list_content">
                <div><b>${singleContact['name']}</b></div>
            </div>
            <div class="contact_list_content">
                <div>${singleContact['email']}</div>
            </div>
            <div class="contact_list_content">
                <div>${singleContact['phone']}</div>
            </div>
        </div>
    </div>    
    `
}