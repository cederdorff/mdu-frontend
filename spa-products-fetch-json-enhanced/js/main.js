"use strict";

// =========== Product functionality =========== //
/*
global variables: _products _selectedProductId
*/
let _products = [];
let _selectedProductId;

/*
Fetches json data from the file products.json
*/
async function fetchData() {
  const response = await fetch('json/products.json');
  const data = await response.json();
  _products = data;
  console.log(_products);
  appendProducts(_products);
  showLoader(false);
}

fetchData();

function appendProducts(products) {
  let htmlTemplate = "";
  for (let product of products) {
    htmlTemplate += /*html*/`
      <article class="${product.status}">
        <article onclick="showDetailView(${product.id})">
          <img src="${product.img}">
          <h2>${product.model}</h2>
          <h3>${product.brand}</h3>
          <p>Price: ${product.price} kr.</p>
          <p class="status">Status: ${product.status}</p>
        </article>
        <button onclick="goToEdit(${product.id})">Edit</button>
        <button onclick="deleteProduct(${product.id})">Delete</button>
      </article>
    `;
  }
  document.querySelector('#products-container').innerHTML = htmlTemplate;
}

function addNewProduct() {
  showLoader(true);

  let brand = document.querySelector('#brand').value;
  let model = document.querySelector('#model').value;
  let price = document.querySelector('#price').value;
  let img = document.querySelector('#img').value;
  const id = Date.now(); // dummy generated user id

  if (brand && model && price && img) {
    _products.push({
      brand,
      model,
      price,
      img,
      status: 'inStock',
      id
    });

    appendProducts(_products);
    navigateTo('products');
  } else {
    alert('Please fill out all fields');
  }
  showLoader(false);
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


// function showHideOfStock(checked) {
//   const items = document.querySelectorAll('.outOfStock'); //grabbing all the products in the DOM
//   for (let item of items) {
//     if (checked) {
//       item.style.display = "block";
//     } else {
//       item.style.display = "none";
//     }
//   }
// }

function showHideOfStock(checked) {
  if (checked) {
    appendProducts(_products);
  } else {
    const inStockProducts = _products.filter(product => product.status === "inStock");
    appendProducts(inStockProducts);
  }
}

function orderBy(option) {
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

function goToEdit(id) {
  // save id in global variable
  _selectedProductId = id;
  // find product to edit by using array.find and id
  const productToEdit = _products.find(product => product.id === _selectedProductId);
  // set input field values with the productToEdit properties
  document.querySelector('#brandEdit').value = productToEdit.brand;
  document.querySelector('#modelEdit').value = productToEdit.model;
  document.querySelector('#priceEdit').value = productToEdit.price;
  document.querySelector('#imgEdit').value = productToEdit.img;
  //navigate to edit view
  navigateTo("edit");
}

function saveProduct() {
  // find index of the product to update in _products
  let index = _products.findIndex(product => product.id === _selectedProductId);
  // update values of user in array
  _products[index].brand = document.querySelector('#brandEdit').value;
  _products[index].model = document.querySelector('#modelEdit').value;
  _products[index].price = document.querySelector('#priceEdit').value;
  _products[index].img = document.querySelector('#imgEdit').value;
  // update dom usind appendProducts()
  appendProducts(_products);
  //navigating back
  navigateTo("products");
}

function deleteProduct(id) {
  // filter _products - all products that doesnt have the id 
  _products = _products.filter(product => product.id !== id);
  appendProducts(_products);
}

function showDetailView(id) {
  const productToShow = _products.find(product => product.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view .title").innerHTML = productToShow.model;
  document.querySelector("#detail-view-container").innerHTML = /*html*/`
    <img src="${productToShow.img}">
    <article>
      <h2>${productToShow.model}</h2>
      <h3>${productToShow.brand}</h3>
      <p>Price: ${productToShow.price} kr.</p>
      <p>Status: ${productToShow.status}</p>
      <p>ID: ${productToShow.id}</p>
    </article>
  `;
}