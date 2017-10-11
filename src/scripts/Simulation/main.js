/*
const maxHeight = 500;
const rampColor = '#795548';

const mass = 50;
const velocity = 0;
const springLength = 0;
const rampHeightLeft = 500;
const rampHeightRight = 500;
const springConst = 0;
const gravity = 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2
*/

let exercise;
let backgroundImg;
let spring1;
let spring2;
let x = 500;
let y = 250;

function setup(){
    createCanvas(1024, 576);
    spring1 = new Spring(x, y, 100, 25, false);
    spring2 = new Spring(x, y, 100, 25, true);
    let whatever;
    console.log(whatever || 500);
    whatever = 0;
    console.log(whatever || 500);
    whatever = 1;
    console.log(whatever || 500);
    //exercise = new Exercise({rampHeightLeft: 249, radius: 100});
}

function draw(){
    background(255);
    spring1.compress({x: mouseX, y: mouseY, width: 1, height: 1});
    spring1.display();
    spring2.compress({x: mouseX, y: mouseY, width: 1, height: 1});
    spring2.display();
    ellipse(x, y, 5);

    /*
    scale(1);
    background(255);
    exercise.run(1024, 576);
    */
    //body.display();

    /*
    if((body.position.y <= 3) && ((1024 - body.position.x) <= 3)){
        pause();
        text('Finished!', 1100, 300);
    }
    */

    /*
    text('Velocity: ' + energy.velocity.toFixed(2), 1100, 210);
    text('Height: ' + energy.height.toFixed(2), 1100, 230);
    text('Y: ' + body.position.y, 1100, 250);
    text('X: ' + body.position.x, 1100, 270);
    */
}
