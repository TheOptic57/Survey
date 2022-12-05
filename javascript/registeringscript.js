function doRegister() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;

    //stores to local storage as a cookie
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    
    if(password == repassword) {
        if(EmailValidation()) {
            window.location.href = "/homepage.html";
        }
        else {
            document.getElementById("registerResult").innerHTML = "Error Invalid Email";
        }
    }
    else {
        document.getElementById("registerResult").innerHTML = "Non Matching Password";
    }

    //checks if it is a valid email
    function EmailValidation() {
        email = document.getElementById("email").value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }
}