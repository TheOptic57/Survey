function doRegister() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;

    //stores to local storage as a cookie
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    if(email == "" || password == "")
    {
        document.getElementById("registerResult").innerHTML = "Error Invalid Email";
        return;
    }
    
    if(password == repassword) {
        if(!EmailValidation()) {
            document.getElementById("registerResult").innerHTML = "Error Invalid Email";
            return;
        }
    }
    else {
        document.getElementById("registerResult").innerHTML = "Non Matching Password";
        return;
    }

    //checks if it is a valid email
    async function EmailValidation() {
        email = document.getElementById("email").value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }

    let tmp = { email: email, password: password }
	let jsonPayload = JSON.stringify(tmp);
	let url = 'http://localhost/create_account.php';

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {

				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("createResult").innerHTML = "Unable to create account";
					return;
				}

				window.location.href = "login.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("registerResult").innerHTML = err.message;
	}
}