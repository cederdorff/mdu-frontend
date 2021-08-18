"use strict";
// array of _users
let _users = [];
// declaring input field variables
let _nameInput = document.forms['newUserForm']['name'];
let _emailInput = document.forms['newUserForm']['email'];
let _errorMessage = document.querySelector('.error-message');

function createUser() {
  if (validateForm()) {
    let newUser = {
      name: _nameInput.value,
      email: _emailInput.value
    };

    _users.push(newUser);
    console.log(_users);

    // reset input fields
    _nameInput.value = "";
    _emailInput.value = "";
  }
}

function validateForm() {
  let valid = true;

  if (!_nameInput.value) {
    valid = false;
    _nameInput.classList.add('error');
  }

  if (!_emailInput.value || !validateEmail(_emailInput.value)) {
    valid = false;
    _emailInput.classList.add('error');
    _errorMessage.innerHTML = "Sorry. I expect an email, darling!";
  }

  return valid;
}

function validateEmail(email) {
  var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(email).toLowerCase())
}

function resetInput(input) {
  input.classList.remove('error');
  _errorMessage.innerHTML = "";
}

