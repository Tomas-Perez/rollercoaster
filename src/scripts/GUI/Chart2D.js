function Chart2D(number,type){
    this.chartsWidth = 256;
    this.chartsHeight = 256;
    this.chartsDivId = "chartsDiv";
    this.id = "chartDiv " + number;
    this.type = type;

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
    this.secondsCounter = 0;
    this.framesCounter = 0;
    this.chartData = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    'rgba(179, 229, 252, 0.2)',
                ],
                borderColor: [
                    'rgba(179, 229, 252, 1)',
                ],
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            title: {
                display: true,
                text: 'title'
            },
            legend:{
                display: false
            },
            animation: {
                onProgress: function(animation) {
                    //progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                },
                duration: 0  //renders only once per draw
            },
            showLines: true,
        }
    };
    this.chart = this.createChart(this.type);

}

Chart2D.prototype.createChart = function (type) {

    switch (type) {
        case 'line':
            this.chartData.options.title.text = "position over time";
            return new Chart(this.ctx, this.chartData);
            break;

        case 'velocity':
            this.chartData.options.title.text = "velocity over time";
            return new Chart(this.ctx, this.chartData);
            break;

        case 'height':
            this.chartData.options.title.text = "height over time";
            return new Chart(this.ctx, this.chartData);
            break;
    }
};

Chart2D.prototype.addData = function (){
    switch (this.type) {
        case 'line':
            this.updateChart(exercise.body.position.x);
            break;

        case 'velocity':
            this.updateChart(exercise.energy.velocity);
            break;

        case 'height':
            this.updateChart(exercise.energy.height);
            break;
    }
};

Chart2D.prototype.updateChart = function(data){
    //intervals
    let interval = 20;
    let secondInFrames = 60;
    let updateInterval = 60;

    this.framesCounter++;
    //push data every interval frames
    if(this.framesCounter % interval === 0) {
        this.chartData.data.datasets[0].data.push(data);
        //push label every secondInFrames
        this.secondsCounter++;
        if(this.framesCounter % secondInFrames === 0){
            this.chartData.data.labels.push(this.framesCounter/secondInFrames + 's');
        }
        else this.chartData.data.labels.push('');
    }
    if (this.framesCounter % updateInterval === 0 && this.framesCounter < 320) this.chart.update();
};