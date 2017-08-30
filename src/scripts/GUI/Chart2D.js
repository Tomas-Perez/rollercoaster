function Chart2D(number,type){
    this.chartsWidth = 256;
    this.chartsHeight = 256;
    this.chartsDivId = "chartsDiv";
    this.id = "chartDiv " + number;

    //unique div for a specific chart creation
    this.chartDiv = createDiv('');
    this.chartDiv.parent(this.chartsDivId);
    this.chartDiv.addClass('charts');
    this.chartDiv.id(this.id);
    this.chartDiv.style('width', this.chartsWidth + 'px');
    this.chartDiv.style('height', this.chartsHeight + 'px');

    //charts canvas creation
    this.chartCanvas = document.createElement('canvas');
    this.chartCanvas.setAttribute('class', 'chartCanvas');
    this.chartCanvas.setAttribute('id', 'chartCanvas' +  number);
    this.chartCanvas.parent = this.id;
    this.chartCanvas.width = this.chartsWidth;
    this.chartCanvas.height = this.chartsHeight;
    document.getElementById(this.id).appendChild(this.chartCanvas);

    //context creation
    this.ctx  = document.getElementById(this.chartCanvas.id).getContext('2d');

    //data
    this. i = 0;
    this.chartData = {
        type: 'line',
        data: {
            labels: [0,1,2],
            datasets: [{
                label: 'some random data',
                data: [0,1,2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                onProgress: function(animation) {
                    //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                duration: 0  //renders only once per draw
            },
            showLines: true
        }
    };
    this.i = 0;
    this.j = 0;
    this.chart = this.createChart(type);

}

Chart2D.prototype.createChart = function (type) {

    switch (type) {
        case 'line':
            return new Chart(this.ctx, this.chartData);
            break;

        case 'velocity':
            return new Chart(this.ctx, this.chartData);
            break;

        case 'etc':
            return new Chart(this.ctx, this.chartData);
            break;
    }
};

Chart2D.prototype.addData = function (){
    this.j++;
    if(this.j % 60 === 0) {
        console.log(this.j);
        this.chartData.data.labels.push(this.i);
        this.chartData.data.datasets[0].data.push(this.i);
        this.i++;
    }
    this.chart.update();
};