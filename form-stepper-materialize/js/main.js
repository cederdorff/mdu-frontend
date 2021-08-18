"use strict";

function init() {
  // init stepper
  let stepper = document.querySelector('.stepper');
  let stepperInstace = new MStepper(stepper, {
    // options
    firstActive: 0, // this is the default
    // Function to be called everytime a nextstep occurs. It receives 2 arguments, in this sequece: stepperForm, activeStepContent.
    validationFunction: validationFunction, // more about this default functions below
  });
  // init datepicker
  let elems = document.querySelectorAll('.datepicker');
  let instances = M.Datepicker.init(elems);
}

function validationFunction(stepperForm, activeStepContent) {
  // You can use the 'stepperForm' to valide the whole form around the stepper:
  // Or you can do something with just the activeStepContent
  console.log(stepperForm);
  console.log(activeStepContent);
  let inputs = activeStepContent.querySelectorAll('input, textarea, select');
  for (let input of inputs) {
    if (!input.checkValidity()) {
      return false;
    }
  }
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  init();
});