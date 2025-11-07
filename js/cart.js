function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const table = document.getElementById("cartTable");

    if (cart.length === 0) {
        table.innerHTML = "<tr><td>Your cart is empty.</td></tr>";
        return;
    }

    let total = 0;
    table.innerHTML = `
    <tr>
      <th>Item</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Subtotal</th>
      <th>Action</th>
    </tr>
    ${cart.map((c, i) => {
        const sub = c.qty * c.price;
        total += sub;
        return `
        <tr>
          <td>${c.name}</td>
          <td>${c.qty}</td>
          <td>₱${c.price}</td>
          <td>₱${sub}</td>
          <td><button class="btn" onclick="removeItem(${i})">Remove</button></td>
        </tr>
      `;
    }).join("")}
    <tr>
      <td colspan="3" style="text-align:right;font-weight:bold;">Total:</td>
      <td colspan="2"><strong>₱${total}</strong></td>
    </tr>
  `;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.removeItem("cart");
    alert("✅ Thank you for your order! Your checkout is complete.");
    loadCart();
}

loadCart();
