function doLogin() {
    let tempumail = "a";
    let temppassword = "a";
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    //stores to local storage as a cookie
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    let tmp = { email: email, password: password };
	//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify(tmp);

	let url = 'http://localhost/login.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("loginResult").innerHTML = "Error incorrect password";
					return;
				}

				userId = jsonObject.response.email;

				window.location.href = "homepage.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}


    /*
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
    */
}
