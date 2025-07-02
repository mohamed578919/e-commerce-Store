const loggedInUser = JSON.parse(localStorage.getItem("loggedUser")); 

const container = document.getElementById("orderHistory");
const signinButton = document.getElementById("signinButton");
const logoutButton = document.getElementById("logoutButton");

if (loggedInUser) {
    signinButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
} else {
    signinButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
}

logoutButton.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "test.html";
});

if (!loggedInUser) {
    container.innerHTML = "<p>Please log in to view your orders.</p>";
} else {
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const userOrders = history.filter(order => order.user === loggedInUser.email);
    
    if (userOrders.length === 0) {
        container.innerHTML = "<p>No orders found for this user.</p>";
    } else {
        userOrders.forEach((order, index) => {
            const div = document.createElement("div");
            div.className = "order";
        
            div.innerHTML = `
                <h4>Order #${index + 1}</h4>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <button class="btn btn-danger" onclick="viewOrder(${index})">Details</button>
                <hr>
            `;
        
            container.appendChild(div);
        }); 
    }
}

function viewOrder(index) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedUser"));
    const history = JSON.parse(localStorage.getItem("orderHistory")) || [];
    const userOrders = history.filter(order => order.user === loggedInUser.email);

    localStorage.setItem("currentOrder", JSON.stringify(userOrders[index]));
    window.location.href = "orderDetails.html";
}
