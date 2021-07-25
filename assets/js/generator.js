// COPIED FROM Code Institute's Love Maths - Essentials Project
// Event listener to check when the DOM has been loaded completely
// and function to add event listeners to button elements

document.addEventListener("DOMContentLoaded", function() {
    let generateButton = document.getElementById("generate-button");
    generateButton.addEventListener("click", generateGraph);
});

document.addEventListener("DOMContentLoaded", function() {
    let generateButton = document.getElementById("export-button");
    generateButton.addEventListener("click", exportFile);
});


document.getElementById("wavelet-type-field").value = "Haar";
document.getElementById("sampling-field").value = "2";
document.getElementById("length-field").value = "100";
document.getElementById("frequency-field").value = "50";


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
                console.log(dataForGraph);
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
                    amplitude.push( (1 - 0.5 * frequency * frequency * timeVector[j] * timeVector[j]) * 
                    Math.exp((-1) * frequency * frequency * timeVector[j] * timeVector[j]) );
                    dataForGraph.push([timeVector[j], amplitude[j]]);
                }
                console.log(dataForGraph);
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
                console.log(dataForGraph);
                break;
            default:
                // Default task
          }

















    
    }
    return dataForGraph;
}


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

function exportFile() {
    // Place Noje.js code to write files
}
