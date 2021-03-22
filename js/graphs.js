// Include Charts for Reporting
function drawOverall(medV, highV, critV) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var calcPercent = medV;
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'Medium', 'High'],
            datasets: [{
                data: [critV, medV, highV],
                backgroundColor: [
                    'rgb(178,34,34)',
                    'rgb(255,215,0)',
                    'rgb(255,140,0)'
                ],
            options: [ calcPercent ] // in dev.
            }]
        },
    });
}

function buildBar(val, level, colorMe, ip) {
    var ctx = document.getElementById(level).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [ip],
            datasets: [{
                label: level,
                data: [val],
                backgroundColor: [
                    colorMe,
                ],
                borderColor: [
                    colorMe,
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        steps: 1
                    }
                }]
            }
        }
    });
}