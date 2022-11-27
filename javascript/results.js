function GetResults() {
    let tempmean1 = 20;
    let temptitle1 = "TEST TITLE 1"

    let tempmean2 = 10;
    let temptitle2 = "TEST TITLE 2"

    document.getElementById("Copy").innerHTML = "<h4>" + temptitle1  + "</h4>" + "<br>" +  "Mean: " + tempmean1 + "<br>";

    let currentDiv = document.getElementById("Copy");
    for (var i = 0; i < 5; i++) {
        let divClone = currentDiv.cloneNode(true);
        divClone.innerHTML = "<h4>" + temptitle2  + "</h4>" + "<br>" +  "Mean: " + tempmean2;
        document.getElementById("after").appendChild(divClone);
    } 

}