let canvas;
let lowerMenu;
let varRightMenu;
let expRightMenu;

function setup() {
    let width = 1024;
    let height = 768;
    let chartsWidth = 256;
    let chartsHeight = 250;
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

    let barChart = new Chart2D(chartsDivId, 1);
    barChart.createChart('bar');
}

function draw() {
    background(255);
    exercise.run();
    //todo last argument should be initial energy
    lowerMenu.display(exercise.energy.getPotential(), exercise.energy.getKinetic(),
        exercise.energy.getElastic(), exercise.energy.actualEnergy, exercise.energy.actualEnergy);
    varRightMenu.getElementInfo(0);
}