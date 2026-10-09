const products = [

  {
    id: 1,
    name: "Buttermilk Pancake",
    category: "Classic",
    price: 30000,
    rating: 4.8,
    image: "https://i.pinimg.com/736x/b6/97/e8/b697e84233207d47edf6526a6261dc8f.jpg",
    description:
      "Classic fluffy pancakes served with butter and maple syrup. Soft, warm, and lightly sweet."
  },

  {
    id: 2,
    name: "Blueberry Pancake",
    category: "Berry",
    price: 40000,
    rating: 4.9,
    image: "https://images.ctfassets.net/rgvc7bserjck/2H6ooYaMvZBGkTwBRxASMx/72f8f02aede11df58843f58df829cd74/FB_Blueberry_Pancakes.jpg",
    description:
      "Fluffy pancakes with juicy blueberries, whipped cream, and a light maple drizzle."
  },

  {
    id: 3,
    name: "Chocolate Pancake",
    category: "Chocolate",
    price: 42000,
    rating: 4.9,
    image: "https://www.tastingtable.com/img/gallery/for-the-absolute-best-dessert-pancakes-stuff-them-with-cookie-dough/l-intro-1719007454.jpg",
    description:
      "Rich chocolate pancakes topped with chocolate chips and whipped cream."
  },

  {
    id: 4,
    name: "Strawberry Pancake",
    category: "Berry",
    price: 45000,
    rating: 4.8,
    image: "https://static.wixstatic.com/media/c8119e_49c301eb7a0243828bb5f11c76da248c~mv2_d_5632_3755_s_4_2.jpg/v1/fill/w_660%2Ch_440%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_auto/c8119e_49c301eb7a0243828bb5f11c76da248c~mv2_d_5632_3755_s_4_2.jpg",
    description:
      "Soft pancakes with fresh strawberries, whipped cream, and strawberry sauce."
  },

  {
    id: 5,
    name: "Banana Pancake",
    category: "Classic",
    price: 38000,
    rating: 4.7,
    image: "https://thienhongphat.vn/images/ruou%20vang/mon%20an/pancake.png",
    description:
      "Golden pancakes paired with sliced banana, butter, and caramel syrup."
  },

  {
    id: 6,
    name: "Biscoff Pancake",
    category: "Special",
    price: 48000,
    rating: 4.9,
    image: "https://alicerezepte.de/assets/images/1764769508442-em8urj0d.jpg",
    description:
      "Fluffy pancakes with cookie crumbs, Biscoff spread, and whipped cream."
  }

];


let selectedProduct = null;
let quantity = 1;
let cart = [];
let favorites = [];
let currentCategory = "All";
let tableNumber = "";
let orderType = "Dine-in";


function formatPrice(price) {
  return "Rp" + price.toLocaleString("id-ID");
}


/* =========================
   PRODUCTS
========================= */

function displayProducts(list = products) {

  const grid =
    document.getElementById("productGrid");

  const count =
    document.getElementById("productCount");

  grid.innerHTML = "";

  count.innerText =
    list.length + " items";


  list.forEach(product => {

    const isFavorite =
      favorites.includes(product.id);


    grid.innerHTML += `

      <div class="product-card">

        <button
          class="card-favorite"
          onclick="toggleFavorite(event, ${product.id})"
        >
          ${isFavorite ? "♥" : "♡"}
        </button>


        <div onclick="openProduct(${product.id})">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <h3>
            ${product.name}
          </h3>


          <div class="rating">

            <span>
              ★ ${product.rating}
            </span>

            · 15 min

          </div>


          <div class="product-price">
            ${formatPrice(product.price)}
          </div>

        </div>

      </div>

    `;

  });

}


/* =========================
   PRODUCT DETAIL
========================= */

function openProduct(id) {

  selectedProduct =
    products.find(
      product =>
        product.id === id
    );

  quantity = 1;


  document.getElementById("detailImage").src =
    selectedProduct.image;

  document.getElementById("detailName").innerText =
    selectedProduct.name;

  document.getElementById("detailRating").innerText =
    "★ " +
    selectedProduct.rating +
    " · 15 min";

  document.getElementById("detailDescription").innerText =
    selectedProduct.description;

  document.getElementById("quantity").innerText =
    quantity;


  updateDetailPrice();
  updateDetailFavorite();


  showPage("detailPage");

}


function updateDetailFavorite() {

  const button =
    document.getElementById(
      "detailFavorite"
    );


  if (
    favorites.includes(
      selectedProduct.id
    )
  ) {

    button.innerText = "♥";

  } else {

    button.innerText = "♡";

  }

}


function toggleDetailFavorite() {

  toggleFavorite(
    null,
    selectedProduct.id
  );

  updateDetailFavorite();

}


function toggleFavorite(event, id) {

  if (event) {
    event.stopPropagation();
  }


  if (
    favorites.includes(id)
  ) {

    favorites =
      favorites.filter(
        favoriteId =>
          favoriteId !== id
      );

    showMessage(
      "Removed from favorites"
    );

  } else {

    favorites.push(id);

    showMessage(
      "Added to favorites ♥"
    );

  }


  displayProducts(
    getFilteredProducts()
  );


  if (
    selectedProduct &&
    selectedProduct.id === id
  ) {

    updateDetailFavorite();

  }

}


/* =========================
   FAVORITES
========================= */

function openFavorites() {

  showPage(
    "favoritePage"
  );

  renderFavorites();

  setActiveNav(
    "navFavorite"
  );

}


function renderFavorites() {

  const container =
    document.getElementById(
      "favoriteProducts"
    );


  const favoriteProducts =
    products.filter(
      product =>
        favorites.includes(
          product.id
        )
    );


  if (
    favoriteProducts.length === 0
  ) {

    container.innerHTML = `

      <div class="empty-favorite">

        <div>♡</div>

        <p>
          No favorite pancakes yet.
        </p>

        <small>
          Tap the heart icon on a pancake
          to save it here.
        </small>

      </div>

    `;

    return;

  }


  container.innerHTML = "";


  favoriteProducts.forEach(product => {

    container.innerHTML += `

      <div class="product-card">

        <button
          class="card-favorite"
          onclick="toggleFavorite(event, ${product.id})"
        >
          ♥
        </button>


        <div onclick="openProduct(${product.id})">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <h3>
            ${product.name}
          </h3>


          <div class="rating">

            <span>
              ★ ${product.rating}
            </span>

            · 15 min

          </div>


          <div class="product-price">
            ${formatPrice(product.price)}
          </div>

        </div>

      </div>

    `;

  });

}


/* =========================
   QUANTITY
========================= */

function changeQuantity(amount) {

  quantity += amount;


  if (quantity < 1) {
    quantity = 1;
  }


  document.getElementById(
    "quantity"
  ).innerText = quantity;


  updateDetailPrice();

}


function updateDetailPrice() {

  if (!selectedProduct) return;


  document.getElementById(
    "detailPrice"
  ).innerText =

    formatPrice(
      selectedProduct.price *
      quantity
    );

}


/* =========================
   CART
========================= */

function addToCart() {

  const existing =
    cart.find(
      item =>
        item.id ===
        selectedProduct.id
    );


  if (existing) {

    existing.quantity +=
      quantity;

  } else {

    cart.push({

      id: selectedProduct.id,

      name:
        selectedProduct.name,

      price:
        selectedProduct.price,

      image:
        selectedProduct.image,

      quantity:
        quantity

    });

  }


  updateCartBadge();

  showMessage(
    "Added to cart"
  );

  openCart();

}


function openCart() {

  showPage(
    "cartPage"
  );

  renderCart();

  setActiveNav(
    "navCart"
  );

}


function renderCart() {

  const container =
    document.getElementById(
      "cartItems"
    );


  if (cart.length === 0) {

    container.innerHTML = `

      <div style="
        text-align:center;
        padding:60px 20px;
        color:#8B7B72;
      ">

        <div style="font-size:45px">
          🛒
        </div>

        <p>
          Your cart is empty.
        </p>

      </div>

    `;


    document.getElementById(
      "subtotal"
    ).innerText = "Rp0";


    document.getElementById(
      "total"
    ).innerText = "Rp0";


    document.getElementById(
      "cartOrderType"
    ).innerText = "Not selected";


    return;

  }


  container.innerHTML = "";

  let total = 0;


  cart.forEach(item => {

    total +=
      item.price *
      item.quantity;


    container.innerHTML += `

      <div class="cart-item">

        <img
          src="${item.image}"
          alt="${item.name}"
        >


        <div>

          <h3>
            ${item.name}
          </h3>


          <p>
            ${formatPrice(item.price)}
          </p>


          <div class="cart-quantity">

            <button
              onclick="
                changeCartQuantity(
                  ${item.id},
                  -1
                )
              "
            >
              −
            </button>


            <span>
              ${item.quantity}
            </span>


            <button
              onclick="
                changeCartQuantity(
                  ${item.id},
                  1
                )
              "
            >
              +
            </button>

          </div>

        </div>


        <button
          onclick="removeCart(${item.id})"
          style="
            border:none;
            background:none;
            font-size:18px;
            color:#8B7B72;
          "
        >
          ×
        </button>

      </div>

    `;

  });


  document.getElementById(
    "subtotal"
  ).innerText =
    formatPrice(total);


  document.getElementById(
    "total"
  ).innerText =
    formatPrice(total);


  document.getElementById(
    "cartOrderType"
  ).innerText =
    orderType;

}


function changeCartQuantity(
  id,
  amount
) {

  const item =
    cart.find(
      product =>
        product.id === id
    );


  if (!item) return;


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  }


  updateCartBadge();

  renderCart();

}


function removeCart(id) {

  cart =
    cart.filter(
      product =>
        product.id !== id
    );


  updateCartBadge();

  renderCart();

}


function updateCartBadge() {

  const count =
    cart.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    );


  document.getElementById(
    "cartBadge"
  ).innerText = count;

}


/* =========================
   TABLE
========================= */

function openTable() {

  showPage(
    "tablePage"
  );

  setActiveNav(
    "navTable"
  );

  updateTableDisplay();

}


function saveTableNumber() {

  const input =
    document.getElementById(
      "tableNumber"
    );


  const value =
    input.value.trim();


  if (value === "") {

    showMessage(
      "Please enter your table number"
    );

    return;

  }


  tableNumber = value;

  updateTableDisplay();


  showMessage(
    "Table number saved"
  );

}


function updateTableDisplay() {

  const current =
    document.getElementById(
      "currentTable"
    );


  if (!current) return;


  if (tableNumber) {

    current.innerText =
      "Current table: Table " +
      tableNumber;

  } else {

    current.innerText =
      "No table number saved";

  }

}


/* =========================
   ORDER TYPE
========================= */

function selectOrderType(type) {

  orderType = type;


  const dineIn =
    document.getElementById(
      "dineInOption"
    );

  const takeaway =
    document.getElementById(
      "takeawayOption"
    );

  const tableSection =
    document.getElementById(
      "tableCheckoutSection"
    );


  dineIn.classList.remove(
    "selected"
  );

  takeaway.classList.remove(
    "selected"
  );


  if (type === "Dine-in") {

    dineIn.classList.add(
      "selected"
    );

    tableSection.style.display =
      "block";

  } else {

    takeaway.classList.add(
      "selected"
    );

    tableSection.style.display =
      "none";

  }


  renderCart();

}


/* =========================
   CHAT
========================= */

function openMessages() {

  showPage(
    "messagePage"
  );

  setActiveNav(
    "navMessage"
  );


  document.getElementById(
    "messageBadge"
  ).style.display =
    "none";

}


function handleChatKey(event) {

  if (
    event.key === "Enter"
  ) {

    sendMessage();

  }

}


function sendMessage() {

  const input =
    document.getElementById(
      "chatInput"
    );


  const message =
    input.value.trim();


  if (!message) return;


  const chat =
    document.getElementById(
      "chatMessages"
    );


  const messageDiv =
    document.createElement(
      "div"
    );

  messageDiv.className =
    "message user";


  const bubble =
    document.createElement(
      "div"
    );

  bubble.className =
    "message-bubble";

  bubble.innerText =
    message;


  const small =
    document.createElement(
      "small"
    );

  small.innerText =
    "You · Now";


  messageDiv.appendChild(
    bubble
  );

  messageDiv.appendChild(
    small
  );


  chat.appendChild(
    messageDiv
  );


  input.value = "";

  chat.scrollTop =
    chat.scrollHeight;


  setTimeout(() => {

    chat.innerHTML += `

      <div class="message worker">

        <div class="message-bubble">

          Thank you for your message! 😊
          A staff member will help you shortly.

        </div>

        <small>
          Staff · Now
        </small>

      </div>

    `;


    chat.scrollTop =
      chat.scrollHeight;

  }, 800);

}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

  if (cart.length === 0) {

    showMessage(
      "Your cart is empty"
    );

    return;

  }


  document.getElementById(
    "checkoutTotal"
  ).innerText =
    formatPrice(
      getCartTotal()
    );


  document.getElementById(
    "checkoutTable"
  ).value =
    tableNumber
      ? "Table " + tableNumber
      : "";


  if (
    orderType === "Dine-in"
  ) {

    if (!tableNumber) {

      showMessage(
        "Please enter your table number first"
      );

      openTable();

      return;

    }

  }


  document.querySelector(
    'input[name="orderType"][value="' +
    orderType +
    '"]'
  ).checked = true;


  selectOrderType(
    orderType
  );


  showPage(
    "checkoutPage"
  );

}


function getCartTotal() {

  return cart.reduce(
    (total, item) =>
      total +
      item.price *
      item.quantity,
    0
  );

}


/* =========================
   PLACE ORDER
========================= */

function placeOrder() {

  const name =
    document.getElementById(
      "customerName"
    ).value.trim();


  if (name === "") {

    showMessage(
      "Please enter your name"
    );

    return;

  }


  if (
    orderType === "Dine-in" &&
    !tableNumber
  ) {

    showMessage(
      "Please enter your table number"
    );

    return;

  }


  const successMessage =
    document.getElementById(
      "successMessage"
    );


  if (
    orderType === "Dine-in"
  ) {

    successMessage.innerHTML = `

      Your order has been successfully placed.

      <br>

      Your order will be served at
      <strong>Table ${tableNumber}</strong>.

      <br>

      Thank you for ordering from Fluffy Bites.

    `;

  } else {

    successMessage.innerHTML = `

      Your order has been successfully placed.

      <br>

      Your order will be prepared
      for takeaway.

      <br>

      Thank you for ordering from Fluffy Bites.

    `;

  }


  cart = [];

  updateCartBadge();


  showPage(
    "successPage"
  );

}


/* =========================
   CATEGORY
========================= */

function filterCategory(
  category,
  button
) {

  currentCategory =
    category;


  document
    .querySelectorAll(
      ".category"
    )
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });


  button.classList.add(
    "active"
  );


  displayProducts(
    getFilteredProducts()
  );

}


function getFilteredProducts() {

  let result =
    products;


  if (
    currentCategory !==
    "All"
  ) {

    result =
      result.filter(
        product =>
          product.category ===
          currentCategory
      );

  }


  return result;

}


function searchProducts() {

  const keyword =
    document
      .getElementById(
        "searchInput"
      )
      .value
      .toLowerCase();


  let result =
    getFilteredProducts();


  result =
    result.filter(
      product =>
        product.name
          .toLowerCase()
          .includes(keyword)
    );


  displayProducts(
    result
  );

}


/* =========================
   PAGE
========================= */

function showPage(pageId) {

  document
    .querySelectorAll(
      ".page"
    )
    .forEach(page => {

      page.classList.remove(
        "active"
      );

    });


  document
    .getElementById(
      pageId
    )
    .classList.add(
      "active"
    );

}


function setActiveNav(navId) {

  document
    .querySelectorAll(
      ".nav-item"
    )
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });


  const selected =
    document.getElementById(
      navId
    );


  if (selected) {

    selected.classList.add(
      "active"
    );

  }

}


function goHome() {

  showPage(
    "homePage"
  );

  setActiveNav(
    "navHome"
  );

}


/* =========================
   TOAST
========================= */

function showMessage(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.innerText =
    message;

  toast.style.display =
    "block";


  setTimeout(() => {

    toast.style.display =
      "none";

  }, 1800);

}


/* =========================
   INITIALIZE
========================= */

displayProducts(
  products
);

updateCartBadge();