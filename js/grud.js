let title = document.getElementById("title");
let Price = document.getElementById("Price");
let Taxes = document.getElementById("Taxes");
let Ads = document.getElementById("Ads");
let Discount = document.getElementById("Discount");
let total = document.getElementById("total");
let Amount = document.getElementById("Amount");
let image = document.getElementById("image");
let description = document.getElementById("description");
let Category = document.getElementById("Category");
let submit = document.getElementById("submit");
let search = document.getElementById("Search");

let mood = `create`;
let moodCateg = `create`;

let tmp ; 
let tmp2 ; 



// ================= total function ==================
let totalArr = [Price,Taxes,Ads,Discount];

function getTotal() {
    if (Price.value != "" ) {
        let sum = (parseFloat(Price.value)+parseFloat(Taxes.value)+parseFloat(Ads.value)) - parseFloat(Discount.value);
        if (isNaN(sum)) {
            total.innerHTML = `0`
            total.style.background = "rgb(116, 1, 1)"
            total.style.color = "rgb(225, 236, 225)"
        }else
        {total.innerHTML = ` ${sum.toFixed(2)}`
        total.style.background = "rgb(1, 116, 1)"
        total.style.color = "rgb(225, 236, 225)"}
        

    }
    else
    {
        total.innerHTML = ` 0`
        total.style.background = "rgb(116, 1, 1)"
        total.style.color = "rgb(225, 236, 225)"

    }
}

totalArr.forEach(item => item.addEventListener("keyup",getTotal));
// ================= total function ==================



// ================= getimage function ==================
function getimage() {
    let _img = image.value;
    console.log(_img);
    let i = _img.lastIndexOf("\\");
    let img = `images${_img.slice(i)}`;
    return img;
}

// ================= getimage function ==================




// ================= create function ==================
submit.addEventListener("click",create);
submit.addEventListener("click",clear);

let arrProducts;
if (localStorage.products != null) {
    arrProducts = JSON.parse(localStorage.products);
    
    read();
}else
{arrProducts = [];}

function create() {

    let newPre = {
        // id:localStorage.products.length,
        title : title.value,
        Price : Price.value,
        Taxes : Taxes.value,
        Ads : Ads.value,
        Discount : Discount.value,
        total : total.innerHTML,
        Amount : Amount.value,
        image : getimage(),
        description : description.value,
        Category : Category.value
    }    
    if (mood == `create`) {
        arrProducts.push(newPre);
    }else
    {
        arrProducts[tmp] = newPre;
        submit.innerHTML = `create`
        mood = `create`
    }
    
    localStorage.setItem("products",JSON.stringify(arrProducts))
    read()

}

function clear() {
     title.value = '';
     Price.value = '';
     Taxes.value = '';
      Ads.value = '';
      Discount.value = '';
    Amount.value = '';
      image.value = '';
      total.innerHTML = '';
      description.value = '';
      Category.value = '';
}

// ================= create function ================



// ================= Read function ==================
function read() {
    let table = ``;
    arrProducts.forEach((item,index) => {
        table += `
                  <tr class="my-3">
                      <td>${index}</td>
                      <td>${item.title}</td>
                      <td>${item.Price}</td>
                      <td>${item.Taxes}</td>
                      <td>${item.Ads}</td>
                      <td>${item.Discount}</td>
                      <td>${item.total}</td>
                      <td>${item.description}</td>
                      <td>${item.Category}</td>
                      <td><button type="button" onclick="Update(${index})" class="btn btn-primary">Update</button></td>
                      <td><button type="button" onclick="delet(${index})" class="btn btn-danger">Delete</button></td>
                    </tr>
        `
    });
    document.getElementById("table-bdy").innerHTML =table;
}
// ================= Read function ==================



// ================= delet function ==================
function delet(i) {
    arrProducts.splice(i,1);
    localStorage.setItem("products",JSON.stringify(arrProducts))
    read()
}
// ================= delet function ==================



// ================= update function ==================
function Update(i) {
    title.value = arrProducts[i].title;
     Price.value = arrProducts[i].Price;
     Taxes.value = arrProducts[i].Taxes;
      Ads.value = arrProducts[i].Ads;
    Amount.value = arrProducts[i].Amount;
    //  image.value = arrProducts[i].image;
      description.value = arrProducts[i].description;
      Discount.value = arrProducts[i].Discount;
      Category.value = arrProducts[i].Category;
      getTotal();
      submit.innerHTML = `Update`
      mood = `update`
      tmp = i;
}
// ================= update function ==================






// ================= Search function ==================
function Search() {
    let table = ``
    for (let i = 0; i < arrProducts.length; i++) {
        if (arrProducts[i].title.includes(search.value)) {
            table += `
                  <tr class="my-3">
                      <td>${i}</td>
                      <td>${arrProducts[i].title}</td>
                      <td>${arrProducts[i].Price}</td>
                      <td>${arrProducts[i].Taxes}</td>
                      <td>${arrProducts[i].Ads}</td>
                      <td>${arrProducts[i].Discount}</td>
                      <td>${arrProducts[i].total}</td>
                      <td>${arrProducts[i].description}</td>
                      <td>${arrProducts[i].Category}</td>
                      <td><button type="button" onclick="Update(${i})" class="btn btn-primary">Update</button></td>
                      <td><button type="button" onclick="delet(${i})" class="btn btn-primary">Delete</button></td>
                    </tr>
        `
        }
        
    }
    document.getElementById("table-bdy").innerHTML =table;

}

search.addEventListener("keyup",Search)
// ================= Search function ==================




// ================= Add Category function ==================
let Add_Categ = document.getElementById("Add_Category");
let Add_Categbtn = document.getElementById("submit-Category");
let Up_Categbtn = document.getElementById("Update-Category");


let arrCategory;
if (localStorage.Categorys != null) {
    arrCategory = JSON.parse(localStorage.Categorys);
    
    readCateg();
}else
{arrCategory = [];}

function Add_Category() {
    let newCateg = Add_Categ.value;
    if (moodCateg == `create`) {
        arrCategory.push(newCateg);
    }else
    {
        arrCategory[tmp2] = newCateg;
        Add_Categbtn.innerHTML = `create`
         moodCateg = `create`
    }
    localStorage.setItem("Categorys",JSON.stringify(arrCategory))
    readCateg();
    clearCateg();
}

// ================= read Category function ==================

function readCateg() {
    let list = ``;
    arrCategory.forEach((item,index) => {
        list += `
                  <option value="${item}">${item}</option>
        `
    });
    document.getElementById("Category").innerHTML =list;
}
// ================= read Category function ==================

// ================= update Category function ==================


function UpdateCateg() {
    Add_Categ.value = Category.value;

    Add_Categbtn.innerHTML = `Update`
      moodCateg = `update`
      arrCategory.forEach((item ,index) => {
      if (item == Category.value ) {
         tmp2= index;
      }
      });
      readCateg();
}
//===================================
function clearCateg() {
    Add_Categ.value = '';
    
}
// ================= update Category function ==================


// ================= delet Category function ==================
function DeletCateg() {
    Add_Categ.value = Category.value;

      arrCategory.forEach((item ,index) => {
      if (item == Category.value ) {
         arrCategory.splice(index,1);
      }
      });
      localStorage.setItem("Categorys",JSON.stringify(arrCategory))
      readCateg();
}
// ================= delet Category function ==================

// ================= Add Category function ==================






