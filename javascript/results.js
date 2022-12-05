let tempmean2 = [10,20,30,40,50];
let temptitle2 = ["1","2","3","4","5"];
let tempdesc = ["1","2","3","4","5"];
let tempperiod = ["1","2","3","4","5"];
let tempquestion = ["1","2","3","4","5"]; 

function GetResults() {
    let tempmean1 = 20;
    let temptitle1 = "TEST TITLE 1"


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
        divClone.innerHTML = divClone.innerHTML + "<button onclick='saveDataToFile(" + i +")'> Save Data</button>";
        document.getElementById("after").appendChild(divClone);

    } 
    
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