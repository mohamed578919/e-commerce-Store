if (!localStorage.getItem("shopcart")) {
    fetch("shopcart.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("shopcart", JSON.stringify(data));
            displayshopcart(data);
        });
} else {
    const data = JSON.parse(localStorage.getItem("shopcart"));
    displayshopcart(data);
}
logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "test.html";
});
function displayshopcart(data) {
    const container = document.getElementById("shopcart");
    container.innerHTML = "";

    const user = JSON.parse(localStorage.getItem("loggedUser"));

    const signinButton = document.getElementById("signinButton");
    const logoutButton = document.getElementById("logoutButton");

    if (user) {
        document.getElementById("signinButton").classList.add("hidden");
        document.getElementById("logoutButton").classList.remove("hidden");
    } else {
        document.getElementById("signinButton").classList.remove("hidden");
        document.getElementById("logoutButton").classList.add("hidden");
    }

    if (!user) return;

    let ttotal = 0;

    data.forEach(item => {
        if (item.user ===  user.email) {
            const card = document.createElement("div");
            card.className = "cart-item";

            if (!item.quantity) item.quantity = 1;

            card.innerHTML = `
                <div class="product-info">
                    <div>${item.title}</div>
                    <img src="${item.image}" width="100">
                </div>
                <div>$${item.total}</div>
                <div class="quantity-controls">
                    <button class="minus" data-id="${item.id}">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button class="plus" data-id="${item.id}">+</button>
                </div>
                <div>Total: $${(item.total * item.quantity).toFixed(2)}</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16" style="cursor:pointer;">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Z"/>
                </svg>
            `;

            card.querySelector("svg").addEventListener("click", () => {
                const newData = data.filter(d => !(d.id === item.id && d.user === item.user));
                localStorage.setItem("shopcart", JSON.stringify(newData));
                displayshopcart(newData);
            });

            card.querySelector(".plus").addEventListener("click", () => {
                item.quantity += 1;
                updateCart(data);
            });

            card.querySelector(".minus").addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart(data);
                }
            });

            container.appendChild(card);
            ttotal += item.total * item.quantity;
        }
    });

    document.getElementById("subtotal").innerHTML = `${ttotal.toFixed(2)}`;
    document.getElementById("total").innerHTML = `${ttotal.toFixed(2)}`;
    localStorage.setItem("shopcart", JSON.stringify(data));
}

function updateCart(data) {
    displayshopcart(data);
}

document.getElementById("placeorder").addEventListener("click", function () {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const data = JSON.parse(localStorage.getItem("shopcart")) || [];
    let messageParagraph=document.getElementById("Messege");

    console.log("User from localStorage:", user);

    if (!user) {
        messageParagraph.innerText = "⚠️ Please log in first.";
        messageParagraph.style.color = "orange";
        setTimeout(() => messageParagraph.innerText = "", 2000);
        return;
    }

    const userCartItems = data.filter(item => item.user === user.email);

    if (userCartItems.length === 0) {
        messageParagraph.innerText = " Your Cart is Empty.";
        messageParagraph.style.color = "orange";
        setTimeout(() => messageParagraph.innerText = "", 2000);
        return;
    }

    let ttotal = 0;
    userCartItems.forEach(item => {
        ttotal += item.total * item.quantity;
    });

    let history = JSON.parse(localStorage.getItem("orderHistory")) || [];

    history.push({
        order: userCartItems,
        date: new Date().toLocaleString(),
        status: "pending",
        ttotal: ttotal,
        user: user.email 
    });

    localStorage.setItem("orderHistory", JSON.stringify(history));

    const remainingItems = data.filter(item => item.user !== user.email);
    localStorage.setItem("shopcart", JSON.stringify(remainingItems));

    document.getElementById("shopcart").innerHTML = "";
    document.getElementById("total").textContent = "Subtotal = $0.00";
    
    messageParagraph.innerText = "Order is places sucsessfully";
    messageParagraph.style.color = "orange";
    setTimeout(() => messageParagraph.innerText = "", 2000);
    return;
});
