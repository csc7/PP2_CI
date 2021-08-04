// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);
function moveContent () {
    if (document.getElementsByClassName("navbar-toggler")[0].getAttribute("aria-expanded") == "false") {
        let firstElementToMove = document.getElementById('functions-page-heading');
        firstElementToMove.style.marginTop = "200px";
        let secondElementToMove = document.getElementById('home-body');
        secondElementToMove.style.marginTop = "200px";
    } else {
        let firstElementToMove = document.getElementById('functions-page-heading');
        firstElementToMove.style.marginTop = "0";
        let secondElementToMove = document.getElementById('home-body');
        secondElementToMove.style.marginTop = "0";
    }
}