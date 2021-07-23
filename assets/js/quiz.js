// The structure of this quiz is based on the Code Institute's Love Maths - Essentials Project

// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

var i = 0;
var totalCorrect = 0;
var startTime = 0;
var t = 0;


document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", initialiseQuiz);
    //let sendButton = document.getElementById("send-button");
    //sendButton.addEventListener("click", sendAnswer);    

    //document.getElementById("answer").addEventListener("keydown", function(event) {
    //    if (event.key === "Enter") {
    //        sendAnswer();
    //    }
    //});
});

function initialiseQuiz() {
    if (i == 0) {
        document.getElementById("answer").addEventListener("keydown", pressEnter);
        let sendButton = document.getElementById("send-button");
        sendButton.addEventListener("click", sendAnswer);   
        document.getElementById("send-button").disabled = false;

        runQuiz();

    } else {

        resetQuiz();
        runQuiz();
    }
}

function pressEnter (event) {
    if (event.key === "Enter") {
        sendAnswer();
    }
}





function runQuiz() {




    
    console.log("Start button clicked");
    //console.log("i = " + i);
    document.getElementById("answer").value = "";
    document.getElementById("answer").focus();
    // Compute time lapse
    if (i == 0) {
        startTime = new Date().getTime();
        t = setInterval (timer, 1000);
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    }

    console.log(startTime);
    let firstValue = Math.floor(Math.random() * 100) + 1;
    let secondValue = firstValue * 5;
    updateProgressBar();
    displayQuestion(firstValue, secondValue);   
}

function sendAnswer() {    
    i++;
    console.log("Send button clicked");
    let answer = parseInt(document.getElementById("answer").value);
    console.log(answer);
    let correctAnswer = getCorrectAnswer();
    if (answer === correctAnswer) {
        alert("Hey! You got it right! :D");
        totalCorrect++;
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    } else {
        alert(`Awwww.... you answered ${answer}. The correct answer was ${correctAnswer}!`);
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    }
    
    if (i == 10) {
        clearInterval(t);
        
        document.getElementById('prog-bar').children[i-1].style.backgroundColor = "blue";
        let timeSpent = document.getElementById("clock").textContent;
        alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent} .`);
        document.getElementById("send-button").disabled = true;
        
        document.getElementById("answer").removeEventListener("keydown", pressEnter);


        //updateProgressBar()        
        //i = 0;
        //totalCorrect = 0;
        //resetQuiz();
    } else {        
        runQuiz();        
    }
    
}

function displayQuestion (num, division) {
    console.log("i = " + i);
    console.log(num);
    console.log(division);
    document.getElementById('question').children[0].textContent = num;
    document.getElementById('question').children[1].textContent = division;
     

    console.log(document.getElementById('question').children[0]);
    console.log(document.getElementById('question').children[1]);

    questionStart = ['La division de ',
                'La suma de ',
                'La resta de ',
                'La multiplicacion de',
                'La division ',
                'La division ',
                'La din ',
                'La divian',
                'La divin d',
                'La d ',
               ];

    questionEnd = ['La division',
               'La suma ',
               'La resta ',
               'La multiplicaci',
               'La divisio',
               'La division de',
               'La din ',
               'La div',
               'La divi',
               'La d',
               ];

    document.getElementById('question').innerHTML = `${questionStart[i]} <span id="first-value">${num}</span> ${questionEnd[i]} <span id="second-value">${division}</span>`;
    
}

function getCorrectAnswer() {
    let operator1 = parseInt(document.getElementById('first-value').innerText);
    let operator2 = parseInt(document.getElementById('second-value').innerText);
    let result = operator2/operator1;
    return result;
}

function addPoint() {

}

function nextQuestion () {

}

function updateProgressBar() {
    if (i != 0) {
        let fillProgress = document.getElementById('prog-bar').children[i-1];
        fillProgress.style.backgroundColor = "blue";
    } 
}

function resetQuiz() {
    //updateProgressBar();
    //document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    //let timeSpent = document.getElementById("clock").textContent;
    //alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent} .`);
    i = 0;
    totalCorrect = 0;
    document.getElementById("answer").value = null;
    document.getElementById("answer").focus();
    for (j = 0; j < 10; j++) {
        document.getElementById('prog-bar').children[j].style.backgroundColor = "rgb(148, 157, 240)";
    }
    //document.getElementById('prog-bar').children[0].style.backgroundColor= "blue";

    //clearInterval(t);
    //startTime = new Date().getTime();
    //t = setInterval (timer, 1000);
}

function timer() {
    let currentTime = new Date().getTime();

    let seconds = Math.floor(((currentTime - startTime)/1000));
    let minutes = Math.floor(((currentTime - startTime)/1000/60));
    if (minutes < 10 && seconds < 10) {
        document.getElementById("clock").innerHTML = "0" + minutes + " : " + "0" + seconds;
    } else if (minutes < 10 && seconds < 60) {
        document.getElementById("clock").innerHTML = "0" + minutes + " : " + seconds;
    } else if (minutes < 10 && seconds >= 60) {
        seconds = seconds - (60 * minutes);
        document.getElementById("clock").innerHTML = "0" + minutes + " : " + "0" + seconds;
    } else if (minutes >= 10 && seconds < 10) {
        document.getElementById("clock").innerHTML = minutes + " : " + "0" + seconds;
    } else {
        document.getElementById("clock").innerHTML = minutes + " : " + seconds;
    }
}