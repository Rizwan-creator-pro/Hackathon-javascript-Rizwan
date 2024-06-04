
// ======= Toastify ============================================================================================================================
const toast = (msg,type) => {
    const colors = { success: "green", danger: "red", default: "blue" }
    
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background: colors[type] || colors.default },
      }).showToast();
    
}

// ===================================================================================================================================

const getInputValue = (id) => document.getElementById(id)?.value;


function User (userName,email,password) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.uid = Math.random().toString(36).slice(2);
    this.status = "Active";
    this.createdAt = new Date().getTime();
}
const pageUsers = JSON.parse(localStorage.getItem("pageUsers")) || []

// ===================================================================================================================================
const handleRegister = (event) => {
    event.preventDefault();

    let userName = getInputValue("userName").toLowerCase().trim();
    if (userName.length < 3) { toast("Please enter your name","danger"); return; }

    let email = getInputValue("email").toLowerCase().trim()
    if (!email) { toast("Please enter your email","danger"); return; }

    let password = getInputValue("password")
    if (password.length < 5) { toast("Please enter correct password", "danger"); return; }
    
    // const user =new User(userName, email, password) // work like object
    const emailIndex = pageUsers.findIndex(e => e.email === email);// search data from array
    if (emailIndex !== -1) {
        toast("Email already exists","danger");
    } else {
        pageUsers.push(new User(userName, email, password))
        localStorage.setItem("pageUsers", JSON.stringify(pageUsers))
        toast("User is registered", "success");
        handleLoginBtn()
    }
};


// ===================================================================================================================================


const handleLogin = (event) => {
    event.preventDefault();

    let loginUserName = getInputValue("loginName").trim()
    if (loginUserName.length < 3) { toast("Please enter your correct name","danger"); return; }

    let loginUserEmail = getInputValue("loginEmail").toLowerCase().trim()
    if (!loginUserEmail) { toast("Please enter your email","danger"); return; }

    let loginUserPassword = getInputValue("loginPassword")
    if (loginUserPassword.length < 5) { toast("Please enter correct password","danger"); return; }


    const user = pageUsers.findIndex(user => user.email === loginUserEmail && user.password === loginUserPassword);

    if (user !== -1 ) {
        toast("Login Successful", "success");
        greet(pageUsers[user].userName)
    }
    else {
        toast("Email can't exist","danger");
    }
};



// ========== greetUser ==============================================================================================================
const greet = (u) => {

    let now = new Date();
    let houre = now.getHours();

    let greetingMassage = "Good "

    if (houre >= 4 && houre < 12) {
        greetingMassage += "Morning"
    } else if (houre >= 12 && houre < 17) {
        greetingMassage += "Afternoon"
    } else if (houre >= 17 && houre < 20) {
        greetingMassage += "Evening"        
    } else {
        greetingMassage += "Night"
    }

    let msg = `${greetingMassage} <span style='text-transform: capitalize;''>${u}</span> !`

    document.getElementById("greetUser").innerHTML = msg
    document.getElementById("reg").style.display = "none"
    document.getElementById("login").style.display = "none"
    document.getElementById("loginFirm").style.display = "none"
    document.getElementById("todos").style.display = "block"
    document.getElementById("todo").style.display = "block"
    return
}



// ===================================================================================================================================

const handleLoginBtn = () => {
    event.preventDefault();
    document.getElementById("reg").style.display = "block"
    document.getElementById("login").style.display = "none"
    document.getElementById("loginFirm").style.display = "block"
    document.getElementById("regForm").style.display = "none"
    clearLogin()
}

const handleRegBtn = () => {
    event.preventDefault();
    document.getElementById("reg").style.display = "none"
    document.getElementById("login").style.display = "block"
    document.getElementById("loginFirm").style.display = "none"
    document.getElementById("regForm").style.display = "block"
    clearReg()
}
// === clear Inputs ============================================
const clearReg = () => {
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
};

const clearLogin = () => {
    document.getElementById("loginName").value = "";
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
};