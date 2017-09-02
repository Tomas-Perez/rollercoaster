function Chart2D(number,title){
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
                    'rgba(179, 229, 252, 0.7)',
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
                duration: 0, // general animation time
            },
            hover: {
                animationDuration: 0, // duration of animations when hovering an item
            },
            responsiveAnimationDuration: 0, // animation duration after a resize
            showLines: true,
            /*
            elements: {
                line: {
                    tension: 0, // disables bezier curves, but it looks ugly
                }
            },
            */
            events: []
        }
    };
    this.chartData.options.title.text = title + " over time";
    this.chart = new Chart(this.ctx, this.chartData);
    this.run = true;
}

Chart2D.prototype.addData = function (data){
    if(this.run) {
        //intervals
        let secondInFrames = 60;
        let updateInterval = 60;

        this.framesCounter++;
        //push data every interval frames
        this.chartData.data.datasets[0].data.push(data);
        //push label every secondInFrames
        this.secondsCounter++;
        if (this.framesCounter % secondInFrames === 0) {
            this.chartData.data.labels.push(this.framesCounter / secondInFrames + 's');
        }
        else this.chartData.data.labels.push('');
        if (this.framesCounter % updateInterval === 0) this.chart.update();
    }
};

Chart2D.prototype.resetChart = function(){
    this.chartData.data.labels = [];
    this.chartData.data.datasets[0].data = [];
    this.framesCounter = 0;
    this.secondsCounter = 0;
    this.run = true;
};

Chart2D.prototype.done = function(){
    this.chart.update();
    this.run = false;
};