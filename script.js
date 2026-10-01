
const WHATSAPP = "923157540218";

const products = [
  {id:1,name:"Printed Lawn 3 Piece",category:"Ladies",fabric:"Lawn",price:2850,new:true,img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Premium Cotton Fabric",category:"Ladies",fabric:"Cotton",price:2200,img:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Elegant Linen Fabric",category:"Ladies",fabric:"Linen",price:3200,img:"https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Winter Khaddar",category:"Ladies",fabric:"Khaddar",price:3500,new:true,img:"https://images.unsplash.com/photo-1583391733956-6c78276477e9?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Chiffon Collection",category:"Ladies",fabric:"Chiffon",price:4200,img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Luxury Silk Fabric",category:"Ladies",fabric:"Silk",price:4500,img:"https://images.unsplash.com/photo-1610030469668-8e9f641aafc6?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Embroidered Suit Fabric",category:"Ladies",fabric:"Embroidered",price:5000,new:true,img:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Printed Lawn 2 Piece",category:"Ladies",fabric:"Lawn",price:1800,img:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Premium Wash & Wear",category:"Gents",fabric:"Wash & Wear",price:2500,new:true,img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Classic Cotton Fabric",category:"Gents",fabric:"Cotton",price:2000,img:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Premium Khaddar",category:"Gents",fabric:"Khaddar",price:2800,img:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"Luxury Linen Fabric",category:"Gents",fabric:"Linen",price:3500,img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
  {id:13,name:"Classic Boski Fabric",category:"Gents",fabric:"Boski",price:4000,img:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"},
  {id:14,name:"Plain Unstitched Fabric",category:"Gents",fabric:"Plain",price:2300,img:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"},
  {id:15,name:"Embroidered Fabric",category:"Gents",fabric:"Embroidered",price:3800,new:true,img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
  {id:16,name:"Winter Fabric Collection",category:"Gents",fabric:"Khaddar",price:3000,img:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"}
];

let cart = [];

const money = n => Number(n).toLocaleString("en-PK");
const getProduct = id => products.find(p => p.id === Number(id));

function productCard(p) {
  return `
    <article class="product-card">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x750/f3e8ee/681640?text=Fabric+Photo'">
      <div class="product-info">
        <span class="product-category">${p.fabric}</span>
        <h3>${p.name}</h3>
        <p class="product-price">Rs. ${money(p.price)}</p>
        <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn light-btn" onclick="buyNow(${p.id})">Buy Now</button>
        <button class="whatsapp-order" onclick="buyNow(${p.id})">Order on WhatsApp</button>
      </div>
    </article>`;
}

function renderProducts(category, containerId, searchId, filterId, sortId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const query = document.getElementById(searchId).value.trim().toLowerCase();
  const categoryFilter = document.getElementById(filterId).value;
  const sort = document.getElementById(sortId).value;

  let list = products.filter(p =>
    p.category === category &&
    (categoryFilter === "all" || p.fabric === categoryFilter) &&
    `${p.name} ${p.fabric} ${p.category}`.toLowerCase().includes(query)
  );

  if (sort === "low") list.sort((a,b) => a.price - b.price);
  if (sort === "high") list.sort((a,b) => b.price - a.price);

  container.innerHTML = list.length
    ? list.map(productCard).join("")
    : '<p class="empty-message">No matching products found.</p>';
}

function renderAll() {
  const newBox = document.getElementById("newProducts");
  newBox.innerHTML = products.filter(p => p.new).map(productCard).join("");

  renderProducts("Ladies","ladiesProducts","ladiesSearch","ladiesCategory","ladiesSort");
  renderProducts("Gents","gentsProducts","gentsSearch","gentsCategory","gentsSort");
}

function addToCart(id) {
  const p = getProduct(id);
  if (!p) return;

  const item = cart.find(x => x.id === p.id);
  if (item) item.qty++;
  else cart.push({...p, qty:1});

  renderCart();
  alert(p.name + " added to your cart!");
}

function changeQty(id, change) {
  const item = cart.find(p => p.id === Number(id));
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) removeItem(id);
  else renderCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== Number(id));
  renderCart();
}

function renderCart() {
  const box = document.getElementById("cartItems");
  const count = document.getElementById("cartCount");
  const totalBox = document.getElementById("cartTotal");

  const countValue = cart.reduce((sum,p) => sum + p.qty, 0);
  const total = cart.reduce((sum,p) => sum + p.price * p.qty, 0);

  count.textContent = countValue;
  totalBox.textContent = money(total);

  box.innerHTML = cart.length ? cart.map(p => `
    <div class="cart-item">
      <div>
        <strong>${p.name}</strong>
        <p>Rs. ${money(p.price)} × ${p.qty}</p>
        <p>Subtotal: Rs. ${money(p.price * p.qty)}</p>
      </div>
      <div>
        <button onclick="changeQty(${p.id},-1)">−</button>
        <button onclick="changeQty(${p.id},1)">+</button>
        <button onclick="removeItem(${p.id})">Remove</button>
      </div>
    </div>`).join("") :
    '<p class="empty-message">Your cart is empty. Choose a product to begin.</p>';
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function buyNow(id) {
  const p = getProduct(id);
  if (!p) return;

  openWhatsApp(
    `Assalam o Alaikum! I want to order from Uswa's Collection.\n\n` +
    `Product: ${p.name}\nFabric: ${p.fabric}\n` +
    `Price: Rs. ${p.price}\nQuantity: 1\n\n` +
    `Please confirm availability and delivery details.`
  );
}

document.getElementById("goCheckout").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty. Please add a product first.");
    return;
  }
  document.getElementById("checkout").scrollIntoView({behavior:"smooth"});
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  renderCart();
});

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    alert("Please add products to your cart before placing an order.");
    document.getElementById("ladies").scrollIntoView({behavior:"smooth"});
    return;
  }

  const form = new FormData(event.currentTarget);
  let message = "Assalam o Alaikum! I want to order from Uswa's Collection.\n\n";
  message += `Name: ${form.get("name")}\nPhone: ${form.get("phone")}\n`;
  message += `Email: ${form.get("email") || "Not provided"}\n`;
  message += `City: ${form.get("city")}\nAddress: ${form.get("address")}\n`;
  message += `Payment: ${form.get("payment")}\n\nProducts:\n`;

  cart.forEach(p => {
    message += `${p.name} × ${p.qty} = Rs. ${p.price * p.qty}\n`;
  });

  const total = cart.reduce((sum,p) => sum + p.price * p.qty, 0);
  message += `\nTotal: Rs. ${total}\nPlease confirm my order.`;

  openWhatsApp(message);
});

["ladiesSearch","ladiesCategory","ladiesSort",
 "gentsSearch","gentsCategory","gentsSort"].forEach(id => {
  document.getElementById(id).addEventListener("input", renderAll);
  document.getElementById(id).addEventListener("change", renderAll);
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
  });
});

renderAll();
renderCart();
