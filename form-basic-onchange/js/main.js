"use strict";
// array of users
let users = [];
// declaring input field variables
let nameInput = document.forms['newUserForm']['name'];
let emailInput = document.forms['newUserForm']['email'];
let errorMessage = document.querySelector('.error-message');
let submitButton = document.querySelector("#submit-button");

function createUser() {
  if (validateForm()) {
    let newUser = {
      name: nameInput.value,
      email: emailInput.value
    };

    users.push(newUser);
    console.log(users);

    // reset input fields
    nameInput.value = "";
    emailInput.value = "";
  }
}

function validateForm() {
  let valid = true;

  if (!nameInput.value) {
    valid = false;
    nameInput.classList.add('error');
  }

  if (!emailInput.value || !validateEmail(emailInput.value)) {
    valid = false;
    emailInput.classList.add('error');
    errorMessage.innerHTML = "Sorry. I expect an email, darling!";
  }

  return valid;
}

function validateEmail(email) {
  var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(email).toLowerCase())
}

// clear input errors
let inputs = document.querySelectorAll('input')
for (let input of inputs) {
  input.addEventListener('input', function () {
    this.classList.remove('error');
    errorMessage.innerHTML = "";
  });
}

function inputChangeEvent(value) {
  let isActive = false;
  if (nameInput.value && emailInput.value) {
    isActive = true;
  }
  if (isActive) {
    //All fields are filled!
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}