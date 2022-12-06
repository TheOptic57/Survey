function GetResults() {
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
					document.getElementById("nosurvey").innerHTML = "Error: no survey created";
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
                    newOption.setAttribute('onclick', "generateResults(this)");
                    select.appendChild(newOption);
                }
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("nosurvey").innerHTML = err.message;
	}


    /*
    let T1Ans, T2Ans, T1Results, T1AnsURL, T2AnsURL;

    let tmp = { Sid: 2 };
	let jsonPayload = JSON.stringify(tmp);

    T1AnsURL = 'http://localhost/get_type1results.php';
    T2AnsURL = 'http://localhost/get_type2results.php';
  

    // Get surveys T1 Answers
    let T1xhr = new XMLHttpRequest();
	T1xhr.open("POST", T1AnsURL, true);
	T1xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		T1xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(T1xhr.responseText);

                console.log("test");

				if (jsonObject.status == 'failure') {
                    console.log("failure")
					//document.getElementById("loginResult").innerHTML = "Error incorrect Sid";
					return;
				}

				T1Ans = jsonObject.response;
                console.log(T1Ans);

                // calculates mean and variance.
                T1Results = computeResults(T1Ans);
			}
		};
		T1xhr.send(jsonPayload);
	}
	catch (err) {
        console.log("error message: " + err.message);
		//document.getElementById("loginResult").innerHTML = err.message; // DO we have a place to put errors? **
	}

    let newxhr = new XMLHttpRequest();
    // Get surveys T2 Answers
    newxhr.open("POST", T2AnsURL, true);
    newxhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		newxhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(newxhr.responseText);

                if(jsonObject.message == "Theres no Type 1 data for this survey!")
                {
                    console.log("jsonObject.message");
                }
				else if (jsonObject.status == 'failure') {
                    console.log("failure");
					//document.getElementById("loginResult").innerHTML = "Error incorrect Sid";
					return;
				}
                else{
                    T2Ans = jsonObject.response;
                    console.log(T2Ans);
                }
				
			}
		};
		newxhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message; // DO we have a place to put errors? **
	}

    //document.getElementById("Copy").innerHTML = "<h4>" + temptitle1  + "</h4>" + "<br>" +  "Mean: " + tempmean1 + "<br>";

    //clones div tag and then assigns an unique id in order to grab later on
    let currentDiv = document.getElementById("Copy");
    for (var i = 0; i < tempmean2.length; i++) {
        let divClone = currentDiv.cloneNode(true);
        divClone.id = "cloned" + i;
        //adds all survey information to see
        divClone.innerHTML = "<h4>" + temptitle2[i]  + "</h4>" + "<br>"  + "<br>" + "<h4>" + tempdesc[i]  + "</h4>" + "<h4>" + tempperiod[i]  
        + "</h4>" + "<h4>" + tempquestion[i]  + "</h4>" + "</h4>";

        /*
        Work in progress in order to grab question data depending on how data is returned
        */

        // adds button
        /*
        divClone.innerHTML = divClone.innerHTML + "<button onclick='saveDataToFile(" + i +")'> Save Data</button>";
        document.getElementById("after").appendChild(divClone);

    }
    */
     
    
}

function generateResults(Sid) {
    alert(Sid.value);
    /*
    let tmp = { Sid: 2 };
	let jsonPayload = JSON.stringify(tmp);

    T1AnsURL = 'http://localhost/get_type1results.php';
    T2AnsURL = 'http://localhost/get_type2results.php';
  

    // Get surveys T1 Answers
    let T1xhr = new XMLHttpRequest();
	T1xhr.open("POST", T1AnsURL, true);
	T1xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		T1xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(T1xhr.responseText);

                console.log("test");

				if (jsonObject.status == 'failure') {
                    console.log("failure")
					//document.getElementById("loginResult").innerHTML = "Error incorrect Sid";
					return;
				}

				T1Ans = jsonObject.response;
                console.log(T1Ans);

                // calculates mean and variance.
                T1Results = computeResults(T1Ans);
			}
		};
		T1xhr.send(jsonPayload);
	}
	catch (err) {
        console.log("error message: " + err.message);
		//document.getElementById("loginResult").innerHTML = err.message; // DO we have a place to put errors? **
	}

    let newxhr = new XMLHttpRequest();
    // Get surveys T2 Answers
    newxhr.open("POST", T2AnsURL, true);
    newxhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		newxhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(newxhr.responseText);

                if(jsonObject.message == "Theres no Type 1 data for this survey!")
                {
                    console.log("jsonObject.message");
                }
				else if (jsonObject.status == 'failure') {
                    console.log("failure");
					//document.getElementById("loginResult").innerHTML = "Error incorrect Sid";
					return;
				}
                else{
                    T2Ans = jsonObject.response;
                    console.log(T2Ans);
                }
				
			}
		};
		newxhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message; // DO we have a place to put errors? **
	}
    */

}
function saveDataToFile(i) {
    let temp = document.createElement('div');
    /*
    //works but doesn't save format
    temp.innerHTML = document.getElementById("cloned" + i).innerHTML;
    //in an attemp to save format
    var textconvert = temp.textContent;
    */
   //dumb solution wish I have something better
   let textconvert = temptitle2[i] + "\n" + tempdesc[i] + "\n" + tempperiod[i] + "\n" + tempquestion[i]; 
    
    // adds stuff to blob then prompts the users to download and saves in the download folder
    const a = document.createElement('a');
    const file = new Blob([textconvert], {type: 'text/plain', endings:'native'});
  
    a.href= URL.createObjectURL(file);
    a.download = "SurveyData.txt";
    a.click();

	URL.revokeObjectURL(a.href);
}
function computeResults(T1Ans)
{
    let T1Results = new Map();
    let mean = 0, variance = 0, total = 0, numAnswers = 0, i = 0;
    let variables = [];
    let key = T1Ans[0].T1id;

    for(i; i < T1Ans.length; i++)
    {
        if(key != T1Ans[i].T1id)
        {
            mean = total / numAnswers;
            variance = calculateVariance(mean, variables)
            T1Results.set(key, [mean, variance]); 
            key = T1Ans[i].T1id;
            total = 0;
            numAnswers = 0;
            variables = [];
        }
        total += T1Ans[i].Answer;
        variables.push(T1Ans[i].Answer);
        numAnswers++;
    }
    if(T1Results.size == 0)
    {
        mean = total / numAnswers;
        variance = calculateVariance(mean, variables)
        T1Results.set(key, [mean, variance]); 
        key = T1Ans[0].T1id;
    }

    console.log(T1Results);
    return T1Results;
}
function calculateVariance(mean, variables)
{
    let total = 0;
    for(let i = 0; i < variables.length; i++)
    {
        variables[i] = variables[i] - mean;
        variables[i] = variables[i] * variables[i];
    }

    for(let i = 0; i < variables.length; i++)
    {
        total += variables[i]
    }

    let variance = total / (variables.length);
    return variance;
}
