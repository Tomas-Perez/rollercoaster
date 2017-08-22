const displayCart = function(position, angle){
    const yOffSet = 15;
    push();
    noStroke();
    fill(0);
    translate(position.x, position.y);
    const headingVector = p5.Vector.fromAngle(angle);
    rotate(angle);
    rectMode(RADIUS);
    rect(0, headingVector.x < 0 ? yOffSet : -yOffSet, 30, 10);
    pop();
};