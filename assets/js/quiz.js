// The structure of this quiz is based on the Code Institute's Love Maths - Essentials Project

// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", timeSpent);
    let sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendAnswer);
});





function timeSpent() {
    console.log("Start button clicked");
}

function sendAnswer() {
    console.log("Send button clicked");
}
