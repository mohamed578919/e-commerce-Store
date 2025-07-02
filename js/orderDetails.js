const order = JSON.parse(localStorage.getItem("currentOrder"));
const user = JSON.parse(localStorage.getItem("loggedUser"));


console.log(order.order);

if (order && user && order.user === user.email) {

    let productList = order.order.map(element => {
        
        return `
            <tr>
                <td>${element.title}</td>
                <td><img src="${element.image}"width="100" alt=""></td>
                <td>${element.total}</td>
            </tr>
        `;
    }).join("");
   
console.log(order)
    document.getElementById("orderDetail").innerHTML = ` 
        <div class="order-header">Order Details</div>
        <div class="order-info">
            <p><strong>User:</strong> ${order.user}</p>
             <p><strong>order-date:</strong> ${order.date}</p>
             <p><strong>statues:</strong>${order.status} </p>
            <table>
                <thead>
                    <tr>
                        <th> Product</th>
                        <th>image</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${productList}
                </tbody>
            </table>
        </div>
    `;


} else {
    document.getElementById("orderDetail").innerHTML = "<p>No order details found for this user.</p>";
    document.getElementById("orderItem").innerHTML = "";
}

// زر تسجيل الخروج
document.getElementById("logoutButton").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    window.location.href = "test.html";
});
