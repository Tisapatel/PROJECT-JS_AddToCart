// Topbar text changer
const topbarTexts = [
  "Experience glowing skin with Nova.",
  "Get 10% off on your first order!",
  "Free shipping on orders above ₹499.",
  "Try our new vitamin C serum now!",
  "Nourish your skin with nature’s best."
];
let topIndex = 0;

setInterval(() => {
  document.getElementById("topbar-text").textContent = topbarTexts[topIndex];
  topIndex = (topIndex + 1) % topbarTexts.length;
}, 1000);

// Sticky Navbar Show/Hide on Scroll
let lastScrollTop = 0;
const header = document.querySelector(".header-fixed");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.style.transform = "translateY(-100%)"; // Hide
  } else {
    header.style.transform = "translateY(0)"; // Show
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


// Banner slider logic
let current = 0;
const images = document.querySelectorAll(".slider img");

setInterval(() => {
  images[current].classList.remove("active");
  current = (current + 1) % images.length;
  images[current].classList.add("active");
}, 3000); // 3 seconds

// Add to Cart

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
}


// products 
  document.addEventListener("DOMContentLoaded", () => {
      fetch("products.json")
        .then((res) => res.json())
        .then((data) => {
          const container = document.getElementById("product-container");
          container.innerHTML = "";

          data.products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

 card.innerHTML = `
  <div class="card-img position-relative">
    <img src="${product.image}" alt="${product.name}" class="main-img" />
    <img src="${product.hoverImage}" alt="${product.name}" class="hover-img" />
  </div>
  ${product.badge ? `<div class="badge-top">${product.badge}</div>` : ""}
  <div class="card-details">
    <div class="title">${product.name}</div>
    <div class="subtitle">${product.subtitle}</div>
    <div class="rating">⭐⭐⭐⭐⭐ ${product.rating} (${product.reviews} Reviews)</div>
    <div class="price-block">
      <span class="price">₹${product.price}</span>
      ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ""}
    </div>
  </div>
  <div class="add-to-cart-slide btn btn-dark mt-2 text-center" style="cursor:pointer;">
    Add to Bag
  </div>
`;


  // Bind Add to Bag click
  card.querySelector(".add-to-cart-slide").addEventListener("click", () => {
    addToCart(product);
    toggleCart(); // optional: open drawer immediately
  });

  container.appendChild(card);
});

        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
  });
