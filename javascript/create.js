function CreateSurvey() {
    let numinput = document.getElementById("numquestion").value;
    if(/^[0-9]+$/.test(numinput) == false) {
        document.getElementById("numresults").innerHTML = "Please enter numbers";
    }
    else {
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
    let numinput = document.getElementById("numquestion").value;
    const arrayofquestion = document.getElementsByName("Question");
    const arrayofquestiontype = document.getElementsByName("QuestionType");
    let title = document.getElementById("surveyTitle").value;
    let desc = document.getElementById("surveyDesc").value;
    let questionlist = "";
    let questiontypelist = "";

    if(title===null || title==="" || typeof title === 'undefined') {
        document.getElementById("blankquestion").innerHTML = "Please fill out all the Title";
        return
    }
    if(desc===null || desc==="" || typeof title === 'undefined') {
        document.getElementById("blankquestion").innerHTML = "Please fill out all the Description";
        return
    }
    
    for(var i = 1; i <= numinput; i++) {
        questionlist = questionlist + arrayofquestion[i].value + " ";
        if(arrayofquestion[i].value===null || arrayofquestion[i].value==="") {
            document.getElementById("blankquestion").innerHTML = "Please fill out all the questions";
            return
        }
        questiontypelist = questiontypelist + arrayofquestiontype[i].value + " ";
    }
    window.location.href = "/homepage.html";
}