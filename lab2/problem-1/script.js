// Get a reference to the form element
var form = document.getElementById('phone_dir_form');

// addBtn.addEventListener("click", () => addContact());

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let nameInput = form.elements['name'];
    let phoneInput = form.elements['phone'];
    let emailInput = form.elements['email'];

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    console.log(name, phone, email);

    if(name == "" || phone == "" || email == "")
    {
        console.log("no");
    }
});
