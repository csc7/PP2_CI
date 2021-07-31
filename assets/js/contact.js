// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);

//#header > nav > button
//document.getElementsByTagName("button")[0]

function moveContent () {
    if (document.getElementsByClassName("navbar-toggler")[0].getAttribute("aria-expanded") == "false") {
        let firstElementToMove = document.getElementById('contact-us-heading');
        firstElementToMove.style.marginTop = "200px";
        let secondElementToMove = document.getElementById('contact-form-div');
        secondElementToMove.style.top = "350px";
    } else {
        let firstElementToMove = document.getElementById('contact-us-heading');
        firstElementToMove.style.marginTop = "0";
        let secondElementToMove = document.getElementById('contact-form-div');
        secondElementToMove.style.top = "150px";
    }
}