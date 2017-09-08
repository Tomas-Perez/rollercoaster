const CartDrawing = function(body, img){
    this.body = body;
    this.img = img;
};

CartDrawing.prototype.display = function(x, y, trajectory){
    const yOffSet = 18;
    const angle = trajectory.heading();
    let scale = 0.05;
    push();
    noStroke();
    translate(x, y);
    /*
    let headingVector = p5.Vector.fromAngle(angle);
    if(!forward) headingVector = new p5.Vector(-headingVector.x, -headingVector.y);
    */
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, -yOffSet, 1222 * scale, 742 * scale);
    pop();
};