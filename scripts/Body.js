/**
 * @author Tomas Perez Molina
 */

const Body = function(position, mass){
    this.position = position;
    this.mass = mass;
    this.velocity = new p5.Vector(0,0);
    this.acceleration = new p5.Vector(0,0);
    this.target = new p5.Vector(0, 0);
    this.listeners = [];
};

Body.prototype.update = function () {
    this.velocity = p5.Vector.add(this.velocity, this.acceleration);
    const velocityMagnitude = this.velocity.mag();
    const intMagnitude = int(velocityMagnitude);
    const decimalMagnitude = velocityMagnitude - intMagnitude;
    if(this.position.dist(this.target) < 1){
        this.listeners.forEach(func => func());
    }
    for(let i = 0; i < intMagnitude; i++){
        if(this.position.dist(this.target) < 1){
            this.listeners.forEach(func => func());
        }
        const targetVector = p5.Vector.fromAngle(this.getTargetHeading()).normalize();
        this.position = p5.Vector.add(targetVector, this.position);
    }
    if(this.position.dist(this.target) < 1){
        this.listeners.forEach(func => func());
    }
    const decimalVector = p5.Vector.fromAngle(this.getTargetHeading()).setMag(decimalMagnitude);
    this.position = p5.Vector.add(decimalVector, this.position);
};

Body.prototype.display = function () {
    push();
    fill(0);
    ellipse(this.position.x, this.position.y, 10);
    pop();
};

Body.prototype.getTargetHeading = function () {
    return p5.Vector.sub(this.target, this.position).heading();
};
