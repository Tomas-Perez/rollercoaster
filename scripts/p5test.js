let terrainVertices = [];
let gravity = new p5.Vector(0, 0.1);
let cart, railGuide, energy;
const mass = 50;
const springConst = 0;

function setup(){
    createCanvas(1024, 768);
    const pathResolution = 50;

    let path_str = 'M0 0 Q0 700 200 700 H500 Q1024 700 1024 0';
    for (var c = 0; c < Raphael.getTotalLength(path_str); c += pathResolution) {
        let point = Raphael.getPointAtLength(path_str, c);
        terrainVertices.push(new p5.Vector(point.x, point.y));
    }

    cart = new Body(new p5.Vector(0,0), mass);
    const cartHeight = height - cart.position.y;
    energy = new Energy(mass, gravity.y, springConst, cartHeight, 0, 0);
    railGuide = new RailGuide(cart, terrainVertices, gravity);

}

function draw(){
    background(255);
    stroke(0);
    beginShape();
    for (let i = 0; i < terrainVertices.length; i++) {
        vertex(terrainVertices[i].x, terrainVertices[i].y);
    }
    endShape();

    energy.updateVelocity(height - cart.position.y,0);
    cart.velocity.setMag(energy.velocity);
    railGuide.update();
    cart.display();
}