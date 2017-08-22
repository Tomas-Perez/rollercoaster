const maxHeight = 500;
const rampColor = '#795548';

let body, railGuide, energy, rampDrawing, run, cart, ramp;
const mass = 50;
const velocity = 0;
const springLength = 0;
const rampHeightLeft = 500;
const rampHeightRight = 500;
const springConst = 0;
const gravity = 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

function setup(){
    createCanvas(1500, 576);
    const img = loadImage('./assets/cart.png');

    run = true;

    ramp = new Ramp(maxHeight, rampHeightLeft, rampHeightRight);
    rampDrawing = new RampDrawing(ramp.vertices, rampColor);
    body = new Body(new p5.Vector(0,0), mass);
    railGuide = new RailGuide(body, ramp.vertices);
    cart = new CartDrawing(body, img);
    const cartHeight = height - body.position.y;
    energy = new Energy(mass, gravity, springConst, cartHeight, velocity, springLength);

    body.acceleration = new p5.Vector(0, gravity);
    body.listeners.push(railGuide.chooseTarget.bind(railGuide));
    body.position.y += 0.1;
}

function draw(){
    scale(1);
    background(255);
    rampDrawing.display();
    if(run) {
        body.velocity = energy.updateVelocity(height - body.position.y, 0);
        body.update();
    }
    cart.display();
    body.display();

    /*
    if((body.position.y <= 3) && ((1024 - body.position.x) <= 3)){
        pause();
        text('Finished!', 1100, 300);
    }
    */

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