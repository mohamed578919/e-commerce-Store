var list = document.querySelectorAll(".navigation li");

function activLink(params) {

    list.forEach(item => {
        item.classList.remove("hovered")
    })
    this.classList.add("hovered")

}

list.forEach(item => {item.addEventListener("mouseover",activLink)})



let Home_bage = document.getElementById("Home_bage");
let Grud_bage = document.getElementById("Grud_bage");
let Users = document.getElementById("Users");
let Orders = document.getElementById("Orders");
let Sign_Out = document.getElementById("Sign_Out");

// let Home = document.getElementById("main_v");
let grud = document.getElementById("grud_v");
let _users = document.getElementById("users-v");



// function showHome(e) {
//     e.preventDefault();
//   grud.style.display = `none`
//   users.style.display = `none`
//   Home.style.display = `block`

// console.log(`home`);

// }
// Home_bage.addEventListener("click",showHome);
// function showGrud(e) {
//     e.preventDefault();
   
//      Home.style.display = `none`;
//      _users.style.display = `none`;
//     grud.style.display = `block`;

//   }
//   Grud_bage.addEventListener("click",showGrud);

// function showUser(e) {
//     e.preventDefault();
   
//     grud.style.display = `none`
//      Home.style.display = `none`
//      _users.style.display = `block`
//   }
//   Users.addEventListener("click",showUser);

// function showSection(section) {
//     [Home, _users, grud].forEach(s => s.style.display = 'none');
//     section.style.display = 'block';
//   }
//   Grud_bage.addEventListener("click", e => {
//     e.preventDefault();
//     showSection(grud);
//   });
//   Users.addEventListener("click", e => {
//     e.preventDefault();
//     showSection(_users);
//   });


// showSection(grud)



  // Get all nav links and pages
  const pages = document.querySelectorAll(".page");

  // Helper function to hide all pages
  function hideAllPages() {
    pages.forEach(page => page.style.display = "none");
  }

  // Show Home
  document.getElementById("Home_bage").addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPages();
    document.getElementById("Home").style.display = "block";
  });

  // Show GRUD
  document.getElementById("Grud_bage").addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPages();
    document.getElementById("grud_v").style.display = "block";
  });

  // Show Users
  document.getElementById("Users").addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPages();
    document.getElementById("users-v").style.display = "block";
  });

  // Show Orders
  document.getElementById("Orders").addEventListener("click", function (e) {
    e.preventDefault();
    hideAllPages();
    document.getElementById("orders-v").style.display = "block";
  });


  // Optional: Show Home page on load
  window.addEventListener("DOMContentLoaded", () => {
    hideAllPages();
    document.getElementById("grud_v").style.display = "block";
  });

//Log-Out
document.getElementById("Sign_Out").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("loggedUser");
  window.location.href = "test.html";
});

  
