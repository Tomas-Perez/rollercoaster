const terrainVertices = [];
let body, railGuide, energy, ramp, cart;
const rampColor = '#795548';
const mass = 50;
const springConst = 0;
const gravity = 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

function setup(){
    createCanvas(1024, 768);
    const pathResolution = 50;

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
}

function draw(){
    background(255);
    ramp.display();
    energy.updateVelocity(height - body.position.y,0);
    body.velocity.setMag(energy.velocity);
    railGuide.update();
    body.display();
}