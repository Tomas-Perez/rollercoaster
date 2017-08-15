let terrainVertices = [];
let gravity = new p5.Vector(0, 0.1);
let cart, railGuide;

function setup(){
    createCanvas(1024, 768);

    let path_str = 'M0 0 Q0 700 200 700 H500 Q1024 700 1024 0';
    // draw the shape normally
    for (var c = 0; c < Raphael.getTotalLength(path_str); c += 20) {
        let point = Raphael.getPointAtLength(path_str, c);
        terrainVertices.push(new p5.Vector(point.x, point.y));
    }

    cart = new Body(0, 0);
    railGuide = new RailGuide(cart, terrainVertices, gravity);
    // get vertices of shape
}

/*
function setup(){
    createCanvas(1024, 768);

    const vertexSets = [];
    $.get('./svg/ramp.svg').done(data => {
        $(data).find('path').each(function (i, path) {
            vertexSets.push(Matter.Svg.pathToVertices(path, 30));
        });

    });
    terrainVertices = vertexSets[0];
    console.log(vertexSets);
    console.log(vertexSets);

}
*/
function draw(){
    background(255);
    stroke(0);
    beginShape();
    for (let i = 0; i < terrainVertices.length; i++) {
        vertex(terrainVertices[i].x, terrainVertices[i].y);
    }
    endShape();
    railGuide.update();
    cart.display();
}