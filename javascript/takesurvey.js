function GetSurveyTitle() {
    let SurveyTitles = ["Test1", "Test2", "Test3", "Test4"];
    let options = document.getElementById("SurveyTitle");
    const select = document.querySelector('select'); 
    for (var i = 0; i < SurveyTitles.length; i++) {
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(SurveyTitles[i]);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', SurveyTitles[i]);
        newOption.setAttribute('onclick', "generateSurvey(this)");
        select.appendChild(newOption);
    }
}

var menu = document.getElementById("SurveyTitle");

function generateSurvey(survey) {
    const getSurvey = document.getElementById('getSurvey');
    while (getSurvey.firstChild) {
        getSurvey.removeChild(getSurvey.lastChild);
    }
    const title = document.createElement('div');
    title.innerHTML = "SurveyTitle: " + survey.value + "<br/>";
    getSurvey.appendChild(title);

    for(let i = 0; i < 4; i++) {
        const question = document.createElement('div');
        question.innerHTML = "Question: " + "stuff" + "<br/>";
        getSurvey.appendChild(question);

        if(i % 2 == 0) {
            //<textarea rows = "5" cols = "60" name = "Awnser" id="Awnser" style="width: 80%;">
            const newInput = document.createElement('textarea');
            newInput.setAttribute('name', "Awnser");
            newInput.setAttribute('id', "Awnser");
            newInput.setAttribute('rows', "5");
            newInput.setAttribute('cols', "60");
            getSurvey.appendChild(newInput);
        }

        else {
            let newSelect = document.createElement('select');
            
            for (let i = 1; i < 6; i++) {
                const newOption = document.createElement('option');
                const optionText = document.createTextNode(i);
                newOption.appendChild(optionText);
                newOption.setAttribute('value', i);
                newSelect.appendChild(newOption);
            }
            
            getSurvey.appendChild(newSelect);
        }
    }
}

