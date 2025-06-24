
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("https://<your-backend-url>/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ username: email, password: password })
    });

    const data = await response.json();
    if (response.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        // This example assumes a claim check for admin role
        const tokenParts = JSON.parse(atob(data.access_token.split('.')[1]));
        if (tokenParts.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    } else {
        document.getElementById("error").textContent = "Invalid login credentials.";
    }
});
