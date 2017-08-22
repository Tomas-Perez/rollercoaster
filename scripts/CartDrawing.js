const displayCart = function(position, angle, img){
    const yOffSet = 18;
    let scale = 0.05;
    push();
    noStroke();
    translate(position.x, position.y);
    let headingVector = p5.Vector.fromAngle(angle);
    if(headingVector.x < 0){
        headingVector = new p5.Vector(-headingVector.x, -headingVector.y);
    }
    rotate(headingVector.heading());
    imageMode(CENTER);
    image(img, 0, -yOffSet, 1222 * scale, 742 * scale);
    pop();
};