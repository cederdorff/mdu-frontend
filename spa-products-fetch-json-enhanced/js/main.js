"use strict";

// =========== Product functionality =========== //
/*
global variables: _products
*/
let _products = [];

/*
Fetches json data from the file products.json
*/
async function fetchData() {
  const response = await fetch('json/products.json');
  const data = await response.json();
  _products = data;
  console.log(_products);
  appendProducts(_products);
}

fetchData();

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
  appendProducts(filteredProducts);
}


function showHideOfStock(checked) {
  const items = document.querySelectorAll('.outOfStock'); //grabbing all the products in the DOM
  for (let item of items) {
    if (checked) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }

}

function orderBy(option) {
  console.log(option);
  if (option === "brand") {
    orderByBrand();
  } else if (option === "model") {
    orderByModel();
  } else if (option === "price") {
    orderByPrice();
  }
}

function orderByBrand() {
  _products.sort((product1, product2) => {
    return product1.brand.localeCompare(product2.brand);
  });
  appendProducts(_products);
}

function orderByModel() {
  _products.sort((product1, product2) => {
    return product1.model.localeCompare(product2.model);
  });
  appendProducts(_products);
}

function orderByPrice() {
  _products.sort((product1, product2) => {
    return product1.price - product2.price;
  });
  appendProducts(_products);
}