let terrainVertices = [];

function setup(){
    createCanvas(1024, 768);

    $.get('./svg/ramp.svg').done(data => {
        $(data).find('path').each(function (i, path) {
            terrainVertices = Matter.Svg.pathToVertices(path, 30);
        });
    });
}

function draw(){
    background(255);
    stroke(0);

    beginShape();
    for (let i = 0; i < terrainVertices.length; i++) {
        vertex(terrainVertices[i].x, terrainVertices[i].y);
    }
    endShape(CLOSE);
    ellipse(mouseX, mouseY, 5);
    hit = collidePointPoly(mouseX,mouseY,terrainVertices);

    print("colliding? " + hit);
}