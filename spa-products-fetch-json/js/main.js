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
  .then(function (json) {
    console.log(json);
    _products = json
    appendProducts(json);
  });

function appendProducts(products) {
  let htmlTemplate = "";
  for (let product of products) {
    htmlTemplate += /*html*/`
      <article class="${product.status}">
        <img src="${product.img}">
        <h2>${product.model}</h2>
        <h3>${product.brand}</h3>
        <p>Price: ${product.price} kr.</p>
        <p class="status">Status: ${product.status}</p>
      </article>
    `;
  }
  document.querySelector('#products-container').innerHTML = htmlTemplate;
}

function addNewProduct() {
  let brand = document.querySelector('#brand').value;
  let model = document.querySelector('#model').value;
  let price = document.querySelector('#price').value;
  let img = document.querySelector('#img').value;

  if (brand && model && price && img) {
    _products.push({
      brand,
      model,
      price,
      img,
      status: 'inStock'
    });

    appendProducts(_products);
    navigateTo('products');
    document.querySelector('#brand').value = "";
  } else {
    alert('Please fill out all fields');
  }
}

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let product of _products) {
    let model = product.model.toLowerCase();
    let brand = product.brand.toLowerCase();
    if (model.includes(searchQuery) || brand.includes(searchQuery)) {
      filteredProducts.push(product);
    }
  }
  console.log(filteredProducts);
  appendProducts(filteredProducts);
}


function showHideOfStock(checked) {
  console.log(checked);

  let items = document.querySelectorAll('.outOfStock'); //grabbing all the products in the DOM
  for (let item of items) {
    if (checked) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }

}