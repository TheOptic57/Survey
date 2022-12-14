let idarray = [];
let typearray = [];
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
                    //alert(localStorage.getItem("email"))
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
    //alert(surveyid.value);
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
                localStorage.setItem("QuestionIds", idarray);
                localStorage.setItem("typearray", typearray);
                for(let i = 0; i < jsonObject.response.length; i++) {
                    const question = document.createElement('div');
                    question.innerHTML = "Question: " + jsonObject.response[i].Question + "<br/>";
                    getSurvey.appendChild(question);
            
                
                    if(typeof jsonObject.response[i].T2id !== 'undefined') {
                        //alert(typeof jsonObject.response[i].T2id);
                        //<textarea rows = "5" cols = "60" name = "Awnser" id="Awnser" style="width: 80%;">
                        const newInput = document.createElement('textarea');
                        newInput.setAttribute('name', "Question");
                        newInput.setAttribute('rows', "5");
                        newInput.setAttribute('cols', "60");
                        getSurvey.appendChild(newInput);
                        typearray.push(2);
                        idarray.push(jsonObject.response[i].T2id);
                        //alert(jsonObject.response[i].T2id);
                    }
                    else if(typeof jsonObject.response[i].T1id !== 'undefined') {
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
                        newSelect.setAttribute('Name', "Question");
            
                        for (let j = 1; j < 6; j++) {
            
                            const newOption = document.createElement('option');
                            const optionText = document.createTextNode(j);
                            newOption.appendChild(optionText);
                            newOption.setAttribute('value', j);
                            newSelect.appendChild(newOption);
                        }
                        getSurvey.appendChild(newSelect);
                        typearray.push(1);
                        //alert(jsonObject.response[i].T1id);
                        idarray.push(jsonObject.response[i].T1id)
                        //alert(jsonObject.response[i].T1id);
                    }
                    else {

                    }
                }
                const button = document.createElement('div');
                button.innerHTML = "<button onclick='SubmitSurvey()'> Submit</button>";
                const buttondiv = document.getElementById('buttonenter');
                buttondiv.appendChild(button); 
                
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("nosurvey").innerHTML = err.message;
	}
}

function SubmitSurvey() {
    const array = document.getElementsByName("Question");
    //alert(array.length);
    

    let Awnser = 0;
    let tempid = 0;
    for(let i = 0; i < array.length; i++) {
        Awnser = array[i].value;
        tempid = idarray[i];
        if(typearray[i] == 1) {
            type1(Awnser, tempid);
        }
        else {
            type2(Awnser, tempid);
        }
    }
    
    
}

function type1(Answer, T1id) {
    if(Answer  == null || typeof(Answer) == undefined || Answer  == '' ||  
    T1id  == null || typeof(T1id) == undefined || T1id  == '') {
        return
    }
    let tmp = {Answer:Answer, T1id:T1id};
    let jsonPayload = JSON.stringify(tmp);
    let url = 'http://localhost/create_type1A.php';
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.status == 'failure') {
                    document.getElementById("nosurvey").innerHTML = "Error unable to submit as api isn't working";
                    
                    return;
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("nosurvey").innerHTML = err.message;
    }
}

function type2(Answer, T2id) {
    if(Answer  == null || typeof(Answer) == undefined || Answer  == '' ||  
    T2id  == null || typeof(T2id) == undefined || T2id  == '') {
        return
    }
    let tmp = {Answer:Answer, T2id:T2id};
    let jsonPayload = JSON.stringify(tmp);
    let url = 'http://localhost/create_type2A.php';
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                if (jsonObject.status == 'failure') {
                    document.getElementById("nosurvey").innerHTML = "Error unable to submit as api isn't working";
                    return;
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("nosurvey").innerHTML = err.message;
    }
}