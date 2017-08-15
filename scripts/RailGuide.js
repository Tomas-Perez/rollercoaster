/**
 * @author Tomas Perez Molina
 */

const RailGuide = function(body, railVertices, acceleration){
    this.body = body;
    this.railVertices = railVertices;
    this.target = 0;
    this.direction = 1;
    this.acceleration = acceleration;

    this.body.position = this.railVertices[this.target];
};

RailGuide.prototype.update = function() {
    if(vectorAlmostEq(this.railVertices[this.target], this.body.position)) {

    }
    this.chooseTarget();
    this.body.acceleration = vectorProjectionOnU(this.getTargetVector(), this.acceleration);
    let magnitude = this.body.velocity.mag();
    let angle = this.getTargetVector().heading();
    this.body.velocity = p5.Vector.fromAngle(angle);
    this.body.velocity.setMag(magnitude);
    /*
    this.body.velocity = vectorProjectionOnU(this.getTargetVector(), this.body.velocity);
    this.body.velocity.setMag(magnitude);
    */
    this.body.update();
};

RailGuide.prototype.chooseTarget = function(){
    if(this.target === this.railVertices.length) this.direction = -1;
    else if(this.target === 0) this.direction = 1;
    else{
        let previousTarget = this.railVertices[this.target - this.direction];
        let previousTargetVector = p5.Vector.sub(previousTarget, this.body.position);
        if(sameVectorDirection(previousTargetVector, this.body.velocity)) this.direction *= -1;
    }
    this.target += this.direction;
};

RailGuide.prototype.getTargetVector = function(){
    return p5.Vector.sub(this.railVertices[this.target], this.body.position);
};

const sameVectorDirection = function(u, v){
    return u.angleBetween(v) < HALF_PI;
};

const almostEq = function(v1, v2, epsilon) {
    if (epsilon === null) {
        epsilon = 0.0000000000000000000001;
    }
    return Math.abs(v1 - v2) < epsilon;
};

const vectorAlmostEq = function(u, v, epsilon){
    return almostEq(u.x, v.x, epsilon) && almostEq(u.y, v.y, epsilon);
};


const vectorProjectionOnU = function(u, v){
    const numerator = p5.Vector.dot(u, v);
    const denominator = p5.Vector.dot(u, u);
    return p5.Vector.mult(u, numerator / denominator);
};
