/*window.onload = function() {
    Welcome();
};
*/

function Welcome() {
    document.getElementById("welcome").innerHTML = "Welcome " + localStorage.getItem("email");
}