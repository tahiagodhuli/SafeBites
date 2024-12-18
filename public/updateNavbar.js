function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
        // User is logged in
        navbar.innerHTML = 
        `
            <a href="about.html">About Us</a>
            <a href="restaurantDetails.html">Restaurant Details</a>
            <a class="user-info">Hello, ${username}</a>
            <button class="logout" onclick="logout()">Logout</button>
        `;
    } else {
        // User is not logged in
        navbar.innerHTML = `
            <a href="login.html">Login</a>
            <a href="about.html">About Us</a>
            <a href="restaurantDetails.html">Restaurant Details</a>
        `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('You have been logged out.');
    updateNavbar();
    window.location.href = 'index.html'; // Redirect to homepage
}

// Initialize navbar on page load
updateNavbar();