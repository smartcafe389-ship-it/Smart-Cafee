async function loadMenu() {
    const container = document.getElementById("menuContainer");

    try {
        const savedMenu = JSON.parse(localStorage.getItem("menuData"));
        let items = [];

        if (savedMenu && savedMenu.length > 0) {
            items = savedMenu;
        } else {
            const res = await fetch("./data/menu.json");
            if (!res.ok) throw new Error("menu.json not found");
            items = await res.json();
        }

        if (!items || items.length === 0) {
            container.innerHTML = "<p>☕ No menu items available.</p>";
            return;
        }

        container.innerHTML = items.map(item => `
      <div class="menu-card">
        <img src="${item.image || 'assets/images/default.jpg'}" alt="${item.name}"
             onerror="this.src='assets/images/default.jpg'">
        <h3>${item.name}</h3>
        <p class="desc">${item.description || "No description available."}</p>
        <p><strong>₱${item.price}</strong></p>
        <button class="btn" onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
      </div>
    `).join("");
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>⚠️ Failed to load menu data.</p>";
    }
}

function addToCart(item) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "user") {
        alert("Please log in as a user to order.");
        window.location = "index.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(c => c.name === item.name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to your cart!`);
}

loadMenu();
