"use strict";

// =========== Product functionality =========== //
/*
global variables: _products
*/
let _products = [];

/*
Fetches json data from the file products.json
*/
fetch('json/products.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    _products = data
    appendProducts(_products);
  });

function appendProducts(products) {
  console.log(products);
  // to do
}

function addNewProduct() {
  // to do
}

function search(value) {
  // to do
}

function hideOutOfStock() {
  // to do
}