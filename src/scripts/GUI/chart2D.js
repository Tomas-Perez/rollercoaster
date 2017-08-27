function chart2D(parent, number){
    this.chartsWidth = 250;
    this.chartsHeight = 250;
    this.id = "chart" + number;

    //unique div for a specific chart creation
    this.chartDiv = createDiv();
    this.chartDiv.parent(parent);
    this.chartDiv.addClass(classs);
    this.chartDiv.id(id);
    this.chartDiv.style('width', chartsWidth + 'px');
    this.chartDiv.style('height', chartsHeight + 'px');

    //charts canvas creation
    this.chartCanvas = document.createElement('canvas');
    this.chartCanvas.parent = id;
    this.chartCanvas.width = this.chartsWidth;
    this.chartCanvas.height = this.chartsHeight;
    document.getElementById(id).appendChild(this.chartCanvas);
}

function createChart(typeNumber) {





    //context creation
    let context = chartCanvas.getContext('2d');
    //context.fillStyle = "#000000";
    //context.fill();




    new Chart(context, {
        type: 'bar',
        data: {
            labels: ["disaster", "almost", "not really", "tried", "idk", "i give up"],
            datasets: [{
                label: 'failed charts creation reactions',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: false
        }
    });

}