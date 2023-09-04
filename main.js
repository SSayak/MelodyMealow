document.addEventListener("mousemove", (e) => {
  const img = document.querySelector(".hero-image");

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = (mouseX - centerX) / centerX;
  const dy = (mouseY - centerY) / centerY;

  img.style.transform = `translate(${-10 - dx * 5}%, ${-10 - dy * 5}%)`; // увеличил скорость до 5 для более выраженного эффекта
});

// !Start video --------------------------------------
// let video = document.getElementById("myVideo");
// let btn = document.getElementById("myBtn");

// function myFunction() {
//   if (video.paused) {
//     video.play();
//     btn.innerHTML = "Pause";
//   } else {
//     video.pause();
//     btn.innerHTML = "Play";
//   }
// }
// !Finish video-----------------------------------------



// SWIPE
const swipeBtn = document.getElementById("swipeBtn");

function swipeDown() {
  const distanceToScroll = window.innerHeight * 1.3;
  const scrollStep = distanceToScroll / 30;
  let currentScrollPosition = window.scrollY;

  function scrollToNextStep() {
    if (currentScrollPosition < distanceToScroll) {
      currentScrollPosition += scrollStep;
      window.scrollTo(0, currentScrollPosition);
      requestAnimationFrame(scrollToNextStep);
    }
  }

  requestAnimationFrame(scrollToNextStep);
}

swipeBtn.addEventListener("click", swipeDown);

// CONTENT

//! dom connect
let pushBtn = document.querySelector("#push-btn");
let getBtn = document.querySelector("#get-btn");
let contentDiv = document.querySelector("#content__div");
let registerModal = document.querySelector("#registerUser-modal");
let registerAdminModal = document.querySelector("#registerAdmin-modal");

let regBtn = document.querySelector("#register-modal-btn");
let loginBtn = document.querySelector("#login-modal-btn");

let loginUserModalBtn = document.querySelector("#loginUser-modal");
let logoutUserBtn = document.querySelector("#logoutUser-btn");

let searchInp = document.querySelector("#search-inp");
let searchForm = document.querySelector("form");
let searchBtn = document.querySelector("#search-btn");

let cartModalBtn = document.querySelector("#cartModal-btn");
let closeCartBtn = document.querySelector(".btn-close-cart");
let cartTable = document.querySelector("table");
let createCartOrderBtn = document.querySelector("#create-cart-order-btn");
let cleanCartBtn = document.querySelector("#clean-cart-btn");
let cartTotalCost = document.querySelector("#cart-total-cost");

//* admin reg connect
let regAdminNameInp = document.querySelector("#reg-admin-name");
let regAdminAgeInp = document.querySelector("#reg-admin-age");
let regAdminEmailInp = document.querySelector("#reg-admin-email");
let regAdminPasswordInp = document.querySelector("#reg-admin-password");
let regAdminPasswordConfirmInp = document.querySelector(
  "#reg-admin-password-confirm"
);
let regAdminBtn = document.querySelector("#register-admin-modal");
let adminPanel = document.querySelector("#admin-panel");
//* inputs connect
let regNameInp = document.querySelector("#reg-name");
let regAgeInp = document.querySelector("#reg-age");
let regEmailInp = document.querySelector("#reg-email");
let regPasswordInp = document.querySelector("#reg-password");
let regPasswordConfirmInp = document.querySelector("#reg-password-confirm");

let loginNameInp = document.querySelector("#login-name");
let loginPasswordInp = document.querySelector("#login-password");

// instruments inputs
let instrumentsImage = document.querySelector("#instruments-image");
let instrumentsTitle = document.querySelector("#instruments-title");
let instrumentsDesc = document.querySelector("#instruments-desc");
let instrumentsCategory = document.querySelector("#instruments-category");
let instrumentsPrice = document.querySelector("#instruments-price");
let instrumentsReliz = document.querySelector("#instruments-reliz");
let instrumentsPlatforms = document.querySelector("#instruments-platforms");
let addInstrumentsBtn = document.querySelector(".add-instruments-btn");
let saveChangesBtn = document.querySelector(".save-changes-btn");

//! API
const INSTRUMENTS_API = "http://localhost:1111/instruments";
const USERS_API = "http://localhost:1111/users";

//! pushing to db
//! ФУНКЦИЯ ДЛЯ ПУША НА СЕРВЕР
registerAdminModal.setAttribute("style", "display: none");

async function addAllInstrumentsToDB() {
  for (let instrument of instruments) {
    await fetch(INSTRUMENTS_API, {
      method: "POST",
      body: JSON.stringify(instrument),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  }
}
pushBtn.addEventListener("click", addAllInstrumentsToDB);

// REGISTRATION FOR ADMIN
//* РЕГИСТРАЦИЯ АДМИНА

//* ФУНЦИЯ ОЧИСТКИ ИНПУТОВ
function cleanRegAdminInps() {
  regAdminNameInp.value = "";
  regAdminAgeInp.value = "";
  regAdminEmailInp.value = "";
  regAdminPasswordInp.value = "";
  regAdminPasswordConfirmInp.value = "";
}

async function registerAdminFunc() {
  if (
    !regAdminNameInp.value.trim() ||
    !regAdminAgeInp.value.trim() ||
    !regAdminEmailInp.value.trim() ||
    !regAdminPasswordInp.value.trim() ||
    !regAdminPasswordConfirmInp.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }
  let uniqueName = await checkUniqueUsername(regAdminNameInp.value);
  if (uniqueName) {
    alert("Пользователь с таким именем уже существует");
    cleanRegAdminInps();
    return;
  }
  if (regAdminPasswordInp.value !== regAdminPasswordConfirmInp.value) {
    alert("пропуск с ошибкой");
    cleanRegAdminInps();
    return;
  }
  checkUniqueUsername();

  //* СОЗДАЕМ НОВЫЙ ОБЬЕКТ КОТОРЫЙ ЗАПУШИМ В БД
  let adminObj = {
    name: regAdminNameInp.value,
    age: regAdminAgeInp.value,
    email: regAdminEmailInp.value,
    password: regAdminPasswordInp.value,
    isAdmin: true,
  };

  //* ПУШИМ
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(adminObj),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  cleanRegAdminInps();
}

regAdminBtn.addEventListener("click", registerAdminFunc);

// REGISTRATION

//* ЗДЕСЬ ПРОВЕРКА НА ТО ЧТО ЕСТЬ ЛИ У ПОЛЬЗОВАТЕЛСЯ АДМИНКА
function checkAddAdmin() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user) return user.isAdmin;
  return false;
}

//* ЗДЕСЬ КНОПКА ДОБАВЛЕНИЯ АДМИНОВ. ЕСЛИ У ПОЛЬЗОАВАТЕЛСЯ ЕСТЬ АДМИНКА ТО ОН ВИДИТ ЭТУ КНОПКУ
function addAdmin() {
  if (!checkAddAdmin()) {
    registerAdminModal.setAttribute("style", "display: none !important");
  } else {
    registerAdminModal.setAttribute("style", "display: block !important");
  }
}
//* ОЧИШЕНИЕ ИНПУТОВ
function cleanRegInps() {
  regNameInp.value = "";
  regAgeInp.value = "";
  regEmailInp.value = "";
  regPasswordInp.value = "";
  regPasswordConfirmInp.value = "";
}

//* ПРОВЕРКА НА УНИКАЛЬНОЕ ИМЯ
async function checkUniqueUsername(name) {
  let res = await fetch(USERS_API);
  let users = await res.json();
  return users.some((item) => item.name == name);
}

//* РЕГИСТРАЦИЯ ОБЫЧНОГО ПОЛЬЗОВАТЕЛЯ
async function registerUserFunc() {
  if (
    !regNameInp.value.trim() ||
    !regAgeInp.value.trim() ||
    !regEmailInp.value.trim() ||
    !regPasswordInp.value.trim() ||
    !regPasswordConfirmInp.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }
  let uniqueName = await checkUniqueUsername(regNameInp.value);
  if (uniqueName) {
    alert("User with this name is exists");
    cleanRegInps();
    return;
  }
  if (regPasswordInp.value !== regPasswordConfirmInp.value) {
    alert("eror pass");
    cleanRegInps();
    return;
  }
  checkUniqueUsername();

  //* СОБИРАЕМ ПОЛЬЗОВАТЕЛЯ
  let userObj = {
    name: regNameInp.value,
    age: regAgeInp.value,
    email: regEmailInp.value,
    password: regPasswordInp.value,
    isAdmin: false, //! АДМИНКИ НЕТ, ТАК КАК ЭТО ОБЫЧНЫЙ ПОЛЬЗОВАТЕЛЬ
  };
  //* ПУШИМ ПОЛЬЗОВАТЕЛЯ
  fetch(USERS_API, {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  cleanRegInps();
}

regBtn.addEventListener("click", registerUserFunc);

//  LOGIN
// АВТОРИЗАЦИЮ

// ЗДЕСЬ ПРОВЕРЯЕМ АВТОРИЗОВАН ЛИ ПОЛЬЗОВАТЕЛЬ,
// ЕСЛИ ДА ТО УБИРАЕМ КНОПКУ LOGIN И СТАВИМ LOGOUT.
// ЕСЛИ НЕТ ТО НАОБОРОТ
function checkLoginLoogoutStatus() {
  let user = localStorage.getItem("user");
  if (!user) {
    loginUserModalBtn.parentNode.style.display = "block";
    logoutUserBtn.parentNode.style.display = "none";
    showUsername.innerText = "";
  } else {
    loginUserModalBtn.parentNode.style.display = "none";
    logoutUserBtn.parentNode.style.display = "block";
    showUsername.innerText = JSON.parse(user).name;
    showUsername.style.color = " rgb(135, 116, 76)";
  }
  // ВЫЗЫВАЕМ ФУНКЦИЮ КНОПКИ АДМИНА.
  showAdminPanel();
  render();
}
checkLoginLoogoutStatus();

// ПРОВЕРЯЕМ ЕСТЬ ЛИ ТАКОЙ ПОЛЬЗОВАТЕЛЬ В БД
function checkUserInUsers(name, users) {
  return users.some((item) => item.name === name);
}

// ПРОВЕРЯЕМ СОВПАДЕНИЕ ПАРОЛЕЙ
function checkUserPassword(user, password) {
  return user.password === password;
}

// ПУШИМ ГОТОВОГО ПОЛЬЗОВАТЕЛЯ В LOCAL STORAGE
function setUserToStorage(name, isAdmin) {
  localStorage.setItem(
    "user",
    JSON.stringify({
      name,
      isAdmin,
    })
  );
}

//* ОЧИСТКА ИНПУТОВ
function cleanLogInps() {
  loginNameInp.value = "";
  loginPasswordInp.value = "";
}

//* АВТОРИЗАЦИЯ
async function loginUserFunc() {
  //* ПРОВЕРКА НА ЗАПОЛНЕНИЕ ИНПУТОВ
  if (!loginNameInp.value.trim() || !loginPasswordInp.value.trim()) {
    alert("Заполните все поля!");
    cleanLogInps();
    return;
  }

  let res = await fetch(USERS_API);
  let users = await res.json();
  if (!checkUserInUsers(loginNameInp.value, users)) {
    alert("Юзер не найден");
    cleanLogInps();
    return;
  }

  let userObj = users.find((user) => user.name === loginNameInp.value);

  //* ПРОВЕРКА НА ПАРОЛЬ
  if (!checkUserPassword(userObj, loginPasswordInp.value)) {
    alert("Неверный пароль");
    cleanLogInps();
    return;
  }
  //* ЗДЕСЬ ПУШИМ В LOCAL STORAGE
  setUserToStorage(userObj.name, userObj.isAdmin);
  //* СРАЗУ ПРОВЕРЯЕМ, ЕСЛИ АВТОРИЗОВАЛСЯ ТО КНОПКУ LOGIN УБРАТЬ
  checkLoginLoogoutStatus();
  //* ОЧИСТКА ИНПУТОВ
  cleanLogInps();
}

loginBtn.addEventListener("click", loginUserFunc);

// LOGOUT
//* ПРИ НАЖАТИИ НА КНОПКУ LOGOUT ИЗ LOCAL STORAGE УДАЛЯЕТСЯ ЮЗЕР.
logoutUserBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  checkLoginLoogoutStatus();
  render();
});

// PRODUCT LOGIN

//! добавление всех книг на страницу
//* НАДО ДОБАВИТЬ РЕНДЕР ВЕЗДЕ ГДЕ ОБНОВЛЕНИЕ ИДЕТ

let category = "";
let search = "";
let currentPage = 1;

async function render() {
  let requestAPI = `${INSTRUMENTS_API}?q=${search}&_page=${currentPage}&_limit=4`;
  if (category && category !== "all") {
    requestAPI += `&category_like=${category}`;
  }
  contentDiv.innerHTML = "";
  let res = await fetch(requestAPI);
  let data = await res.json();
  data.forEach((instrument) => {
    const categories = instrument.category
      .split(",")
      .map((cat) => cat.trim())
      .join(", ");
    contentDiv.innerHTML += `
    <div class="card mb-3 m-3" style="max-width: 540px; width: 40%; background-color: rgb(236, 228, 211);" id="card-div">
    <div class="row g-0">
        <div class="col-md-4">
            <img
                src="${instrument.image}"
                class="img-fluid rounded-start"
                alt="eror"
                style="height: auto; width: 100%"
            />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title"><strong>${
                  instrument.title
                }</strong></h5>
                <p class="card-text">${instrument.desc}</p>
                <p class="card-text"><strong>${instrument.price}$</strong></p>
                ${
                  checkUserForInstrumentsCreate()
                    ? `<a href="#admin" class="btn btn-color1 btn-edit" id="edit-${instrument.id}">EDIT</a>
                    <a href="#admin" class="btn btn-color1 btn-delete" id="del-${instrument.id}">DELETE</a>`
                    : ""
                }
                ${
                  checkLoginUser()
                    ? `
                    <a href="#" class="btn btn-color1 btn-cart" id="cart-${instrument.id}">TO CART</a>
                    `
                    : ""
                }     
            </div>
        </div>
    </div>
</div>
      `;
  });

  if (data.length === 0) return;
  addDeleteEvent();
  addEditEvent();
  addCategoryToDropdownMenu();
  addCartEvent();
}
render();

// PRODUCT LOGIC
function checkUserForInstrumentsCreate() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) return user.isAdmin;
  return false;
}

function showAdminPanel() {
  if (!checkUserForInstrumentsCreate()) {
    adminPanel.setAttribute("style", "display: none !important;");
  } else {
    adminPanel.setAttribute("style", "display: flex !important;");
  }
  addAdmin();
}

// CREAT

function cleanAdminForm() {
  instrumentsImage.value = "";
  instrumentsTitle.value = "";
  instrumentsDesc.value = "";
  instrumentsCategory.value = "";
  instrumentsPrice.value = "";
  instrumentsReliz.value = "";
  instrumentsPlatforms.value = "";
}

async function createProduct() {
  if (
    !instrumentsImage.value.trim() ||
    !instrumentsTitle.value.trim() ||
    !instrumentsDesc.value.trim() ||
    !instrumentsCategory.value.trim() ||
    !instrumentsPrice.value.trim() ||
    !instrumentsReliz.value.trim() ||
    !instrumentsPlatforms.value.trim()
  ) {
    alert("Заполните все поля!");
    return;
  }

  let instrumentsObj = {
    image: instrumentsImage.value,
    title: instrumentsTitle.value,
    desc: instrumentsDesc.value,
    category: instrumentsCategory.value,
    price: instrumentsPrice.value,
  };

  await fetch(INSTRUMENTS_API, {
    method: "POST",
    body: JSON.stringify(instrumentsObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  cleanAdminForm();

  render();
}

addInstrumentsBtn.addEventListener("click", createProduct);

// DELETE
async function deleteProduct(e) {
  let instrumentsId = e.currentTarget.id.split("-")[1];

  await fetch(`${INSTRUMENTS_API}/${instrumentsId}`, {
    method: "DELETE",
  });

  render();
}

function addDeleteEvent() {
  let deleteInstrumentsBtns = document.querySelectorAll(".btn-delete");
  deleteInstrumentsBtns.forEach((btn) =>
    btn.addEventListener("click", deleteProduct)
  );
}

// EDIT
function checkCreateAndSaveBtn() {
  if (saveChangesBtn.id) {
    addInstrumentsBtn.setAttribute("style", "display: none;");
    saveChangesBtn.setAttribute("style", "display: block;");
  } else {
    addInstrumentsBtn.setAttribute("style", "display: block;");
    saveChangesBtn.setAttribute("style", "display: none;");
  }
}
checkCreateAndSaveBtn();

async function addProductDataToForm(e) {
  let instrumentsId = e.currentTarget.id.split("-")[1];
  let res = await fetch(`${INSTRUMENTS_API}/${instrumentsId}`);
  let instrumentObj = await res.json();

  instrumentsTitle.value = instrumentObj.title;
  instrumentsPrice.value = instrumentObj.price;
  instrumentsDesc.value = instrumentObj.desc;
  instrumentsImage.value = instrumentObj.image;
  instrumentsCategory.value = instrumentObj.category;

  saveChangesBtn.setAttribute("id", instrumentObj.id);

  checkCreateAndSaveBtn();
}

function addEditEvent() {
  let editProductBtns = document.querySelectorAll(".btn-edit");
  editProductBtns.forEach((btn) =>
    btn.addEventListener("click", addProductDataToForm)
  );
}

async function saveChanges(e) {
  let updatedProductObj = {
    id: e.target.id,
    title: instrumentsTitle.value,
    price: instrumentsPrice.value,
    desc: instrumentsDesc.value,
    image: instrumentsImage.value,
    category: instrumentsCategory.value,
  };

  await fetch(`${INSTRUMENTS_API}/${e.target.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedProductObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  cleanAdminForm();

  saveChangesBtn.removeAttribute("id");

  render();
}

saveChangesBtn.addEventListener("click", saveChanges);

// FILTER
let categoriesList = document.querySelector(".dropdown-menu");

async function addCategoryToDropdownMenu() {
  let res = await fetch(INSTRUMENTS_API);
  let data = await res.json();
  let categoriesSet = new Set();
  data.forEach((product) => {
    product.category.split(",").forEach((category) => {
      categoriesSet.add(category.trim());
    });
  });

  categoriesList.innerHTML =
    '<li><a class="dropdown-item" href="#">Все инструменты</a></li>';
  let uniqueCategories = Array.from(categoriesSet).sort();
  uniqueCategories.forEach((category) => {
    categoriesList.innerHTML += `
      <li><a class="dropdown-item" href="#">${category}</a></li>
    `;
  });

  addClickEventOnDropdownItem();
}

function filterOnCategory(e) {
  let categoryText = e.target.innerText;
  if (categoryText === "Все инструменты") {
    category = "";
  } else {
    category = categoryText;
  }
  render();
}

function addClickEventOnDropdownItem() {
  let categoryItems = document.querySelectorAll(".dropdown-item");
  categoryItems.forEach((item) =>
    item.addEventListener("click", filterOnCategory)
  );
}
addCategoryToDropdownMenu();

// SEARCH
searchForm.addEventListener("input", (e) => {
  e.preventDefault();
  search = searchInp.value;
  render();
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  search = searchInp.value.trim();
  render();
});

// PAGINATION
let prevPageBtn = document.querySelector("#prev-page-btn");
let nextPageBtn = document.querySelector("#next-page-btn");

async function getPagesCount() {
  let res = await fetch(INSTRUMENTS_API);
  let products = await res.json();
  let pagesCount = Math.ceil(products.length / 2);
  return pagesCount;
}

async function checkPages() {
  let maxPagesNum = await getPagesCount();
  if (currentPage === 1) {
    prevPageBtn.setAttribute("style", "display: none;");
    nextPageBtn.setAttribute("style", "display: block;");
  } else if (currentPage === maxPagesNum) {
    prevPageBtn.setAttribute("style", "display: block;");
    nextPageBtn.setAttribute("style", "display: none;");
  } else {
    prevPageBtn.setAttribute("style", "display: block;");
    nextPageBtn.setAttribute("style", "display: block;");
  }
}
checkPages();

prevPageBtn.addEventListener("click", () => {
  currentPage--;
  checkPages();
  render();
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  checkPages();
  render();
});

//  DETAILS
 
let detailsModal = document.getElementById("detailsModal"); 
let detailsModalBody = document.getElementById("detailsModalBody"); 
let detailsModalClose = document.getElementById("detailsModalClose"); 
 
document.addEventListener("click", (e) => { 
  let classProduct = [...e.target.classList]; 
  if (classProduct.includes("detailsCard")) { 
    productDetails(e.target.id); 
    detailsModal.style.display = "flex"; 
  } 
}); 
 
function productDetails(id) { 
  try { 
    fetch(`${api}/${id}`) 
      .then((res) => res.json()) 
      .then((data) => { 
        detailsModalBody.innerHTML = ` 
        <div style="width: 35%"> 
        <img src="${data.productImage}" alt="" style = "width: 100%" /> 
      </div> 
      <div style="width: 60%; height: 25rem; display: flex; flex-direction: column; justify-content: space-between"> 
        <div> 
        <h6>${data.productName}</h6> 
        <p style = "font-size: 14px">${data.productDetails}</p> 
        </div> 
        <div> 
        <p >Категория: ${data.productCategory}</p> 
        </div> 
      </div> 
        `; 
      }); 
  } catch { 
    console.log("Error"); 
  } 
} 
 
detailsModalClose.addEventListener("click", () => { 
  detailsModal.style.display = "none"; 
});

// CART LOGIC
function checkLoginUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  return user;
}

// ADD PRODUCT TO CART
async function getProductObjectById(productId) {
  let res = await fetch(`${INSTRUMENTS_API}/${productId}`);
  let productObj = await res.json();
  return productObj;
}

function countCartTotalCost(products) {
  let cartTotalCost = products.reduce((acc, currentItem) => {
    return acc + currentItem.totalCost;
  }, 0);
  return cartTotalCost;
}

function addNewProductToCart(productCartObj) {
  let cartObj = JSON.parse(localStorage.getItem("cart"));
  cartObj.products.push(productCartObj);
  cartObj.totalCost = countCartTotalCost(cartObj.products);
  localStorage.setItem("cart", JSON.stringify(cartObj));
}

function addCartObjToLocalStorage() {
  let cartOwner = JSON.parse(localStorage.getItem("user"));
  let cartObj = {
    id: Date.now(),
    owner: cartOwner.username,
    totalCost: 0,
    products: [],
  };
  localStorage.setItem("cart", JSON.stringify(cartObj));
}

async function addProductToCart(e) {
  let productId = e.target.id.split("-")[1];
  let productObj = await getProductObjectById(productId);
  let cartProductCount = +prompt("Введите количество товаров в корзину");
  let productCartObj = {
    count: cartProductCount,
    totalCost: +productObj.price * cartProductCount,
    productItem: productObj,
  };
  let cartObj = JSON.parse(localStorage.getItem("cart"));
  if (cartObj) {
    addNewProductToCart(productCartObj);
  } else {
    addCartObjToLocalStorage();
    addNewProductToCart(productCartObj);
  }
}

function addCartEvent() {
  let cartBtns = document.querySelectorAll(".btn-cart");
  cartBtns.forEach((btn) => btn.addEventListener("click", addProductToCart));
}

// RENDER CART
function cartRender() {
  let cartObj = JSON.parse(localStorage.getItem("cart"));
  if (!cartObj) {
    cartTable.innerHTML = "<h3>Нет товаров в корзине!</h3>";
    cartTotalCost.innerText = "Total cost: 0$";
    return;
  }
  cartTable.innerHTML = `
        <tr>
            <th class="border border-dark">Image</th>
            <th class="border border-dark">Title</th>
            <th class="border border-dark">Count</th>
            <th class="border border-dark">Price</th>
            <th class="border border-dark">Total</th>
            <th class="border border-dark">Delete</th>
        </tr>
    `;
  cartObj.products.forEach((cartProduct) => {
    cartTable.innerHTML += `
        <tr>
            <td class="border border-dark">
            <img src=${cartProduct.productItem.image} alt="error:(" width="50" height="50">
            </td>
            <td class="border border-dark">${cartProduct.productItem.title}</td>
            <td class="border border-dark">${cartProduct.count}</td>
            <td class="border border-dark">${cartProduct.productItem.price}</td>
            <td class="border border-dark">${cartProduct.totalCost}</td>
            <td class="border border-dark">
            <button class="btn btn-color del-cart-btn" id="cart-product-${cartProduct.productItem.id}">DELETE</button>
            </td>
        </tr>
        `;
  });
  cartTotalCost.innerText = `Total cost: ${cartObj.totalCost}$`;
  cartTotalCost.style.color = "rgba(176, 152, 101, 0.774)";
  addDeleteEventForCartProduct();
}

cartModalBtn.addEventListener("click", cartRender);

// REMOVE PRODUCT FROM CART
function deleteProductFromCart(e) {
  let productId = e.target.id.split("-");
  productId = productId[productId.length - 1];
  let cartObj = JSON.parse(localStorage.getItem("cart"));
  cartObj.products = cartObj.products.filter(
    (cartProduct) => cartProduct.productItem.id != productId
  );
  cartObj.totalCost = countCartTotalCost(cartObj.products);
  if (cartObj.products.length === 0) {
    localStorage.removeItem("cart");
  } else {
    localStorage.setItem("cart", JSON.stringify(cartObj));
  }
  cartRender();
}

function addDeleteEventForCartProduct() {
  let delCartProductBtns = document.querySelectorAll(".del-cart-btn");
  delCartProductBtns.forEach((btn) =>
    btn.addEventListener("click", deleteProductFromCart)
  );
}

// CREAT ORDER
const ORDERS_API = "http://localhost:1111/orders";

async function sendOrder(cartObj) {
  await fetch(ORDERS_API, {
    method: "POST",
    body: JSON.stringify(cartObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
}

async function createOrder() {
  let cartObj = JSON.parse(localStorage.getItem("cart"));
  if (!cartObj) {
    alert("No products in cart!");
    return;
  }
  await sendOrder(cartObj);
  localStorage.removeItem("cart");
  cartRender();
}

createCartOrderBtn.addEventListener("click", createOrder);

// CLEAN ALL
cleanCartBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  cartRender();
});
