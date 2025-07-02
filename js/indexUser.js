if (!localStorage.getItem("products")) {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("products", JSON.stringify(data));
            displayindex(data);
        });
} else {
    const data = JSON.parse(localStorage.getItem("products"));
    displayindex(data);
}
const user = localStorage.getItem("loggedUser");

if (user) {
    document.getElementById("signinButton").classList.add("hidden");
    document.getElementById("logoutButton").classList.remove("hidden");
} 
else {
    document.getElementById.classList.remove("hidden");
    document.getElementById("logoutButton").classList.add("hidden");
}

logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "test.html";
});


function displayindex(data) {
    const container = document.getElementById("Div2");
    container.innerHTML ="";

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card col-md-4 mb-4 m-2 item";
        card.style = "width: 14rem;";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="card-img-top">
            <div class="card-body">
                <h6 class="card-title">${item.title}</h6>
                <p class="card-text">${item.total}$</p>
                <p class="card-category" style="display:none">${item.Category}</p>
                <a  class="btn btn-danger details">Details</a>
                &nbsp;
                <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16" style="cursor:pointer;">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
                &nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart2 mt-2" viewBox="0 0 16 16" style="cursor:pointer;">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                </svg>
            </div>
            <p class="message"></p>
        `;

        const svgCart = card.querySelector(".bi-cart2");
        const svgHeart = card.querySelector(".heart");
        const detail = card.querySelector(".details");
        const messageParagraph = card.querySelector(".message");

        const isInWishlist = wishlist.some(prod => prod.id === item.id && prod.user === user?.email);
        if (isInWishlist) {
            svgHeart.innerHTML = `
                <path fill-rule="evenodd" fill="red" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            `;
            svgHeart.classList.add("bi-heart-fill");
        }

        svgCart.addEventListener("click", () => {
            if (!user) {
                messageParagraph.innerText = " Please log in first.";
                messageParagraph.style.color = "orange";
                setTimeout(() => messageParagraph.innerText = "", 2000);
                return;
            }

            let shopcart = JSON.parse(localStorage.getItem("shopcart")) || [];
            const alreadyInCart = shopcart.some(prod => prod.id === item.id && prod.user ===  user.email);

            if (!alreadyInCart) {
                shopcart.push({ ...item, user: user.email });
                localStorage.setItem("shopcart", JSON.stringify(shopcart));
                messageParagraph.innerText = "Added to cart!";
                messageParagraph.style.color = "green";
            } else {
                messageParagraph.innerText = "Already in cart!";
                messageParagraph.style.color = "red";
            }

            setTimeout(() => messageParagraph.innerText = "", 2000);
        });

        svgHeart.addEventListener("click", () => {
            if (!user) {
                messageParagraph.innerText = " Please log in first.";
                messageParagraph.style.color = "orange";
                setTimeout(() => messageParagraph.innerText = "", 2000);
                return;
            }

            wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const alreadyInWishlist = wishlist.some(prod => prod.id === item.id && prod.user ===  user.email);

            if (alreadyInWishlist) {
                wishlist = wishlist.filter(prod => !(prod.id === item.id && prod.user ===  user.email));
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                svgHeart.innerHTML = `
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                `;
                svgHeart.classList.remove("bi-heart-fill");
            } else {
                wishlist.push({ ...item, user:  user.email });
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                svgHeart.innerHTML = `
                    <path fill-rule="evenodd" fill="red" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                `;
                svgHeart.classList.add("bi-heart-fill");
            }
        });
        detail.addEventListener("click", () => {
            const myWindow = window.open("", "", "width=500,height=450");
            myWindow.document.write(`
                <html>
                    <head>
                    
                        <h4>${item.title}</h4>
                        <h4>${item.description}</h4>
                        
                        <style>
                            body { font-family: Arial; padding: 20px; }
                            img { max-width: 100%; height: auto; margin-top: 10px; }
                        </style>
                    </head>
                    <body></body>
                </html>
            `);
            myWindow.document.close();
        
            // Now safely use innerHTML on body
            myWindow.onload = () => {
                myWindow.document.body.innerHTML = `
                    <h4 >${item.title}</h4>
                    <img src="${item.image}" alt="${item.title}" class="card-img-top">
                    <h4>${item.description}</h4>
                `;
            };
        });
        
        container.appendChild(card);
    });

}
// document.querySelector(".search-button").addEventListener("click", () => {
//     const searchTerm = document.querySelector(".search").value.toLowerCase();
//     document.querySelectorAll(".item").forEach(card => {
//         card.style.display = card.innerText.toLowerCase().includes(searchTerm) ? "block" : "none";
//     });
// });

document.getElementById("ss").addEventListener("input", () => {
    const term = document.getElementById("ss").value.toLowerCase();
    document.querySelectorAll(".item").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(term) ? "block" : "none";
    });
});
if (!localStorage.getItem("Categorys")) {
    const defaultCategories = ["Phone", "Watches", "Airpods"];
    localStorage.setItem("Categorys", JSON.stringify(defaultCategories));
}

const categories = JSON.parse(localStorage.getItem("Categorys")) || [];
const dropdown = document.getElementById("category");

categories.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    dropdown.appendChild(option);
});

document.getElementById("category").addEventListener("change", () => {
    const selectedCategory = dropdown.value.toLowerCase();
    const searchInput = document.querySelector(".search");
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const productName = card.querySelector(".card-title").innerText.toLowerCase();
        const productCategory = card.querySelector(".card-category").innerText.toLowerCase();

        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = selectedCategory === "category" || productCategory === selectedCategory;

        card.style.display = matchesSearch && matchesCategory ? "block" : "none";
    });
});



