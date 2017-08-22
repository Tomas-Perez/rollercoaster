const terrainVertices = [];
let body, railGuide, energy, ramp, cart, run, img;
const rampColor = '#795548';
const mass = 50;
const rampHeightLeft = 500;
const rampHeightRight = 500;
const maxHeight = 500;
const springConst = 0;
let gravity = 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

function setup(){
    createCanvas(1500, 576);
    img = loadImage('./assets/cart.png');

    const pathResolution = 5;
    run = true;
    const rampHeightLeftPath = maxHeight - rampHeightLeft;
    const rampHeightRightPath = maxHeight - rampHeightRight;
    let cartPath = 'M0 ' + rampHeightLeftPath + 'Q0 500 512 500 Q1024 500 1024 ' + rampHeightRightPath;

    let cartPathLength = Raphael.getTotalLength(cartPath);
    for (let c = 0; c < cartPathLength; c += pathResolution) {
        let point = Raphael.getPointAtLength(cartPath, c);
        terrainVertices.push(new p5.Vector(point.x, point.y));
    }
    let lastCartPathPoint = Raphael.getPointAtLength(cartPath, cartPathLength - 1);
    terrainVertices.push(new p5.Vector(lastCartPathPoint.x, lastCartPathPoint.y));

    ramp = new Ramp(terrainVertices, rampColor);
    body = new Body(new p5.Vector(0,0), mass);
    railGuide = new RailGuide(body, terrainVertices, 0);
    const cartHeight = height - body.position.y;
    energy = new Energy(mass, gravity, springConst, cartHeight, 0, 0);
    body.acceleration = new p5.Vector(0, gravity);
    body.listeners.push(railGuide.chooseTarget.bind(railGuide));
}

function draw(){
    scale(1);
    background(255);
    ramp.display();
    if(run) {
        energy.updateVelocity(height - body.position.y, 0);
        body.velocity.setMag(energy.velocity);
        body.update();
    }
    displayCart(body.position, body.getTargetHeading(), img);
    body.display();

    if((body.position.y <= 3) && ((1024 - body.position.x) <= 3)){
        pause();
        text('Finished!', 1100, 300);
    }

    text('Velocity: ' + energy.velocity.toFixed(2), 1100, 210);
    text('Height: ' + energy.height.toFixed(2), 1100, 230);
    text('Y: ' + body.position.y, 1100, 250);
    text('X: ' + body.position.x, 1100, 270);
}

const play = function () {
    run = true;
};

const pause = function(){
    run = false;
};