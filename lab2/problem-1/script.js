// ----------------------------------------------
// FORM AND TABLE

// constant variables
const form = document.getElementById('phone_dir_form');
const table = document.getElementById('tableBody');
const errorMessage = document.getElementById('error');


// to display the contacts from local storage
getContacts().forEach(contact => {
    const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);

    table.appendChild(newContact);

    oddNumberColoured();
});

// to get the contacts from local storage
function getContacts()
{
    oddNumberColoured();
    
    return JSON.parse(localStorage.getItem("phoneDir_app") || "[]");
}

// to save the contacts to local storage
function saveContacts(contacts) 
{
    localStorage.setItem("phoneDir_app", JSON.stringify(contacts));
}

// to validate the contact details
function validateContact(name, phone, email)
{
    // regex patterns
    const patterName = /^[A-Za-z ]{1,20}$/;
    const patternPhone = /^[0-9]{10}$/;
    const patternEmail = /^(?!.{41})[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-zA-Z]{2,6}$/;

    // if the input values match the regex patterns, hide the error message and add the contact
    if(patterName.test(name) && patternPhone.test(phone) && patternEmail.test(email))
    {
        errorMessage.style.display = "none";
        addContact(name, phone, email);
    }
    else // if the input values do not match the regex patterns, display the error message
    {
        errorMessage.style.display = "block";
    }
}

// to create a new contact element and enter values
function createEl(id, name, phone, email)
{
    // create new row
    const newRow = document.createElement('tr');

    // create new data cells
    let nameData = document.createElement('td');
    nameData.textContent = name;

    let phoneData = document.createElement('td');
    phoneData.textContent = phone;

    let emailData = document.createElement('td');
    emailData.textContent = email;
    
    // append data cells to row
    newRow.appendChild(nameData);
    newRow.appendChild(phoneData);
    newRow.appendChild(emailData);

    // add event listener to delete contact
    newRow.addEventListener('dblclick', () => {
        const doDelete = confirm("Are you sure you want to delete this contact?");

        if(doDelete)
        {
            deleteContact(id,newRow);
        }
    });

    return newRow;
}

// to add a new contact
function addContact(name, phone, email)
{
    // get contacts from local storage
    const contacts = getContacts();

    // create contact object
    const contactObj = {
        id: Math.floor(Math.random() * 100000),
        name: "",
        phone: "",
        email: ""
    };

    // call createEl function to create new contact element
    const newContact = createEl(contactObj.id, name, phone, email);

    // append new contact element to table
    table.appendChild(newContact);

    // add name, phone and email to contact object
    contactObj.name = name;
    contactObj.phone = phone;
    contactObj.email = email;
    
    // add contact object to contacts array and save to local storage
    contacts.push(contactObj);
    saveContacts(contacts);
}

function deleteContact(id, element)
{
    // get contacts from local storage and filter out the contact to be deleted
    const contacts = getContacts().filter(contact => contact.id != id);

    // save the filtered contacts to local storage and remove the contact element from table
    saveContacts(contacts);
    table.removeChild(element);
}

// event listener for form submit
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // get input elements
    let nameInput = form.elements['name'];
    let phoneInput = form.elements['phone'];
    let emailInput = form.elements['email'];

    // get input values
    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    // clear input fields after submit
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    // call validateContact function
    validateContact(name, phone, email);
    
});

// ----------------------------------------------
// SORT BY NAME

// get element
const sortName = document.getElementById('sort_name');

// variable to check if the list is sorted in ascending or descending order
let ascdesc = 0;

// event listener for sort by name
sortName.addEventListener('click', () => {
    
    // get contacts from local storage
    const contacts = getContacts();
    
    // if the ascdesc variable is 0, sort in ascending order
    if (ascdesc == 0) 
    {
        // sort the contacts array by name
        contacts.sort((a,b) => {
            if(a.name > b.name)
            {
                ascdesc = 1;
                return 1;
            }
            else if(a.name < b.name)
            {
                ascdesc = 1;
                return -1;
            }
            else
            {
                ascdesc = 1;
                return 0;
            }
        });
    }
    else // if the ascdesc variable is 1, sort in descending order
    {
        // sort the contacts array by name
        contacts.sort((b,a) => {
            if(b.name > a.name)
            {
                ascdesc = 0;
                return -1;
            }
            else if(b.name < a.name)
            {
                ascdesc = 0;
                return 1;
            }
            else
            {
                ascdesc = 0;
                return 0;
            }
        });
    }
    
    // clear the table
    table.innerHTML = "";

    // add the sorted contacts to the table
    contacts.forEach(contact => {
        const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);
    
        table.appendChild(newContact);
    });
});

// ----------------------------------------------
// SEARCH BY MOBILE NUMBER

// get elements
const noResultMessage = document.getElementById('no_result');
const searchByNo = document.getElementById('search_by_no');

// event listener for search by mobile number
function searchPhone()
{
    // get input value
    const number = searchByNo.value;

    // get contacts from local storage
    const contacts = getContacts();

    // filter the contacts array by phone number
    const targetContact = contacts.filter(contact => contact.phone.startsWith(number));

    // if no results are found, display no result message
    if(targetContact.length == 0)
    {
        noResultMessage.style.display = "block";
    }
    else // if results are found, hide no result message
    {
        noResultMessage.style.display = "none";
    }

    // clear the table
    table.innerHTML = "";

    // add the filtered contacts to the table
    targetContact.forEach(contact => {
        const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);
    
        table.appendChild(newContact);
    });
}

// ----------------------------------------------
// COLOUR ODD ROWS
function oddNumberColoured()
{
    // get all rows
    const rows = document.querySelectorAll('tr');

    // colour odd rows
    rows.forEach((row, index) => {
        if (index % 2 !== 0) {
            row.style.backgroundColor = '#f2f2f2';
        }
    });
}