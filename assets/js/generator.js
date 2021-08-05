// Credit: EmailJS - Code copied on August 2nd, 2021, at 2:07, from EmailJS personal account
emailjs.init("user_o5O0kmL8NWgC0wZzvn6X8");

// Move content down when clicking the Bootstrap hamburguer
// button in the fixed navigation menu
let hamburguerButton = document.getElementsByTagName("button")[0];
hamburguerButton.addEventListener("click", moveContent);
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

// COPIED AND MODIFIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements
document.addEventListener("DOMContentLoaded", function() {
    let generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", generateGraph);
});

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
          curveType: 'none',
          legend: { position: 'bottom' }
        };
        var chart = new google.visualization.LineChart(document.getElementById('curve_chart-top'));
        chart.draw(data, options);
    }
}

// Compute the data, for each wavelet type, that will be used to make the Google graph
function computeGraphData() {
    let waveletType = (document.getElementById('wavelet-type-field').value);
    let samplingRate = parseInt(document.getElementById('sampling-field').value);
    // Divide length by 2 since symmetrical negative values are being generated:
    let waveletLength = parseInt(document.getElementById('length-field').value) / 2;
    let frequency = parseInt(document.getElementById('frequency-field').value);
    totalSamples = Math.floor(waveletLength / samplingRate);
    let timeVector = []; 
    let amplitude = [];
    let dataForGraph = [];
    dataForGraph.push(["Time", "Amplitude"]);
    let k = 0; // To count the amount of times a pair of values is pushed to the data
    // Give alert if some parameters are not appropriate for plotting, else compute data:
    if (samplingRate == 0 || waveletLength == 0) {
        alert("Sammpling rate or wavelet length cannot be zero. Please assign a different value.");
    } else if (samplingRate >= waveletLength) {
        alert("Wavelet length should be greater than sampling rate. Consider the former much longer that the latter for better results. Please assign different values");
    } else {
        switch (waveletType) {
            // HAAR FUNCTION
            case 'Haar':
                let amplitudeHaarValue = [];
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples + 1; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples - 1; j++) {
                    if (timeVector[j] >= 0 && timeVector[j] < 5) {
                        // 2 points are needed in time 0 in order to have the step,
                        // otherwise it will show a slope
                        if (timeVector[j] == 0) {
                            dataForGraph.push([0, 0]);
                        }
                        amplitudeHaarValue [j] = 1;
                        amplitude.push(amplitudeHaarValue[j]);
                        dataForGraph.push([timeVector[j], amplitude[j]]);
                    } else if (timeVector[j] >= 5 && timeVector[j] < 10) {
                        // 2 points are needed in time 5 in order to have the step,
                        // otherwise it will show a slope.
                        // Since k will change, the repeated double value for 5 is added only once
                        if (k == 0) {
                            dataForGraph.push([5, 1]);
                            dataForGraph.push([5, -1]);
                            k++;
                        }    
                        amplitudeHaarValue [j] = -1;
                        amplitude.push(amplitudeHaarValue[j]);
                        dataForGraph.push([timeVector[j], amplitude[j]]);
                    } else {
                        // 2 points are needed in time 10 in order to have the step,
                        // otherwise it will show a slope.
                        // Since k will change, the repeated double value for 10 is added only once
                        if (timeVector[j] == 10) {
                            dataForGraph.push([10, -1]);
                            dataForGraph.push([10, 0]);
                            //l++;
                        } else {
                            amplitudeHaarValue [j] = 0;
                            amplitude.push(amplitudeHaarValue[j]);
                            dataForGraph.push([timeVector[j], amplitudeHaarValue [j]]);
                        }                        
                    }
                }
                break;
            // MEXICAN HAT FUNCTION
            case 'Mexican Hat':
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples + 1; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples - 1; j++) {
                    amplitude.push( (2 / Math.sqrt(3)) * (Math.pow(Math.PI, (-1/4))) * (1 - timeVector[j] * timeVector[j]) * Math.exp(-timeVector[j] * timeVector[j] / 2) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                break;
            // MORLET FUNCTION
            case 'Morlet':
                // Function copied from Mathworks, https://uk.mathworks.com/help/wavelet/ref/morlet.html,
                // on August 3rd, 2021, at 03:00.
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples + 1; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples - 1; j++) {
                    amplitude.push( Math.exp((timeVector[j] * timeVector[j]) / (-2)) * Math.cos(5 * timeVector[j]) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                break;
            // RICKER FUNCTION
            case 'Ricker':
                // Time Vector including previous first sample and the rest
                for (let i = -totalSamples + 1; i < totalSamples; i++) {
                    timeVector.push(samplingRate * i);
                }
                // Computation of amplitudes for each time
                // From zero to the double rather than from -totalSamples to +totalSamples
                // because the timeVector is already created and cannot be indexed with
                // negative indexes.
                for (let j = 0; j < 2 * totalSamples - 1; j++) {
                    amplitude.push( (1 - 0.5 * 2 * 2 * Math.PI * Math.PI * frequency * frequency * timeVector[j] * timeVector[j]) * 
                    Math.exp( (-1/4) * 2 * 2 * Math.PI * Math.PI * frequency * frequency * timeVector[j] * timeVector[j] ) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                break;
            // DEFAULT CASE - DO NOTHING
            default:
                // Default task
        }    
    }
    return dataForGraph;
}

// E-mail Data
// Credits: EmailJS
// Copied and modified from Code Institute's material for "Sending Emails Using EmailJS" lessons
function sendData(dataToSend) {
    let data = computeGraphData();
   emailjs.send("service_euotwqk", "Code_Institute_MS2_WData", {
        "to_email": dataToSend.email.value,
        "data": data
   })
   .then(
       function(response) {
           document.getElementById("data-status").textContent = "Data sent!";
           document.getElementById("data-status").style.color = "blue";
       },
       function(error) {
           document.getElementById("data-status").textContent = "Data could not be sent.";
           document.getElementById("data-status").style.color = "red";
       }
   );
    return false;  // To block from loading a new page
}
