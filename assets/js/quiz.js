// The structure of this quiz is based on the Code Institute's Love Maths - Essentials Project

var i = 0;
var totalCorrect = 0;
var startTime = 0;
var t = 0;

// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);

//#header > nav > button
//document.getElementsByTagName("button")[0]

function moveContent () {
    if (document.getElementsByClassName("navbar-toggler")[0].getAttribute("aria-expanded") == "false") {
        let elementToMove = document.getElementById('quiz-page-heading');
        elementToMove.style.marginTop = "200px";
    } else {
        let elementToMove = document.getElementById('quiz-page-heading');
        elementToMove.style.marginTop = "0";
    }
}





// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements
// COPIED AND MOFIFIED FROM Code Institute's Love Maths - Essentials Project
document.addEventListener("DOMContentLoaded", function() {
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", initialiseQuiz);
    //let sendButton = document.getElementById("quiz-send-button");
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
        let sendButton = document.getElementById("quiz-send-button");
        sendButton.addEventListener("click", sendAnswer);   
        document.getElementById("quiz-send-button").disabled = false;

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
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} / ${i}`;
    }

    console.log(startTime);
    let firstValue = Math.floor(Math.random() * 100) + 1;
    updateProgressBar();
    displayQuestion(firstValue);   
}

function sendAnswer() {    
    i++;
    console.log("Send button clicked");
    let answer = parseInt(document.getElementById("answer").value);
    console.log(answer);
    let correctAnswer = getCorrectAnswer();
    // INITIAL DESIGN
    // if (answer === correctAnswer) {
    //     alert("Hey! You got it right! :D");
    //     totalCorrect++;
    //     document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    // } else {
    //     alert(`Awwww.... you answered ${answer}. The correct answer was ${correctAnswer}!`);
    //     document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} out of ${i}`;
    // }
    if (answer === correctAnswer) {
        totalCorrect++;
        document.getElementById('last-answer').children[1].textContent = answer;
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} / ${i}`;
    } else {
        document.getElementById('last-answer').children[1].textContent = answer;
        document.getElementById('score-div').children[1].textContent = ` ${totalCorrect} / ${i}`;
    }
    document.getElementById('last-correct-answer').children[1].textContent = correctAnswer;
    
    if (i == 10) {
        clearInterval(t);
        
        document.getElementById('prog-bar').children[i-1].style.backgroundColor = "blue";
        let timeSpent = document.getElementById("clock").textContent;
        if (timeSpent[0] == 0 && timeSpent[5] == 0) {
            alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent[0]}${timeSpent[1]}:${timeSpent[5]}${timeSpent[6]} (${timeSpent[1]} minutes and ${timeSpent[6]} seconds).`);
        } else if (timeSpent[0] == 0 && timeSpent[5] != 0) {
            alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent[0]}${timeSpent[1]}:${timeSpent[5]}${timeSpent[6]} (${timeSpent[1]} minutes and ${timeSpent[5]}${timeSpent[6]} seconds).`);
        } else if (timeSpent[0] != 0 && timeSpent[5] == 0) {
            alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent[0]}${timeSpent[1]}:${timeSpent[5]}${timeSpent[6]} (${timeSpent[0]}${timeSpent[1]} minutes and ${timeSpent[6]} seconds).`);
        } else {
            alert(`You answered ${i} questions, with ${totalCorrect} correct. You took ${timeSpent[0]}${timeSpent[1]}:${timeSpent[5]}${timeSpent[6]} (${timeSpent[0]}${timeSpent[1]} minutes and ${timeSpent[5]}${timeSpent[6]} seconds).`);
        }
        
        document.getElementById("quiz-send-button").disabled = true;
        console.log(timeSpent[0]);
        
        document.getElementById("answer").removeEventListener("keydown", pressEnter);


        //updateProgressBar()        
        //i = 0;
        //totalCorrect = 0;
        //resetQuiz();
    } else {        
        runQuiz();        
    }
    
}

function displayQuestion (num) {
    console.log("i = " + i);
    console.log(num);
    document.getElementById('question').children[0].textContent = num;
     

    console.log(document.getElementById('question').children[0]);

    let questionStart = ['What is the frequency of the following signal: 100 sin ',
                'What sampling frequency should be assigned to a  ',
                'How long does it take (in msec) to a ',
                'What is the frequency of the following signal: 50 cos 2Pi',
                'What is the maximum frequency you will recover without aliasing if you sample at ',
                'What sampling frequency should be assigned to a  ',
                'How long does it take (in msec) to a ',
                'What is the frequency of the following signal: 2 A sin ',
                'What is the maximum frequency you will recover without aliasing if you sample at ',
                'How long does it take (in msec) to a  ',
               ];

    let questionEnd = ['t',
               'Hz signal in order to have it fully recovered',
               'Hz signal to complete 10 cycles',
               't',
               'msec',
               'Hz signal in order to have it fully recovered',
               'Hz signal to complete 250 cycles',
               't',
               'msec',
               'Hz signal to complete 50 cycles',
               ];

    document.getElementById('question').innerHTML = `${questionStart[i]} <span id="first-value">${num}</span>${questionEnd[i]}<span id="second-value">? (Give the whole part, largest integer less than or equal to your result).</span>`;
    
}

function getCorrectAnswer() {
    let generatedRandomValueInQuestion = parseInt(document.getElementById('first-value').innerText);
    let result = [Math.floor(generatedRandomValueInQuestion / (2 * 3.1416)),
                  generatedRandomValueInQuestion * 2,
                  Math.floor((1 / generatedRandomValueInQuestion) * 10 * 1000),
                  generatedRandomValueInQuestion,
                  Math.floor((1000 / generatedRandomValueInQuestion) *2),
                  generatedRandomValueInQuestion * 2,
                  Math.floor((1 / generatedRandomValueInQuestion) * 250 * 1000),
                  Math.floor(generatedRandomValueInQuestion / (2 * 3.1416)),
                  Math.floor((1000 / generatedRandomValueInQuestion) *2),
                  Math.floor((1 / generatedRandomValueInQuestion) * 50 * 1000),
                 ];
    console.log(result);
    console.log(result[i])
    return result[i-1];
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
    for (let j = 0; j < 10; j++) {
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
        if (seconds >= 10) {
            document.getElementById("clock").innerHTML = "0" + minutes + " : " + seconds;
        } else {
            document.getElementById("clock").innerHTML = "0" + minutes + " : " + "0" + seconds;
        }
    } else if (minutes >= 10 && seconds < 10) {
        document.getElementById("clock").innerHTML = minutes + " : " + "0" + seconds;
        

    } else if (minutes >= 10 && seconds < 60) {
        document.getElementById("clock").innerHTML = "0" + minutes + " : " + seconds;
    } else if (minutes >= 10 && seconds >= 60) {
        seconds = seconds - (60 * minutes);
        if (seconds >= 10) {
            document.getElementById("clock").innerHTML = minutes + " : " + seconds;
        } else {
            document.getElementById("clock").innerHTML = minutes + " : " + "0" + seconds;
        }
    }

    //} else {
    //    document.getElementById("clock").innerHTML = minutes + " : " + seconds;
    //}

    if (i == 10) {
        return 0;
    }
}