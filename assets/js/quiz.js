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
    let firstValue = Math.floor(Math.random() * 100) + 1;
    let secondValue = firstValue * 5;
    displayQuestion(firstValue, secondValue);
    
}

function sendAnswer() {
    console.log("Send button clicked");
    let answer = parseInt(document.getElementById("answer").value);
    let correctAnswer = getCorrectAnswer();
    if (answer === correctAnswer) {
        alert("Hey! You got it right! :D");
        addPoint();
    } else {
        alert(`Awwww.... you answered ${answer}. The correct answer was ${correctAnswer}!`);
    }
}

function displayQuestion (num, div) {
    console.log(num);
    console.log(div);
    //document.getElementById('question').textContent = "asdfsfss ";first-text
    document.getElementById('firstValue').textContent = num;
    document.getElementById('secondValue').textContent = div;    
}

function getCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('firstValue').innerText);
    let operand2 = parseInt(document.getElementById('secondValue').innerText);
    let result = operand2/operand1;
    return result;
}

function addPoint() {

}
