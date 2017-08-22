/**
 * @author Tomas Perez Molina
 */

const RailGuide = function(body, railVertices){
    this.body = body;
    this.railVertices = railVertices;
    this.target = 0;
    this.direction = 1;
    this.body.position = this.railVertices[this.target];
    this.body.target = this.railVertices[this.target];
};

RailGuide.prototype.chooseTarget = function(){
    if (this.target === this.railVertices.length - 1) this.direction = -1;
    else if (this.target === 0) this.direction = 1;
    else if (this.body.velocity < 1) {
        this.direction *= -1;
    }
    this.target += this.direction;
    this.body.target = this.railVertices[this.target];
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
