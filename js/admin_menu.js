// === CHECK LOGIN & LOAD DATA ===
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser || currentUser.role !== "admin") {
    window.location = "index.html";
} else {
    document.getElementById("welcome").textContent = `Welcome, Admin ${currentUser.username}!`;
}

let menuItems = [];
let editingIndex = null;

async function loadData() {
    try {
        const userRes = await fetch("./data/users.json");
        const users = await userRes.json();
        displayUsers(users);

        const savedMenu = JSON.parse(localStorage.getItem("menuData"));
        if (savedMenu) {
            menuItems = savedMenu;
        } else {
            const menuRes = await fetch("./data/menu.json");
            menuItems = await menuRes.json();
            localStorage.setItem("menuData", JSON.stringify(menuItems));
        }

        displayMenu();
    } catch (err) {
        console.error("Failed to load data:", err);
    }
}

// === DISPLAY FUNCTIONS ===
function displayUsers(users) {
    const table = document.getElementById("usersTable");
    table.innerHTML = `
    <tr><th>Username</th><th>Email</th><th>Role</th></tr>
    ${users.map(u => `
      <tr><td>${u.username}</td><td>${u.email}</td><td>${u.role}</td></tr>
    `).join("")}
  `;
}

function displayMenu() {
    const table = document.getElementById("menuTable");
    if (!menuItems.length) {
        table.innerHTML = "<tr><td>No menu items found.</td></tr>";
        return;
    }
    table.innerHTML = `
    <tr><th>Item</th><th>Category</th><th>Price</th><th>Actions</th></tr>
    ${menuItems.map((m, i) => `
      <tr>
        <td>${m.name}</td>
        <td>${m.category}</td>
        <td>₱${m.price}</td>
        <td>
          <button class="btn" onclick="editItem(${i})">✏️ Edit</button>
          <button class="btn" onclick="deleteItem(${i})">🗑 Delete</button>
        </td>
      </tr>
    `).join("")}
  `;
}

// === ADD / EDIT ITEM MODAL ===
function openAddModal() {
    editingIndex = null;
    document.getElementById("modalTitle").textContent = "Add Menu Item";
    document.getElementById("menuName").value = "";
    document.getElementById("menuCategory").value = "";
    document.getElementById("menuPrice").value = "";
    document.getElementById("menuImage").value = "";
    document.getElementById("menuDesc").value = "";
    document.getElementById("menuModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("menuModal").style.display = "none";
}

function editItem(index) {
    const item = menuItems[index];
    editingIndex = index;
    document.getElementById("modalTitle").textContent = "Edit Menu Item";
    document.getElementById("menuName").value = item.name;
    document.getElementById("menuCategory").value = item.category;
    document.getElementById("menuPrice").value = item.price;
    document.getElementById("menuImage").value = item.image;
    document.getElementById("menuDesc").value = item.description;
    document.getElementById("menuModal").style.display = "flex";
}

function saveItem() {
    const name = document.getElementById("menuName").value.trim();
    const category = document.getElementById("menuCategory").value.trim();
    const price = parseFloat(document.getElementById("menuPrice").value);
    const image = document.getElementById("menuImage").value.trim();
    const description = document.getElementById("menuDesc").value.trim();

    if (!name || !category || !price) {
        alert("Please fill out all required fields.");
        return;
    }

    const newItem = { name, category, price, image, description };

    if (editingIndex !== null) {
        menuItems[editingIndex] = newItem;
        alert("✅ Item updated successfully!");
    } else {
        menuItems.push(newItem);
        alert("✅ Item added successfully!");
    }

    localStorage.setItem("menuData", JSON.stringify(menuItems));
    displayMenu();
    closeModal();
}

function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        menuItems.splice(index, 1);
        localStorage.setItem("menuData", JSON.stringify(menuItems));
        displayMenu();
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location = "index.html";
}

window.onclick = function (e) {
    if (e.target.classList.contains("modal")) closeModal();
};

loadData();
