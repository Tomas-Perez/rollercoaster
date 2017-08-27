function Chart2D(parent, number){
    this.chartsWidth = 250;
    this.chartsHeight = 250;
    this.id = "chartDiv " + number;

    //unique div for a specific chart creation
    this.chartDiv = createDiv('');
    this.chartDiv.parent(parent);
    this.chartDiv.addClass('charts');
    this.chartDiv.id(this.id);
    this.chartDiv.style('width', this.chartsWidth + 'px');
    this.chartDiv.style('height', this.chartsHeight + 'px');

    //charts canvas creation
    this.chartCanvas = document.createElement('canvas');
    this.chartCanvas.setAttribute('id', 'chartCanvas ' +  number);
    this.chartCanvas.parent = this.id;
    this.chartCanvas.width = this.chartsWidth;
    this.chartCanvas.height = this.chartsHeight;
    document.getElementById(this.id).appendChild(this.chartCanvas);

    //context creation
    this.ctx  = document.getElementById(this.chartCanvas.id).getContext('2d');

}

Chart2D.prototype.createChart = function (type) {
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();


    new Chart(this.ctx, {
        type: type,
        data: {
            labels: ["disaster", "almost", "not really", "tried", "idk", "i give up"],
            datasets: [{
                label: 'failed charts creation reactions',
                data: [12, 19, 3, 5, 2, 5],
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

};