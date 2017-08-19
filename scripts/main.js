const terrainVertices = [];
let body, railGuide, energy, ramp, cart, run;
const rampColor = '#795548';
const mass = 50;
const springConst = 0;
let gravity = 5/36; //if(1 pixel == 1cm) 1 == 36 m/s^2
let minY = 50;
let maxX = 0;

function setup(){
    createCanvas(1500, 768);
    const pathResolution = 5;
    run = true;
    let cartPath = 'M0 0 Q0 700 512 700 Q1024 700 1024 0';

    let cartPathLength = Raphael.getTotalLength(cartPath);
    for (let c = 0; c < cartPathLength; c += pathResolution) {
        let point = Raphael.getPointAtLength(cartPath, c);
        terrainVertices.push(new p5.Vector(point.x, point.y));
    }
    let lastCartPathPoint = Raphael.getPointAtLength(cartPath, cartPathLength - 1);
    terrainVertices.push(new p5.Vector(lastCartPathPoint.x, lastCartPathPoint.y));

    ramp = new Ramp(terrainVertices, rampColor);
    body = new Body(new p5.Vector(0,0), mass);
    cart = new Cart(body.position);
    const cartHeight = height - body.position.y;
    energy = new Energy(mass, gravity, springConst, cartHeight, 0, 0);
    railGuide = new RailGuide(body, terrainVertices, 0);
    body.velocity = new p5.Vector(0.1, 0.1);
    body.listeners.push(railGuide.chooseTarget.bind(railGuide));
}

function draw(){
    background(255);
    ramp.display();
    if(run) {
        energy.updateVelocity(height - body.position.y, 0);
        body.velocity.setMag(energy.velocity);
        body.update();
    }
    body.display();

    if(body.position.y < minY) minY = body.position.y;
    if(body.position.x > maxX) maxX = body.position.x;

    if((body.position.y < 3) && ((1024 - body.position.x) < 5)){
        run = false;
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