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
    this. i = 0;
    this.chartData = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'some random data',
                data: [],
                backgroundColor: [
                    'rgba(179, 229, 252, 0.2)',
                ],
                borderColor: [
                    'rgba(179, 229, 252, 1)',
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
    this.chart = this.createChart(this.type);

}

Chart2D.prototype.createChart = function () {

    switch (this.type) {
        case 'line':
            return new Chart(this.ctx, this.chartData);
            break;

        case 'velocity':
            return new Chart(this.ctx, this.chartData);
            break;

        case 'height':
            return new Chart(this.ctx, this.chartData);
            break;
    }
};

Chart2D.prototype.addData = function (){
    switch (this.type) {
        case 'line':
            this.updateChart(exercise.body.position.x, this.i);
            break;

        case 'velocity':
            this.updateChart(exercise.energy.velocity, this.i);
            break;

        case 'height':
            this.updateChart(exercise.energy.height, this.i);
            break;
    }
};

Chart2D.prototype.updateChart = function(data,label){
    let interval = 2;
    let secondInFrames = 60;
    console.log(this.j);
    this.j++;
    if(this.j % interval === 0) {
        this.chartData.data.datasets[0].data.push(data);
        if(this.i % secondInFrames === 0){
            this.chartData.data.labels.push(label*interval/secondInFrames + "s");
        }
        else this.chartData.data.labels.push('');
        this.i++;
    }
    if (this.j <= 325) this.chart.update();
};