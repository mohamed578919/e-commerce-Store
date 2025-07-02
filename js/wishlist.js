if (!localStorage.getItem("wishlist")) {
    fetch("wishlist.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("wishlist", JSON.stringify(data));
            displayWishlist(data);
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
} else {
    const data = JSON.parse(localStorage.getItem("wishlist"));
    displayWishlist(data);
}

function displayWishlist(data) {
    const container = document.getElementById("wishlist");
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const signinButton = document.getElementById("signinButton");
    const logoutButton = document.getElementById("logoutButton");
    if (user) {
        signinButton.classList.add("hidden");
        logoutButton.classList.remove("hidden");
    } 
    else {
        signinButton.classList.remove("hidden");
        logoutButton.classList.add("hidden");
    }

    container.innerHTML = ""; // Clear the container

    data.forEach(item => {
        if (item.user ===  user.email) {
            const card = createProductCard(item, data); // Pass the full data array
            container.appendChild(card);
        }
    });
}

function createProductCard(item, data) {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="cart-item">
        <div class="product-info">
            <img src="${item.image}" width="200">
            <div>${item.title}</div>
        </div>
        <div>${item.total}</div>
        <div>
            <div class="quantity-controls">
                <div>${item.Category}</div>
            </div>
        </div>
        <div>${item.description}</div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="red"  
            class="bi bi-heart" 
            viewBox="0 0 16 16" 
            aria-label="Remove from wishlist">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
        </div>
    `;

    card.querySelector("svg").addEventListener("click", () => {
        const newData = data.filter(d => d.id !== item.id || d.user !== item.user);
        localStorage.setItem("wishlist", JSON.stringify(newData));
        displayWishlist(newData); // Update display
    });

    return card;
}
document.getElementById("logoutButton").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "test.html";
});