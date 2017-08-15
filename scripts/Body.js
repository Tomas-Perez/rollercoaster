/**
 * @author Tomas Perez Molina
 */

const Body = function(position){
    this.position = position;
    this.velocity = new p5.Vector(0,0);
    this.acceleration = new p5.Vector(0,0);
};

Body.prototype.update = function () {
    this.velocity = p5.Vector.add(this.velocity, this.acceleration);
    this.position = p5.Vector.add(this.velocity, this.position);
    console.log(this.position);
};

Body.prototype.display = function () {
    push();
    stroke(0);
    ellipse(this.position.x, this.position.y, 10);
    pop();
};