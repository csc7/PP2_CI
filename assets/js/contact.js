// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);
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

// EmailJS
// Copied and modified from Code Institute's material for "Sending Emails Using EmailJS" lessons
// Used to send e-mails from the contact form in the Contact page
function sendMail(contactForm) {
    emailjs.init("user_MNQL3PP8hE3qKe1AHoGqQ");
    emailjs.send("service_v7z0j0h", "Code_Institute_MS2", {
        "from_name": contactForm.name.value,
        "from_surname": contactForm.surname.value,
        "from_email": contactForm.email.value,
        "description": contactForm.description.value
    })
    .then(
        function(response) {
            document.getElementById("email-status").textContent = "E-mail sent!";
            document.getElementById("form-send-button").style.display = "none";
        },
        function(error) {
            document.getElementById("email-status").textContent = "E-mail could not be sent";
            document.getElementById("email-status").style.color = "red";
            document.getElementById("form-send-button").style.display = "none";
        }
    );
    return false;  // To block from loading a new page
}