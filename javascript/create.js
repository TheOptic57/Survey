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
    let questionlist = "";
    let questiontypelist = "";

    for(var i = 1; i <= numinput; i++) {
        questionlist = questionlist + arrayofquestion[i].value + " ";
        questiontypelist = questiontypelist + arrayofquestiontype[i].value + " ";
    }
    alert(questionlist);
    alert(questiontypelist);
}