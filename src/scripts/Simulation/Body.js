/**
 * @author Tomas Perez Molina
 */

const Body = function(position, mass){
    this.position = position;
    this.mass = mass;
    this.velocity = 0;
    this.acceleration = new p5.Vector(0, 0);
    this.target = new p5.Vector(0, 0);
    this.positionReachedListeners = [];
};

Body.prototype.update = function () {
    if(this.velocity === 0) {
        this.position = p5.Vector.add(this.acceleration, this.position);
        this.positionReachedListeners.forEach(func => func());
    }
    let distanceTravelled = 0;
    let distanceToTarget = this.position.dist(this.target);
    while(this.velocity - distanceTravelled > distanceToTarget){
        this.position = this.target;
        this.positionReachedListeners.forEach(func => func());
        distanceTravelled += distanceToTarget;
        distanceToTarget = this.position.dist(this.target);
    }
    const velLeft = this.velocity - distanceTravelled;

    if(velLeft > 0) {
        const targetVector = p5.Vector.fromAngle(this.getTargetHeading()).setMag(velLeft);
        this.position = p5.Vector.add(this.position, targetVector);
    }
    /*
    const intMagnitude = int(this.velocity);
    const decimalMagnitude = this.velocity - intMagnitude;
    if(this.position.dist(this.target) < 1){
        this.positionReachedListeners.forEach(func => func());
    }
    for(let i = 0; i < intMagnitude; i++){
        if(this.position.dist(this.target) < 1){
            this.positionReachedListeners.forEach(func => func());
        }
        const targetVector = p5.Vector.fromAngle(this.getTargetHeading()).normalize();
        this.position = p5.Vector.add(targetVector, this.position);
    }
    if(this.position.dist(this.target) < 1){
        this.positionReachedListeners.forEach(func => func());
    }
    const decimalVector = p5.Vector.fromAngle(this.getTargetHeading()).setMag(decimalMagnitude);
    this.position = p5.Vector.add(decimalVector, this.position);
    */
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

Body.prototype.targetProjection = function(vector){
    const targetVector = p5.Vector.sub(this.target, this.position).normalize();
    const numerator = p5.Vector.dot(targetVector, vector);
    const denominator = p5.Vector.dot(targetVector, targetVector);
    return p5.Vector.mult(targetVector, numerator / denominator);
};
