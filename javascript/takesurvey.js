function GetSurveyTitle() {
    let email = localStorage.getItem("email");
    let tmp = {email:email};
	let jsonPayload = JSON.stringify(tmp);

	let url = 'http://localhost/get_participatingSurvey.php';

    let SurveyTitles = [];
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("nosurvey").innerHTML = "Error no surveys to be taken";
                    alert(localStorage.getItem("email"))
					return;
				}
                for(let i = 0; i < jsonObject.response.length; i++) {
                    SurveyTitles.push(jsonObject.response[i].Title);
                    //alert(SurveyTitles);
                }
                let options = document.getElementById("SurveyTitle");
                const select = document.querySelector('select'); 
                for (var i = 0; i < SurveyTitles.length; i++) {
                    const newOption = document.createElement('option');
                    const optionText = document.createTextNode(SurveyTitles[i]);
                    newOption.appendChild(optionText);
                    localStorage.setItem(jsonObject.response[i].Sid, SurveyTitles[i]);
                    newOption.setAttribute('value', jsonObject.response[i].Sid);
                    newOption.setAttribute('onclick', "generateSurvey(this)");
                    select.appendChild(newOption);
                }
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("nosurvey").innerHTML = err.message;
	}
}

var menu = document.getElementById("SurveyTitle");

function generateSurvey(surveyid) {
    //alert(survey.value);
    const getSurvey = document.getElementById('getSurvey');
    while (getSurvey.firstChild) {
        getSurvey.removeChild(getSurvey.lastChild);
    }
    const title = document.createElement('div');
    title.innerHTML = "SurveyTitle: " + localStorage.getItem(surveyid.value); + "<br/>";
    getSurvey.appendChild(title);


    let tmp = {Sid:surveyid.value};
	let jsonPayload = JSON.stringify(tmp);
	let url = 'http://localhost/get_takeSurvey.php';

    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.status == 'failure') {
					document.getElementById("nosurvey").innerHTML = "Error retrieving survey";
					return;
				}
                //alert(jsonObject.response[0].T2id)
                for(let i = 0; i < jsonObject.response.length; i++) {
                    const question = document.createElement('div');
                    question.innerHTML = "Question: " + jsonObject.response[i].Question + "<br/>";
                    getSurvey.appendChild(question);
            
                    //if statement to check if it is type 2 right now its check for even just to see if it works
                    if(jsonObject.response[i].T1id === undefined) {
                        //<textarea rows = "5" cols = "60" name = "Awnser" id="Awnser" style="width: 80%;">
                        const newInput = document.createElement('textarea');
                        newInput.setAttribute('name', "Type2");
                        newInput.setAttribute('rows', "5");
                        newInput.setAttribute('cols', "60");
                        getSurvey.appendChild(newInput);
                    }
                    else {
                        /*
                        <select name="Type2">
                                        <option value="1">1 </option>
                                        <option value="2">2</option>
                                        .
                                        .
                                        .
                                    </select>
                        */
                        let newSelect = document.createElement('select');
                        newSelect.setAttribute('Name', "Type1");
            
                        for (let j = 1; j < 6; j++) {
            
                            const newOption = document.createElement('option');
                            const optionText = document.createTextNode(j);
                            newOption.appendChild(optionText);
                            newOption.setAttribute('value', j);
                            newSelect.appendChild(newOption);
                        }
                        getSurvey.appendChild(newSelect);
                    }
                }
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("nosurvey").innerHTML = err.message;
	}
}

