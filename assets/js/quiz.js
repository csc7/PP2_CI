// The structure of this quiz is based on the Code Institute's Love Maths - Essentials Project

// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", startQuiz);
    let sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendAnswer);
    

    document.getElementById("answer").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendAnswer();
        }
    });
});


function startQuiz() {
    console.log("Start button clicked");
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
    let x1 = Math.floor(Math.random() * 100) + 1;
    let x2 = x1 * 5;
    displayQuestion(x1, x2);
}

function sendAnswer() {
    console.log("Send button clicked");
}


function displayQuestion (num, div) {
    document.getElementById('question').textContent = "La division ${num} dividido ${div} es?";
}