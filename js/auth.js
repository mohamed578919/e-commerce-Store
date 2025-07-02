// create initial admin 
const initialAdmin = {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin'
};
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([initialAdmin]));
}

function toggleForms() {
    document.querySelector("#loginForm").parentElement.classList.toggle("d-none");
    document.querySelector("#registerContainer").classList.toggle("d-none");
}

function getID(id) {
    return document.getElementById(id);
}

function errorMessage(element, message) {
    element.addEventListener("input", function () {
        message.textContent = "";
    });
}

function registration() {
    const registerForm = getID("registerForm");

    const regEmailInput = getID("regEmail");
    const registerMessage = getID("registerMessage");
    errorMessage(regEmailInput, registerMessage);

    const namme = getID("userName");
    const userNameMessage = getID("userNameMessage");
    errorMessage(namme, userNameMessage);

    // const userage = getID("userAge");
    // const userageMessage = getID("userAgeMessage");
    // errorMessage(userage , userageMessage);

    const phoneNumber = getID("phone");
    const phoneNumberMessage = getID("phoneMessage");
    errorMessage(phoneNumber, phoneNumberMessage);

    const registrationPassword = getID("regPassword");
    const regPasswordMessg = getID("passwordMessage");
    errorMessage(registrationPassword, regPasswordMessg);

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = regEmailInput.value.trim();
        const password = registrationPassword.value.trim();
        const userName = namme.value.trim();
        const userAge = getID("userAge").value.trim();

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        let role = "customer";
        const emailPattern = /^[A-Z0-9._%+-]+@gmail\.com$/;
        if (emailPattern.test(email)) {
            role = "admin";
        }

        if (users.find(u => u.email === email || u.adminEmail === email)) {
            registerMessage.textContent = "this email already registered";
            return;
        }

        if (users.find(u => u.userName === userName || u.username === userName)) {
            userNameMessage.textContent = "This name already exists. Please enter your full name.";
            return;
        }


        if (password.length < 8) {
            regPasswordMessg.textContent = "please enter valid password minimum 8 characters";
            return;
        }

        users.push({
            email,
            password,
            role,
            userName,
            userAge
        });

        localStorage.setItem("users", JSON.stringify(users));
        alert("Registered successfully!");
        registerForm.reset();
        toggleForms();
    });
}


function loginFun() {
    const loginForm = getID("loginForm");

    const loginEmail =getID("loginEmail");
    const loginEmailMassage = getID("emailMessage");
    errorMessage(loginEmail , loginEmailMassage);

    const loginPassword = getID("loginPassword");
    const loginPassMessage = getID("passwordLoginMessage");
    errorMessage(loginPassword , loginPassMessage);

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userEmail = users.find(u => u.email === email);
        if (!userEmail || userEmail.password !== password) {
            loginPassMessage.textContent = "Email or password not correct !!";
            return;
        }
        const loggedUser = {
            email: userEmail.email,
            name: userEmail.name,        
            age: userEmail.age,   
            role: userEmail.role
        };
        
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

        // alert("Welcome, " + userEmail.email + "! Role: " + userEmail.role);
        if (userEmail.role === "admin") {
            window.location.href = "../index.html";
        } else {
            window.location.href = "test.html";
        }
    });
}