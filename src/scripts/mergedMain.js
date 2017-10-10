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
    console.log(UnitConverter);

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

    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height,"varRightMenu", "rightMenu", "rightMenuDiv", "Variables", true);

    varRightMenu.addContent(new Variable("Mass", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 0));
    varRightMenu.addContent(new Variable("Gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 1));
    varRightMenu.addContent(new Variable("Velocity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 2));
    varRightMenu.addContent(new Variable("Friction", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 3));
    varRightMenu.addContent(new Variable("Spring K", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 4));
    varRightMenu.addContent(new Variable("Spring length", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 5));
    varRightMenu.addContent(new Variable("Radius", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 6));
    varRightMenu.addContent(new Variable("Middle path", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 7));
    varRightMenu.addContent(new Variable("Ramp l-height", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 8));
    varRightMenu.addContent(new Variable("Ramp r-height", "m", varRightMenu.width, varRightMenu.height, varRightMenu.contentDivId, 9));

    expRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "expRightMenu", "rightMenu", "rightMenuDiv", "Experiences", false);
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/ramp_button_1.jpg", expRightMenu.contentDivId, 0, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/ramp_button_2.jpg", expRightMenu.contentDivId, 1, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/ramp_button_3.jpg", expRightMenu.contentDivId, 2, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "./assets/ramp_button_4.jpg", expRightMenu.contentDivId, 3, function(){ return toggleMenu('varbtn', 'expRightMenu');}));

    charts.push(new Chart2D(1, 'position'));
    charts.push(new Chart2D(2, 'velocity'));
    charts.push(new Chart2D(3, 'height'));
    charts.push(new Chart2D(4, 'height'));
}

function draw() {
    background(255);
    exercise.run(width, height * (3/4));
    const energies = UnitConverter.energiesConvertToReal({
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
        charts[0].addData(UnitConverter.convertLongitudeToReal(exercise.body.position.x));
        charts[1].addData(UnitConverter.convertVelocityToReal(exercise.energy.velocity));
        charts[2].addData(UnitConverter.convertLongitudeToReal(exercise.energy.height));
        charts[3].addData(UnitConverter.convertLongitudeToReal(exercise.energy.height));
    }
    text(frameRate().toFixed(0), 1010, 575);
}

function changeExc(variables){
    exercise = new Exercise(UnitConverter.initVarsConvertToVirtual(variables), stopCharts);
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

function getExcVariables(){
    return UnitConverter.initVarsConvertToReal(exercise.variables);
}