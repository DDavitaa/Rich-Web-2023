// constant variables
const form = document.getElementById('phone_dir_form');
const table = document.getElementById('tableBody');
const errorMessage = document.getElementById('error');
const noResultMessage = document.getElementById('no_result');

getContacts().forEach(contact => {
    const rowContact = createNote(contact.id, contact.name, contact.phone, contact.email);
});

function getContacts()
{
    return JSON.parse(localStorage.getItem("note-phoneDir_app") || "[]");
}

function saveContacts(notes) 
{
    localStorage.setItem("phoneDir_app", JSON.stringify(notes));
}

function validateContact(name, phone, email)
{
    const patterName = /^[A-Za-z ]{1,20}$/;
    const patternPhone = /^[0-9]{10}$/;
    const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{1,40}$/

    console.log(name, phone, email);

    if(patterName.test(name) && patternPhone.test(phone) && patternEmail.test(email))
    {
        errorMessage.style.display = "none";
        console.log("valid");
    }
    else
    {
        errorMessage.style.display = "block";
    }
}

function createContact(id, name, phone, email)
{
    var newRow = document.createElement('tr');

    // Create new table data elements for each contact property
    var idData = document.createElement('td');
    idData.textContent = id;
    var nameData = document.createElement('td');
    nameData.textContent = name;
    var phoneData = document.createElement('td');
    phoneData.textContent = phone;
    var emailData = document.createElement('td');
    emailData.textContent = email;

    // Append the table data elements to the new row element
    newRow.appendChild(idData);
    newRow.appendChild(nameData);
    newRow.appendChild(phoneData);
    newRow.appendChild(emailData);

    // Append the new row element to the contacts table body element
    tableBody.appendChild(newRow);
}

function addContact()
{
    const contact = getContacts();

    const contactObj = {
        id: Math.floor(Math.random() * 100000),
        name: "",
        phone: "",
        email: ""
    };

    createContact(contactObj.id, contactObj.name, contactObj.phone, contactObj.email);
}


form.addEventListener('submit', function(event) {
    event.preventDefault();

    let nameInput = form.elements['name'];
    let phoneInput = form.elements['phone'];
    let emailInput = form.elements['email'];

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    validateContact(name, phone, email);
    
});
