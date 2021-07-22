// The structure of this quiz is based on the Code Institute's Love Maths - Essentials Project

// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

var i = 0;

document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
        startButton.addEventListener("click", runQuiz);
    let sendButton = document.getElementById("send-button");
        sendButton.addEventListener("click", sendAnswer);    

    document.getElementById("answer").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendAnswer();
        }
    });
});

function runQuiz() {
    console.log("Start button clicked");
    console.log("i = " + i);
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
    let firstValue = Math.floor(Math.random() * 100) + 1;
    let secondValue = firstValue * 5;
    displayQuestion(firstValue, secondValue);   
}

function sendAnswer() {
    console.log("Send button clicked");
    let answer = parseInt(document.getElementById("answer").value);
    console.log(answer);
    let correctAnswer = getCorrectAnswer();
    if (answer === correctAnswer) {
        alert("Hey! You got it right! :D");
        addPoint();
        updateProgressBar();
    } else {
        alert(`Awwww.... you answered ${answer}. The correct answer was ${correctAnswer}!`);
    }
    i++;
    if (i == 10) {
        alert(`Your score is ${answer} achieved in ${answer} minutes`);
        i = 0;
        document.getElementById("answer").value = null;
        document.getElementById("answer").focus();
    } else {
        runQuiz();
    }
}

function displayQuestion (num, division) {
    console.log(num);
    console.log(division);
    document.getElementById('question').children[0].textContent = num;
    document.getElementById('question').children[1].textContent = division;
     

    console.log(document.getElementById('question').children[0]);
    console.log(document.getElementById('question').children[1]);

    document.getElementById('question').innerHTML = `La division de <span id="first-text">...</span><span id="first-value">${division}</span><span id="secont-text"> y el </span><span id="second-value"> ${num} </span><span id="last-text"></span>`;    
}

function getCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('first-value').innerText);
    let operand2 = parseInt(document.getElementById('second-value').innerText);
    let result = operand1/operand2;
    return result;
}

function addPoint() {

}

function nextQuestion () {

}

function updateProgressBar() {

}