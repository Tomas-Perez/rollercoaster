let canvas;
let lowerMenu;
let varRightMenu;

function setup() {
    let width = 1024;
    let height = 768;
    let chartsWidth = 250;
    let chartsHeight = 250;
    let containerDivId = "container";
    let canvasDivId = "canvasDiv";
    let chartsDivId = "chartsDiv";

    exercise = new Exercise();

    //container formatting
    let container = document.getElementById(containerDivId);
    container.style.width = width + chartsWidth + "px";
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
    canvas.addClass('canvas');
    canvas.parent(canvasDiv);
    background(0);

    lowerMenu = new LowerMenu(-1, canvas.height*3/4, canvas.width+1, canvas.height*1/4, [179, 229, 252], canvasDiv);
    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height,"varRightMenu", "rightMenu", canvasDiv, "Variables");
    varRightMenu.addVariable(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 0));
    varRightMenu.addVariable(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 1));

    createChart(chartsDiv, "chartsDiv", "barChart", chartsWidth, chartsHeight);
}

function draw() {
    background(255);
    exercise.run();
    //todo last argument should be initial energy
    lowerMenu.display(exercise.energy.getPotential(), exercise.energy.getKinetic(),
        exercise.energy.getElastic(), exercise.energy.actualEnergy, exercise.energy.actualEnergy);
    varRightMenu.getElementInfo(0);
}