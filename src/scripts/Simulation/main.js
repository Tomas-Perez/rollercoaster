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

function setup(){
    createCanvas(1024, 576);
    exercise = new Exercise({rampHeightLeft: 249, radius: 100});
}

function draw(){
    scale(1);
    background(255);
    exercise.run(1024, 576);
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

const play = function () {
    exercise.play();
};

const pause = function(){
    exercise.pause();
};