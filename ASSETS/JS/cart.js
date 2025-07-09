// Assuming you have the above JSON stored in a variable like:
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");
  const emptyCart = document.getElementById("emptyCart");
  const cartTotalWrapper = document.getElementById("cartTotalWrapper"); 

  cartItems.innerHTML = "";
  let total = 0,
      count = 0;

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartTotal.innerText = 0;
    cartCount.innerText = 0;
    cartTotalWrapper.style.display = "none"; 
    return;
  }

  emptyCart.style.display = "none";
  cartTotalWrapper.style.display = "block"; 

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;
    cartItems.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <img src="${item.image}" width="50" height="50" style="object-fit:cover;">
        <div class="flex-grow-1 mx-2">
          <h6 class="mb-1">${item.name}</h6>
          <div class="input-group input-group-sm" style="width:120px;">
            <button class="btn btn-outline-secondary" onclick="changeQty(${index}, -1)">-</button>
            <input type="text" class="form-control text-center" value="${item.qty}" readonly>
            <button class="btn btn-outline-secondary" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">&times;</button>
      </div>
    `;
  });

  cartTotal.innerText = total;
  cartCount.innerText = count;
}

function toggleCart() {
  const drawer = document.getElementById("cartDrawer");
  drawer.style.transform =
    drawer.style.transform === "translateX(0%)"
      ? "translateX(100%)"
      : "translateX(0%)";
  updateCartUI();
}

function addToCart(product) {
  const exist = cart.find((item) => item.name === product.name);
  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function renderProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  products.forEach((p) => {
    container.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card h-100">
          <img src="${p.image}" class="card-img-top" style="height:200px; object-fit:cover;">
          <div class="card-body text-center">
            <span class="badge bg-warning text-dark">${p.badge || ""}</span>
            <h6 class="mt-2">${p.name}</h6>
            <p class="text-muted">${p.subtitle || ""}</p>
            <p>₹${p.price}${p.oldPrice ? ` <s class='text-danger ms-2'>₹${p.oldPrice}</s>` : ""}</p>
            <p class="small text-warning">⭐ ${p.rating} (${p.reviews})</p>
            <button class="btn btn-dark" onclick='addToCart(${JSON.stringify(p)})'>Add to Bag</button>
          </div>
        </div>
      </div>
    `;
  });
}
function goToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}


