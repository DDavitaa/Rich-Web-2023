// ----------------------------------------------
// FORM AND TABLE

// constant variables
const form = document.getElementById('phone_dir_form');
const table = document.getElementById('tableBody');
const errorMessage = document.getElementById('error');



getContacts().forEach(contact => {
    const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);

    table.appendChild(newContact);

    oddNumberColoured();
});

function getContacts()
{
    oddNumberColoured();
    
    return JSON.parse(localStorage.getItem("phoneDir_app") || "[]");
}



function saveContacts(contacts) 
{
    localStorage.setItem("phoneDir_app", JSON.stringify(contacts));
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
        addContact(name, phone, email);
    }
    else
    {
        errorMessage.style.display = "block";
    }
}

function createEl(id, name, phone, email)
{
    const newRow = document.createElement('tr');

    let nameData = document.createElement('td');
    nameData.textContent = name;

    let phoneData = document.createElement('td');
    phoneData.textContent = phone;

    let emailData = document.createElement('td');
    emailData.textContent = email;
    
    newRow.appendChild(nameData);
    newRow.appendChild(phoneData);
    newRow.appendChild(emailData);

    newRow.addEventListener('dblclick', () => {
        const doDelete = confirm("Are you sure you want to delete this contact?");

        if(doDelete)
        {
            deleteContact(id,newRow);
        }
    });

    return newRow;
}

function addContact(name, phone, email)
{
    const contacts = getContacts();

    const contactObj = {
        id: Math.floor(Math.random() * 100000),
        name: "",
        phone: "",
        email: ""
    };

    const newContact = createEl(contactObj.id, name, phone, email);

    table.appendChild(newContact);

    contactObj.name = name;
    contactObj.phone = phone;
    contactObj.email = email;
    
    contacts.push(contactObj);
    saveContacts(contacts);
    console.log(getContacts());
}

function deleteContact(id, element)
{
    const contacts = getContacts().filter(contact => contact.id != id);

    saveContacts(contacts);
    table.removeChild(element);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let nameInput = form.elements['name'];
    let phoneInput = form.elements['phone'];
    let emailInput = form.elements['email'];

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";

    validateContact(name, phone, email);
    
});

// ----------------------------------------------
// SORT BY NAME

const sortName = document.getElementById('sort_name');
let ascdesc = 0;

sortName.addEventListener('click', () => {
    
    const contacts = getContacts();
    
    if (ascdesc == 0) 
    {
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
    else
    {
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
    

    table.innerHTML = "";

    contacts.forEach(contact => {
        const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);
    
        table.appendChild(newContact);
    });
});

// ----------------------------------------------
// SEARCH BY MOBILE NUMBER

const noResultMessage = document.getElementById('no_result');
const searchByNo = document.getElementById('search_by_no');


function searchPhone()
{
    const number = searchByNo.value;

    const contacts = getContacts();

    const targetContact = contacts.filter(contact => contact.phone.startsWith(number));

    if(targetContact.length == 0)
    {
        noResultMessage.style.display = "block";
    }
    else
    {
        noResultMessage.style.display = "none";
    }

    table.innerHTML = "";

    targetContact.forEach(contact => {
        const newContact = createEl(contact.id, contact.name, contact.phone, contact.email);
    
        table.appendChild(newContact);
    });
}

// ----------------------------------------------
// COLOUR ODD ROWS
function oddNumberColoured()
{
    const rows = document.querySelectorAll('tr');
    rows.forEach((row, index) => {
        if (index % 2 !== 0) {
            row.style.backgroundColor = '#f2f2f2';
        }
    });
}