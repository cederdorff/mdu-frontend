"use strict";

// =========== Product functionality =========== //

let _products = [{
  model: 'MacBook Pro 13"',
  brand: 'Apple',
  price: '11799',
  img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp13touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1529520060550',
  status: 'outOfStock'
}, {
  model: 'MacBook Pro 15"',
  brand: 'Apple',
  price: '21499',
  img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp15touch-space-select-201807?wid=904&hei=840&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1529520056969',
  status: 'inStock'
}, {
  model: 'Zenbook 14"',
  brand: 'ASUS',
  price: '8099',
  img: 'https://media.power.dk/images/h-7f45c2a55ddb117ac5356153c12b4e3b/products/951450/951450_1_900x900_w_g.jpg',
  status: 'outOfStock'
}, {
  model: 'Ideapad S340 14" (platinum grey)',
  brand: 'Lenovo',
  price: '6099',
  img: 'https://www.elgiganten.dk/image/dv_web_D180001002238583/32307/lenovo-ideapad-s340-14-baerbar-computer-platinum-grey.jpg',
  status: 'inStock'
}];

function appendProducts(products) {
  let htmlTemplate = "";
  for (let product of products) {
    console.log(product);
    htmlTemplate += /*html*/`
      <article>
        <img src="${product.img}">
        <h2>${product.model}</h2>
        <h3>${product.brand}</h3>
        <p>Price: ${product.price} kr.</p>
        <p class="${product.status}">Status: ${product.status}</p>
      </article>
    `;

  }
  document.querySelector('#products-container').innerHTML = htmlTemplate;
}

appendProducts(_products);

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