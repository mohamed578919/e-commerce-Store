let arrUsers;
if (localStorage.users != null) {
    arrUsers = JSON.parse(localStorage.users);
    read();
}else
{arrUsers = [];}


function read() {
    let table = ``;
    for (let i = 0; i < arrUsers.length; i++) {
        if (i+1<arrUsers.length) {
        i = i+1;
        }
        table += `
                <tr class="my-3">
                    <td>${i}</td>
                    <td>${arrUsers[i].userName}</td>
                    <td>${arrUsers[i].userAge}</td>
                    <td>${arrUsers[i].role}</td>
                    <td><button type="button" id="Set_Admin" onclick="setAdmin(${i},this)" class="btn btn-primary">Set Admin</button></td>
                    <td><button type="button" onclick="delet(${i})" class="btn btn-danger">Delete</button></td>
                </tr>
        `
    }
    // arrUsers.forEach((item,index) => {
    //     item = item+1;
    //     table += `
    //               <tr class="my-3">
    //                   <td>${index}</td>
    //                   <td>${item.userName}</td>
    //                   <td>${item.userAge}</td>
    //                   <td>${item.role}</td>
    //                   <td><button type="button" onclick="setAdmin(${index},this)" class="btn btn-primary">Set Admin</button></td>
    //                   <td><button type="button" onclick="delet(${index})" class="btn btn-danger">Delete</button></td>
    //                 </tr>
    //     `
    // });
    document.getElementById("table-bdy_user").innerHTML =table;
}



// ================= delet function ==================
function delet(i) {
    arrUsers.splice(i,1);
    localStorage.setItem("users",JSON.stringify(arrUsers))
    read()
}
// ================= delet function ==================


// ================= setAdmin function ==================
// let Set = document.getElementById("Set_Admin");
function setAdmin(i,btn) {
    if (arrUsers[i].role == "customer") {
        arrUsers[i].role = "admin";
    }else if (arrUsers[i].role == "admin") {
         arrUsers[i].role = "customer";
    }
    localStorage.setItem("users",JSON.stringify(arrUsers));
    read();
    if (arrUsers[i].role == "customer") {
        btn.innerHTML = `customer`;
    }else if (arrUsers[i].role == "admin") {
        btn.innerHTML = `admin`;
    }
    location.reload();
}
// ================= setAdmin function ==================

