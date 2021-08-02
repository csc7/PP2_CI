// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);

//#header > nav > button
//document.getElementsByTagName("button")[0]

function moveContent () {
    if (document.getElementsByClassName("navbar-toggler")[0].getAttribute("aria-expanded") == "false") {
        let firstElementToMove = document.getElementById('generator-page-heading');
        firstElementToMove.style.marginTop = "200px";
        let secondElementToMove = document.getElementById('left-graph-div');
        secondElementToMove.style.marginTop = "200px";
        let thirdElementToMove = document.getElementById('right-conf-panel-div');
        thirdElementToMove.style.marginTop = "200px";
    } else {
        let firstElementToMove = document.getElementById('generator-page-heading');
        firstElementToMove.style.marginTop = "0";
        let secondElementToMove = document.getElementById('left-graph-div');
        secondElementToMove.style.marginTop = "0";
        let thirdElementToMove = document.getElementById('right-conf-panel-div');
        thirdElementToMove.style.marginTop = "0";
    }
}


// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

document.addEventListener("DOMContentLoaded", function() {
    let generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", generateGraph);
});

//document.addEventListener("DOMContentLoaded", function() {
//    let generateButton = document.getElementById("export-button");
//    generateButton.addEventListener("click", sendData);
//});


document.getElementById("wavelet-type-field").value = "Haar";
document.getElementById("sampling-field").value = "2";
document.getElementById("length-field").value = "100";
document.getElementById("frequency-field").value = "50";


// GRAPH
// Google Charts
// Line Charts
// Copied and modified from https://developers.google.com/chart/interactive/docs/gallery/linechart on July 24th, 2021, at 23:06.

function generateGraph() {

    dataForGoogleChartFunction = computeGraphData();

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(dataForGoogleChartFunction);

        var options = {
          //title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart-top'));

        chart.draw(data, options);
    }

}

//var dataForGraph =[];

function computeGraphData() {

    let waveletType = (document.getElementById('wavelet-type-field').value);
    let samplingRate = parseInt(document.getElementById('sampling-field').value);
    // Divide length by 2 since symmetrical negative values are being generated:
    let waveletLength = parseInt(document.getElementById('length-field').value) / 2;
    let frequency = parseInt(document.getElementById('frequency-field').value);
    totalSamples = Math.floor(waveletLength / samplingRate) + 1;

    let timeVector = []; 
    let amplitude = [];
    let dataForGraph = [];
    dataForGraph.push(["Time", "Amplitude"]);
    
    if (samplingRate == 0 || waveletLength == 0) {
        alert(`Sammpling rate or wavelet length cannot be zero. Please assign a different value.`);
    } else if (samplingRate >= waveletLength) {
        alert(`Wavelet length should be greater than sampling rate.
               Consider the former much longer that the latter for better results.
               Please assign different values`);
    } else {

        switch (waveletType) {
            case 'Haar':
                let amplitudeHaarValue = [];
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples; j++) {
                    if (timeVector[j] >= 0 && timeVector[j] < 0.5) {
                        amplitudeHaarValue [j] = 1;
                        amplitude.push(amplitudeHaarValue[j]);
                        dataForGraph.push([timeVector[j], amplitude[j]]);
                    } else if (timeVector[j] >= 0.5 && timeVector[j] < 1) {
                        amplitudeHaarValue [j] = -1;
                        amplitude.push(amplitudeHaarValue[j]);
                        dataForGraph.push([timeVector[j], amplitude[j]]);
                    } else {
                        amplitudeHaarValue [j] = 0;
                        amplitude.push(amplitudeHaarValue[j]);
                        dataForGraph.push([timeVector[j], amplitude[j]]);
                    }
                    
                    
                }
                console.log(dataForGraph)
                break;
            case 'Mexican Hat':
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples; j++) {
                    amplitude.push( (2 / Math.sqrt(3)) * (Math.pow(Math.PI, (-1/4))) * (1 - timeVector[j] * timeVector[j]) * Math.exp(-timeVector[j] * timeVector[j] / 2) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                break;
            case 'Morlet':
                // Morlet function computation (real part)
            case 'Ricker':
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples; j++) {
                    amplitude.push( (1 - 0.5 * frequency * frequency * timeVector[j] * timeVector[j]) * 
                    Math.exp((-1) * frequency * frequency * timeVector[j] * timeVector[j]) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                break;
            default:
                // Default task
          }    
    }
    return dataForGraph;
}



//function exportFile() {

// EmailJS
// Copied and modified from Code Institute's material for "Sending Emails Using EmailJS" lessons
// Used to send e-mails from the contact form in the Contact page
function sendData(dataToSend) {

    let data = computeGraphData();
    //console.log(data);

   emailjs.send("service_v7z0j0h", "Code_Institute_MS2_Data", {
       "data": data
   })
   .then(
       function(response) {
           console.log("SUCCESS", response);
           document.getElementById("data-status").textContent = "Data sent!";
           //document.getElementById("form-send-button").style.display = "none";
       },
       function(error) {
           console.log("FAILED", error);
           document.getElementById("data-status").textContent = "Data could not be sent.";
           document.getElementById("data-status").style.color = "red";
           //document.getElementById("form-send-button").style.display = "none";
       }
   );
    return false;  // To block from loading a new page
}

//}
