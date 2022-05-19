var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("search");
var submitBtn = document.getElementById("submitBtn");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var categoryAlert = document.getElementById("categoryAlert");
var products = [];
var currentIndex = 0;
/*******************************************************/
if (JSON.parse(localStorage.getItem("productsList")) != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayData();
}
/*******************************************************/
submitBtn.onclick = function () {
  if (submitBtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    updateProduct();
  }
  displayData();
  clearForm();
};
/************      Adding Data    ******************/
function addProduct() {
  if(productName.onkeyup() == true && productPrice.onkeyup() == true && productCategory.onkeyup() == true ){
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
  }
}
/************      Display Data    ******************/
function displayData() {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].category}</td>
                        <td>${products[i].desc}</td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-warning">Delete</button></td>
                        <td><button onclick="getProductInfo(${i})" class="btn btn-danger">Update</button></td>
                    </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
/************      Clear Data    ******************/
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].classList.remove("is-valid");
  }
}
/************      Delete Product    ******************/
function deleteProduct(index) {
  products.splice(index, 1);
  displayData();
  localStorage.setItem("productsList", JSON.stringify(products));
}
/************      Update Product    ******************/
function getProductInfo(index) {
  productName.value = products[index].name;
  productPrice.value = products[index].price;
  productCategory.value = products[index].category;
  productDesc.value = products[index].desc;
  submitBtn.innerHTML = "Update Product";
  currentIndex = index;
}
function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };
  products[currentIndex] = product;
  localStorage.setItem("productsList", JSON.stringify(products));
  submitBtn.innerHTML = "Add Product";
}
/************      Search Function    ******************/
searchInput.onkeyup = function () {
  var cartona = "";
  var val = searchInput.value;
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(val.toLowerCase())) {
      cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].category}</td>
                        <td>${products[i].desc}</td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-warning">Delete</button></td>
                        <td><button onclick="getProductInfo(${i})" class="btn btn-danger">Update</button></td>
                    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
};
/**********************     Validation    *************************/
/*****    Product Name Validation    *****/
productName.onkeyup = function () {
  var nameRejex = /^[(A-Z )|(a-z )]{2,15}$/;
  if (!nameRejex.test(productName.value)) {
    submitBtn.disabled = "true";
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  }
};
/*****    Product Price Validation    *****/
productPrice.onkeyup = function () {
  var priceRejex = /^([0-9]{3,6}|1000000)$/;
  if (!priceRejex.test(productPrice.value)) {
    submitBtn.disabled = "true";
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    return true;
  }
};
/*****    Product Category Validation    *****/
productCategory.onkeyup = function () {
  var categoryRejex = /^(product|mobile|tv|laptop|computer|drink|food)$/;
  if (!categoryRejex.test(productCategory.value)) {
    submitBtn.disabled = "true";
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    categoryAlert.classList.remove("d-none");
    return false;
  } else {
    submitBtn.removeAttribute("disabled");
    productCategory.classList.add("is-valid");
    productCategory.classList.remove("is-invalid");
    categoryAlert.classList.add("d-none");
    return true;
  }
};
/***********************      Best Wishes    **************************/
