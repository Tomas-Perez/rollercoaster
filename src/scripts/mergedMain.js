let canvas;
let lowerMenu;
let varRightMenu;
let expRightMenu;

function setup() {
    let width = 1024;
    let height = 768;
    let parent = "canvasDiv";

    let canvasDiv = document.getElementById(parent);
    canvasDiv.style.width = width + "px";
    canvasDiv.style.height = height + "px";

    canvas = createCanvas(width, height);
    exercise = new Exercise();
    canvas.addClass('canvas');
    canvas.parent(parent);
    lowerMenu = new LowerMenu(-1, canvas.height*3/4, canvas.width+1, canvas.height*1/4, [179, 229, 252], parent);

    expRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "expRightMenu", "rightMenu", parent, "Experiences");
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 0, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 1, function(){ return toggleMenu('varbtn', 'expRightMenu');}));
    expRightMenu.addContent(new ExpThumbnail(expRightMenu.width, 70, expRightMenu.height, "../assets/changeExercise.png", expRightMenu.id, 2, function(){ return toggleMenu('varbtn', 'expRightMenu');}));


    varRightMenu = new RightMenu(canvas.width*1/4, canvas.height, "varRightMenu", "rightMenu", parent, "Variables");
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 0));
    varRightMenu.addContent(new Variable("gravity", "m", varRightMenu.width, varRightMenu.height, varRightMenu.id, 1));
}

function draw() {
    background(255);
    exercise.run();
    //todo last argument should be initial energy
    lowerMenu.display(exercise.energy.getPotential(), exercise.energy.getKinetic(),
        exercise.energy.getElastic(), exercise.energy.actualEnergy, exercise.energy.actualEnergy);
    varRightMenu.getElementInfo(0);
}