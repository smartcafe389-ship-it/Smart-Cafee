// === Smart Café Dynamic Navigation Bar ===
function loadNavbar(activePage) {
    const navHTML = `
    <header class="navbar">
      <div class="nav-container">
        <div class="logo">☕ Smart Café</div>
        <nav id="nav-links" class="nav-links">
          <a href="dashboard_user.html" ${activePage === "home" ? 'class="active"' : ""}>Home</a>
          <a href="orders.html" ${activePage === "orders" ? 'class="active"' : ""}>Orders</a>
          <a href="history.html" ${activePage === "history" ? 'class="active"' : ""}>History</a>
          <a href="about.html" ${activePage === "about" ? 'class="active"' : ""}>About</a>
          <a href="profile.html" ${activePage === "profile" ? 'class="active"' : ""}>Profile</a>
          <a href="#" id="logoutBtn" class="logout-btn">Logout</a>
        </nav>
        <div class="hamburger" id="hamburger">☰</div>
      </div>
    </header>
  `;
    document.body.insertAdjacentHTML("afterbegin", navHTML);

    document.getElementById("hamburger").addEventListener("click", () => {
        document.getElementById("nav-links").classList.toggle("show");
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("cart");
        window.location = "index.html";
    });
}
