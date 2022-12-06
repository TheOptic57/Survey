function CreateSurvey() {
    let numinput = document.getElementById("numquestion").value;
    //check if valid number was entered
    if(/^[0-9]+$/.test(numinput) == false) {
        document.getElementById("numresults").innerHTML = "Please enter numbers";
    }
    else {
        //copies a prewriten div tag and then added it depending on numbers added
        document.getElementById("numresults").innerHTML = "";
        let currentDiv = document.getElementById("copy_to_me");
        let addDiv = document.getElementById("add_to_me");
        while (addDiv.firstChild) {
            addDiv.removeChild(addDiv.lastChild);
        }
        for(var i = 0; i < numinput; i++) {
            let divClone = currentDiv.cloneNode(true);
            divClone.id = i + "clone";
            divClone.className = "showthings";
            addDiv.appendChild(divClone);
        }
    }
}
function SubmitSurvey() {
    //pulls all information
    let numinput = document.getElementById("numquestion").value;
    //gets by name and pulls all question results in an array
    const arrayofquestion = document.getElementsByName("Question");
    const arrayofquestiontype = document.getElementsByName("QuestionType");
    let title = document.getElementById("surveyTitle").value;
    let desc = document.getElementById("surveyDesc").value;
    let start = document.getElementById("surveyStart").value;
    let end = document.getElementById("surveyEnd").value;
    let person = document.getElementById("surveyPerson").value;
    let questionlist = [];
    let questiontypelist = [];
    

    //check to see if blank/null
    if(title===null || title==="" || typeof title === 'undefined') {
        document.getElementById("blankquestion").innerHTML = "Please fill out all the Title";
        return
    }
    if(desc===null || desc==="" || typeof title === 'undefined') {
        document.getElementById("blankquestion").innerHTML = "Please fill out all the Description";
        return
    }
    //check to see if all questions are filled
    for(var i = 1; i <= numinput; i++) {
        questionlist.push(arrayofquestion[i].value);
        if(arrayofquestion[i].value===null || arrayofquestion[i].value==="") {
            document.getElementById("blankquestion").innerHTML = "Please fill out all the questions";
            return
        }
        questiontypelist.push(arrayofquestiontype[i].value);
    }
    
    let tmp = {Title:title, Description:desc, Start_Date:start, End_Date:end, email:person, Is_Complete:"TRUE"};
	let jsonPayload = JSON.stringify(tmp);

	let url = 'http://localhost/create_survey.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				if (jsonObject.status == 'failure') {
					document.getElementById("nosurvey").innerHTML = "Error no surveys to be taken";
					return;
				}
                localStorage.setItem("CreationID", jsonObject.response);
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("nosurvey").innerHTML = err.message;
	}
    

    //window.location.href = "/homepage.html";
}

