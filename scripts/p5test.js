const terrainVertices = [];
let cart, railGuide, energy;
const mass = 50;
const springConst = 0;
const gravity = 10/36;

function setup(){
    createCanvas(1024, 768);
    const pathResolution = 25;

    let cartPath = 'M0 0 Q0 700 200 700 H500 Q1024 700 1024 0';

    let cartPathLength = Raphael.getTotalLength(cartPath);
    for (let c = 0; c < cartPathLength; c += pathResolution) {
        let point = Raphael.getPointAtLength(cartPath, c);
        terrainVertices.push(new p5.Vector(point.x, point.y));
    }
    let lastCartPathPoint = Raphael.getPointAtLength(cartPath, cartPathLength - 1);
    terrainVertices.push(new p5.Vector(lastCartPathPoint.x, lastCartPathPoint.y));

    cart = new Body(new p5.Vector(0,0), mass);
    const cartHeight = height - cart.position.y;
    energy = new Energy(mass, gravity, springConst, cartHeight, 0, 0);
    railGuide = new RailGuide(cart, terrainVertices, 0);
    cart.velocity = new p5.Vector(0.1, 0.1);
}

function draw(){
    background(255);
    noStroke(0);
    push();
    fill(93, 64, 55);
    beginShape();
    for (let i = 0; i < terrainVertices.length; i++) {
        vertex(terrainVertices[i].x, terrainVertices[i].y);
        ellipse(terrainVertices[i].x, terrainVertices[i].y, 2);
    }
    vertex(1024, 768);
    vertex(0, 768);
    vertex(0,0);
    endShape(CLOSE);
    pop();

    energy.updateVelocity(height - cart.position.y,0);
    cart.velocity.setMag(energy.velocity);
    console.log(cart.acceleration);
    console.log(cart.velocity);
    railGuide.update();
    cart.display();
}