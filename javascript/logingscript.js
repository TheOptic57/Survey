function doLogin() {
    let tempumail = "a";
    let temppassword = "a";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    //stores to local storage as a cookie
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);


    if(validlogin()) {
        window.location.href = "homepage.html";
    }
    else {
        document.getElementById("loginResult").innerHTML = "Error incorrect password";
    }
    


    function validlogin() {
        if(email = tempumail && temppassword == password) {
            return true;
        }
        return false;
    }
}
