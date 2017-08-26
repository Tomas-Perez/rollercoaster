const CartDrawing = function(body, img){
    this.body = body;
    this.img = img;
};

CartDrawing.prototype.display = function(forward){
    const yOffSet = 18;
    const angle = this.body.getTargetHeading();
    let scale = 0.05;
    push();
    noStroke();
    translate(this.body.position.x, this.body.position.y);
    let headingVector = p5.Vector.fromAngle(angle);
    if(!forward) headingVector = new p5.Vector(-headingVector.x, -headingVector.y);
    rotate(headingVector.heading());
    imageMode(CENTER);
    image(this.img, 0, -yOffSet, 1222 * scale, 742 * scale);
    pop();
};