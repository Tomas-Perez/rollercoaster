let canvas;
let lowerMenu;
let varRightMenu;
let expRightMenu;
let charts;

function setup() {
    let width = 1024;
    let height = 768;
    let chartsWidth = 1024;
    let chartsHeight = 256;
    let containerDivId = "container";
    let canvasDivId = "canvasDiv";
    let chartsDivId = "chartsDiv";
    charts = [];
    exercise = new Exercise({middlePathLength: 100});

    //container formatting
    let container = document.getElementById(containerDivId);
    container.style.width = width + "px";
    container.style.height = height + chartsHeight + "px";
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

    lowerMenu = new LowerMenu(-1, canvas.height*3/4, canvas.width+1, canvas.height*1/4, [179, 229, 252], canvasDiv, play, pause);
    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height,"varRightMenu", "rightMenu", canvasDiv, "Variables");
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 0));
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 1));

    expRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "expRightMenu", "rightMenu", canvasDiv, "Experiences");
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 0, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 1, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 2, function(){ return toggleMenu('varbtn', 'expRightMenu');}));

    charts.push(new Chart2D(1, 'position'));
    charts.push(new Chart2D(2, 'velocity'));
    charts.push(new Chart2D(3, 'height'));
    charts.push(new Chart2D(4, 'height'));
}

function draw() {
    i++;
    background(255);
    if(frameRate() < 30){
        console.log('drop');
    }
    console.log();
    push();
    exercise.run(width, height * (3/4));
    pop();
    lowerMenu.display(exercise.energy.getPotential(), exercise.energy.getKinetic(),
        exercise.energy.getElastic(), exercise.energy.actualEnergy, exercise.energy.initialEnergy);
    varRightMenu.getElementInfo(0);
    charts[0].addData(exercise.body.position.x);
    charts[1].addData(exercise.energy.velocity);
    charts[2].addData(exercise.energy.height);
    charts[3].addData(exercise.energy.height);
}

function changeExc(height, radius, middlePathLength){
    //testing
    exercise = new Exercise({rampHeightLeft: height, radius: radius, middlePathLength: middlePathLength});
    charts.map(c => c.resetChart());
}

function play(){
    exercise.play();
}

function pause(){
    exercise.pause();
}