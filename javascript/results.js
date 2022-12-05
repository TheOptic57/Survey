function GetResults() {
    let tempmean1 = 20;
    let temptitle1 = "TEST TITLE 1"

    let tempmean2 = [10,20,30,40,50];
    let temptitle2 = ["1","2","3","4","5"];

    document.getElementById("Copy").innerHTML = "<h4>" + temptitle1  + "</h4>" + "<br>" +  "Mean: " + tempmean1 + "<br>";

    let currentDiv = document.getElementById("Copy");
    for (var i = 0; i < 5; i++) {
        let divClone = currentDiv.cloneNode(true);
        divClone.innerHTML = "<h4>" + temptitle2[i]  + "</h4>" + "<br>" +  "Mean: " + tempmean2[i];
        document.getElementById("after").appendChild(divClone);
    } 

}