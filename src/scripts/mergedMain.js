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
    let rightMenuDiv;

    charts = [];
    exercise = new Exercise({middlePathLength: 100, friction: 0.7}, stopCharts);

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

    rightMenuDiv = createDiv('');
    rightMenuDiv.parent(canvasDiv);
    rightMenuDiv.id('rightMenuDiv');
    rightMenuDiv.addClass('rightMenuDiv');
    rightMenuDiv.style('height', canvas.height + 'px');
    rightMenuDiv.style('width', canvas.width*1/4 + 'px');

    lowerMenu = new LowerMenu(-1, canvas.height*3/4, canvas.width+1, canvas.height*1/4, [179, 229, 252], canvasDiv, play, pause);

    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height,"varRightMenu", "rightMenu", "rightMenuDiv", "Variables");
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 0));
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 1));

    expRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "expRightMenu", "rightMenu", "rightMenuDiv", "Experiences");
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/changeExercise.png", expRightMenu.id, 0, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/changeExercise.png", expRightMenu.id, 1, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/changeExercise.png", expRightMenu.id, 2, function(){ return toggleMenu('varbtn', 'expRightMenu');}));

    charts.push(new Chart2D(1, 'position'));
    charts.push(new Chart2D(2, 'velocity'));
    charts.push(new Chart2D(3, 'height'));
    charts.push(new Chart2D(4, 'height'));
}

function draw() {
    background(255);
    exercise.run(width, height * (3/4));
    const energies = energiesConvertToReal({
        kinetic: exercise.energy.getKinetic(),
        potential: exercise.energy.getPotential(),
        elastic: exercise.energy.getElastic(),
        initial:  exercise.energy.initialEnergy,
        current: exercise.energy.actualEnergy
    });
    lowerMenu.display(energies.potential, energies.kinetic,
        energies.elastic, energies.current, energies.initial);
    varRightMenu.getElementInfo(0);
    if(exercise.update) {
        charts[0].addData(convertLongitudeToReal(exercise.body.position.x));
        charts[1].addData(convertVelocityToReal(exercise.energy.velocity));
        charts[2].addData(convertLongitudeToReal(exercise.energy.height));
        charts[3].addData(convertLongitudeToReal(exercise.energy.height));
    }
    text(frameRate().toFixed(0), 1010, 575);
}

function changeExc(variables){
    exercise = new Exercise(initVarsConvertToVirtual(variables), stopCharts);
    charts.forEach(c => c.resetChart());
}

function play(){
    exercise.play();
}

function pause(){
    exercise.pause();
}

function stopCharts(){
    charts.forEach(chart => chart.done());
}