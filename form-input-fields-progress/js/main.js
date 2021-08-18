"use strict"; // to enable strict mode and modern JavaScript functionality

function inputChange() {
  let inputFields = document.querySelectorAll("input");

  let numberOfInputFieldsWithValue = 0;
  for (const inputField of inputFields) {
    if (inputField.value) {
      numberOfInputFieldsWithValue++;
    }
  }

  let progressBar = document.querySelector("#progress");
  progressBar.max = inputFields.length;
  progressBar.value = numberOfInputFieldsWithValue;
}