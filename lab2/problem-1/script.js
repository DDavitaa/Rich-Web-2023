// Get a reference to the form element
const form = document.getElementById('phone_dir_form');
const errorMessage = document.getElementById('error');
const noResultMessage = document.getElementById('no_result');

// addBtn.addEventListener("click", () => addContact());

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let nameInput = form.elements['name'];
    let phoneInput = form.elements['phone'];
    let emailInput = form.elements['email'];

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;

    let patterName = /^[A-Za-z ]{1,20}$/;
    let patternPhone = /^[0-9]{10}$/;
    let patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{1,40}$/

    console.log(name, phone, email);

    // if(name == "" || phone == "" || email == "")
    // {
    //     errorMessage.style.display = "block";
    // }

    if(patterName.test(name) && patternPhone.test(phone) && patternEmail.test(email))
    {
        errorMessage.style.display = "none";
        console.log("valid");
    }
    else
    {
        errorMessage.style.display = "block";
    }


});
