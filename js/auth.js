async function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    try {
        const res = await fetch("./data/users.json");
        if (!res.ok) throw new Error("users.json not found");
        const users = await res.json();

        const found = users.find(u => u.username === user && u.password === pass);

        if (found) {
            localStorage.setItem("currentUser", JSON.stringify(found));

            if (found.role === "admin") {
                window.location = "dashboard_admin.html";
            } else {
                window.location = "dashboard_user.html";
            }
        } else {
            msg.textContent = "❌ Invalid username or password.";
        }
    } catch (err) {
        console.error(err);
        msg.textContent = "⚠️ Failed to load user data. Check console.";
    }
}

function openModal() {
    document.getElementById("loginModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

window.onclick = function (e) {
    if (e.target.classList.contains("modal")) closeModal();
};
