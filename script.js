// Naya product add karna ho to bas ek aur { ... } is list mein daal dein
const products = [
  {
    id: 1,
    name: "The Surgical Workhorse",
    category: "Surgical Instruments",
    price: 500,
    image: "product1.jpg",
    description: "Perfect for effortless cutting of tough, dense tissues and heavy surgical materials."
  }
];

let cart = [];

function showProducts() {
  const list = document.getElementById("product-list");
  const text = document.getElementById("search-box").value.toLowerCase();
  const cat = document.getElementById("category-filter").value;

  const filtered = products.filter(function (p) {
    const matchText = p.name.toLowerCase().includes(text);
    const matchCat = cat === "all" || p.category === cat;
    return matchText && matchCat;
  });

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = "<p>Koi product nahi mila.</p>";
    return;
  }

  filtered.forEach(function (p) {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="category">${p.category}</p>
        <p>${p.description}</p>
        <p class="price">Rs ${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// products ki categories khud dhoondh kar dropdown mein daalta hai
function fillCategories() {
  const select = document.getElementById("category-filter");
  const categories = [];

  products.forEach(function (p) {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  categories.forEach(function (c) {
    select.innerHTML += `<option value="${c}">${c}</option>`;
  });
}
  
function addToCart(id) {
  const item = cart.find(function (c) { return c.id === id; });

  if (item) {
    item.qty = item.qty + 1;
  } else {
    const p = products.find(function (p) { return p.id === id; });
    cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }

  showCart();
}

function removeFromCart(id) {
  cart = cart.filter(function (c) { return c.id !== id; });
  showCart();
}

function showCart() {
  const box = document.getElementById("cart-box");
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    box.innerHTML = "<p>Cart is empty.</p>";
  } else {
    let html = "";
    cart.forEach(function (c) {
      total = total + c.price * c.qty;
      count = count + c.qty;
      html += `
        <div class="cart-row">
          <span>${c.name} x ${c.qty}</span>
          <span>Rs ${c.price * c.qty}</span>
          <button class="remove" onclick="removeFromCart(${c.id})">Remove</button>
        </div>
      `;
    });
    html += `<p class="total">Total: Rs ${total}</p>`;
    box.innerHTML = html;
  }

  document.getElementById("cart-count").textContent = count;
}
fillCategories();
showProducts();
showCart();
showProducts();
showCart();// Yahan apna WhatsApp number likhein: 92 + number (shuru ka 0 hata kar), bina space ke
const WHATSAPP_NUMBER = "9232004980196";

function placeOrder() {
  const name = document.getElementById("cust-name").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();
  const address = document.getElementById("cust-address").value.trim();

  if (cart.length === 0) {
    alert("Pehle cart mein koi product daalein.");
    return;
  }

  if (name === "" || phone === "" || address === "") {
    alert("Naam, phone aur address teeno likhna zaroori hai.");
    return;
  }

  let total = 0;
  let lines = [];
  cart.forEach(function (c) {
    total = total + c.price * c.qty;
    lines.push(c.name + " x " + c.qty + " = Rs " + c.price * c.qty);
  });

  const message =
    "Naya Order\n\n" +
    lines.join("\n") +
    "\n\nTotal: Rs " + total +
    "\n\nNaam: " + name +
    "\nPhone: " + phone +
    "\nAddress: " + address;

  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}