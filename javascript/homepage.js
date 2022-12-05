/*window.onload = function() {
    Welcome();
};
*/

function Welcome() {
    // welcome message based on localstorage email
    document.getElementById("welcome").innerHTML = "Welcome " + localStorage.getItem("email");
}