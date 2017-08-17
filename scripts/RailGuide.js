/**
 * @author Tomas Perez Molina
 */

const distanceTolerance = 10;

const RailGuide = function(body, railVertices, acceleration){
    this.body = body;
    this.railVertices = railVertices;
    this.target = 0;
    this.direction = 1;
    this.acceleration = acceleration;

    this.body.position = this.railVertices[this.target];
};

RailGuide.prototype.update = function() {
    this.chooseTarget();
    this.body.acceleration = vectorProjectionOnU(this.getTargetVector(), this.acceleration);
    push();
    fill(0, 255, 0);
    ellipse(this.railVertices[this.target].x, this.railVertices[this.target].y, 5);
    pop();
    let magnitude = this.body.velocity.mag();
    let angle = this.getTargetVector().heading();
    this.body.velocity = p5.Vector.fromAngle(angle);
    this.body.velocity.setMag(magnitude);
    push();
    stroke(0, 255, 0);
    fill(0, 255, 0);
    ellipse(this.railVertices[this.target].x, this.railVertices[this.target].y, 5);
    line(this.body.position.x, this.body.position.y, this.railVertices[this.target].x, this.railVertices[this.target].y);
    pop();
    this.body.update();
};

RailGuide.prototype.chooseTarget = function(){
    let distance = this.railVertices[this.target].dist(this.body.position);
    if(distance < distanceTolerance) {
        if (this.target === this.railVertices.length - 1) this.direction = -1;
        else if (this.target === 0) this.direction = 1;
        else if (this.body.velocity.mag() < 1) {
            let previousTarget = this.railVertices[this.target - this.direction];
            let previousTargetVector = p5.Vector.sub(previousTarget, this.body.position);
            if (sameVectorDirection(previousTargetVector, this.body.velocity)) {
                this.direction *= -1;
            }
        }
        this.target += this.direction;
    }
    else if(!sameVectorDirection(this.body.velocity, this.getTargetVector())){
        console.log('foring');
        for(let i = this.target + this.direction; i < this.railVertices.length && i >= 0; i += this.direction){
            const currentTargetDistance = this.railVertices[this.target].dist(this.body.position);
            const nextTargetDistance = this.railVertices[i].dist(this.body.position);
            if(currentTargetDistance < nextTargetDistance) break;
            else if(currentTargetDistance === nextTargetDistance){

            }
            else {
                this.target = i;
                console.log('changing the target');
            }
        }
    }
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
