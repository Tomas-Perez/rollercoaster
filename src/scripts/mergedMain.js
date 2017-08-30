let canvas;
let lowerMenu;
let varRightMenu;
let expRightMenu;
let lineChart2;
let lineChart;
let lineChart3;

function setup() {
    let width = 1024;
    let height = 768;
    let chartsWidth = 256;
    let containerDivId = "container";
    let canvasDivId = "canvasDiv";
    let chartsDivId = "chartsDiv";

    exercise = new Exercise();

    //container formatting
    let container = document.getElementById(containerDivId);
    container.style.width = width + chartsWidth + 20 + "px";
    container.style.height = height + "px";
    //charts div formatting
    let chartsDiv = document.getElementById(chartsDivId);
    chartsDiv.parent = container;
    chartsDiv.style.width = chartsWidth + "px";
    chartsDiv.style.height = height + "px";
    //canvas div formatting (the simulation)
    let canvasDiv = document.getElementById(canvasDivId);
    canvasDiv.parent = container;
    canvasDiv.style.width = width + "px";
    canvasDiv.style.height = height + "px";

    //simulation canvas creation
    canvas = createCanvas(width, height);
    canvas.addClass('simulationCanvas');
    canvas.parent(canvasDiv);
    background(0);

    lowerMenu = new LowerMenu(-1, canvas.height*3/4, canvas.width+1, canvas.height*1/4, [179, 229, 252], canvasDiv);
    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height,"varRightMenu", "rightMenu", canvasDiv, "Variables");
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 0));
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 1));

    expRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "expRightMenu", "rightMenu", canvasDiv, "Experiences");
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 0, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 1, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 2, function(){ return toggleMenu('varbtn', 'expRightMenu');}));

    lineChart = new Chart2D(1, 'line');
    lineChart2 = new Chart2D(2, 'line');
    lineChart3 = new Chart2D(3, 'line');
}

function draw() {
    background(255);
    push();
    exercise.run(width, height * (3/4));
    pop();
    lowerMenu.display(exercise.energy.getPotential(), exercise.energy.getKinetic(),
        exercise.energy.getElastic(), exercise.energy.actualEnergy, exercise.energy.initialEnergy);
    varRightMenu.getElementInfo(0);
    lineChart.addData();
}

function changeExc(height){
    //testing
    exercise = new Exercise({rampHeightLeft: height, radius: 100});
}