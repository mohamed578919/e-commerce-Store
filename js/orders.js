
let arrOrders;
if (localStorage.orderHistory != null) {
    arrOrders = JSON.parse(localStorage.orderHistory);
    read();
}else
{arrOrders = [];}

var arrNamePro = [];
function read() {
        
    arrNamePro = [];
        
        let table = ``;
        for (let i = 0; i < arrOrders.length; i++) {
        
            let _name = `` ;
            arrOrders[i].order.forEach(item => {
            
                _name += `${item.title}=${item.quantity}*`
            });
            arrNamePro[i] = `${_name}`;
            console.log(arrNamePro);
            
            const isDisabled = arrOrders[i].status === "Acceptance" ? "disabled" : "";
            const isDisable = arrOrders[i].status === "Acceptance" ? "Disable" : "";

            
            table += `
                <tr class="my-3">
                    <td>${i}</td>
                    <td>${arrOrders[i].date}</td>
                    <td>${arrOrders[i].user}</td>
                    <td>${arrOrders[i].ttotal}</td>
                    <td style="color: rgb(80, 199, 80);">${_name}</td>
                    <td>${arrOrders[i].status}</td>
                    <td>
                        <button type="button" id="Acceptance${i}" 
                                onclick="Acceptance(${i}, this)" 
                                class="btn btn-primary"
                                ${isDisabled}>
                            Acceptance
                        </button>
                    </td>
                    <td>
                        <button type="button" id="Rejection${i}" 
                                onclick="delet(${i})" 
                                class="btn btn-danger"
                                ${isDisable}>
                            Rejection
                        </button>
                    </td>
                </tr>
            `;
        }
    
        document.getElementById("table-bdy_Order").innerHTML = table;
    }
    

// =================  function ==================
let arrProduct;
if (localStorage.products != null) {
    arrProduct = JSON.parse(localStorage.products);
    
}else
{arrProduct = [];}

// function stock(i) {
//     console.log(arrNamePro);
    
//     // arrNamePro.forEach(item => {
        
//         var newarr = arrNamePro[i].split("*").filter(x => x !== ""); // إزالة العناصر الفارغة
//         newarr.forEach(orderItem => {
//             var newarr2 = orderItem.split("=");
//             let title = newarr2[0];
//             let quantity = Number(newarr2[1]);

//             arrProduct.forEach((product, index) => {
//                 if (product.title == title) {
//                     product.Amount -= quantity;
//                     console.log(`${product.title} → ${product.Amount}`);
//                 }
//             });
//         });
//     // });

//     localStorage.setItem("products", JSON.stringify(arrProduct));
// }

function stock(i) {
    if (!arrNamePro[i]) {
        console.warn(`arrNamePro[${i}] is empty or undefined`);
        return;
    }

    console.log(`Processing stock for order index ${i}`);
    console.log(arrNamePro[i]);

    let newarr = arrNamePro[i].split("*").filter(x => x !== ""); 
    newarr.forEach(orderItem => {
        let [title, qty] = orderItem.split("=");
        let quantity = Number(qty);

        arrProduct.forEach(product => {
            if (product.title === title) {
                if ((product.Amount -quantity ) < 0) {
                    alert("The quantity is insufficient");
                    return;
                }
                product.Amount -= quantity;
                console.log(`${product.title} → ${product.Amount}`);
            }
        });
    });

    localStorage.setItem("products", JSON.stringify(arrProduct));
}

// =================  function ==================



// ================= delet function ==================
function delet(i,btn) {
    let Accept = document.getElementById(`Acceptance${i}`);
    let Reject = document.getElementById(`Rejection${i}`);
console.log("Rejection");

    if (arrOrders[i].status === "pending") {
        arrOrders[i].status = "Reject";

        // جعل الزرين غير قابلين للضغط
        Accept.disabled = true;
        Reject.disabled = true;
    }
    localStorage.setItem("orderHistory",JSON.stringify(arrOrders))
    read()
}
// ================= delet function ==================


// ================= Acceptance function ==================
function Acceptance(i, btn) {
    let Accept = document.getElementById(`Acceptance${i}`);
    let Reject = document.getElementById(`Rejection${i}`);

    if (arrOrders[i].status === "pending") {
        arrOrders[i].status = "Acceptance";

        // جعل الزرين غير قابلين للضغط
        Accept.disabled = true;
        Reject.disabled = true;

        // حفظ البيانات
        localStorage.setItem("orderHistory", JSON.stringify(arrOrders));
        
        // إعادة الرسم
        read();
        stock(i);
    }
}

// ================= setAdmin function ==================

