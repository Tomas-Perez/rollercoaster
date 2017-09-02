/**
 * @author Tomas Perez Molina
 */

const Body = function(position, mass){
    this.position = position;
    this.start = position;
    this.mass = mass;
    this.velocity = 0;
    this.acceleration = new p5.Vector(0, 0);
    this.target = new p5.Vector(0, 0);
    this.listeners = [];
    this.startListeners = [];
    this.updateListeners = [];
    this.actualFriction = 0;
    this.kickStarted = false;
};

Body.prototype.update = function () {
    if(this.velocity === 0) {
        this.listeners.forEach(func => func(0));
    }
    let delta = 0;
    for(let distanceTravelled = 0; distanceTravelled < this.velocity; distanceTravelled += delta){
        delta = Math.min(1, this.position.dist(this.target));
        let distanceTimesFriction = this.actualFriction * delta;
        const targetVector = p5.Vector.fromAngle(this.getTargetHeading()).setMag(delta);
        this.position = p5.Vector.add(this.position, targetVector);
        if(this.position.dist(this.target) === 0) this.listeners.forEach(func => func());
        this.updateListeners.forEach(e => e(distanceTimesFriction));
        if(this.start.dist(this.position) === 0) this.startListeners.forEach(func => func());
        this.actualFriction = this.target.friction;
    }
    /*
    let distanceTravelled = 0;
    let distanceToTarget = this.position.dist(this.target);
    while(this.velocity - distanceTravelled > distanceToTarget){
        this.kickStarted = false;
        let distanceTimesFriction = this.actualFriction * distanceToTarget;
        this.position = this.target;
        this.actualFriction = this.target.friction;
        this.listeners.forEach(func => func(distanceTimesFriction));
        if(this.start.dist(this.position) === 0) this.startListeners.forEach(func => func());
        distanceTravelled += distanceToTarget;
        distanceToTarget = this.position.dist(this.target);
    }
    const velLeft = this.velocity - distanceTravelled;

    if(velLeft > 0) {
        let distanceTimesFriction = this.actualFriction * velLeft;
        const targetVector = p5.Vector.fromAngle(this.getTargetHeading()).setMag(velLeft);
        this.position = p5.Vector.add(this.position, targetVector);
        this.listeners.forEach(func => func(distanceTimesFriction));
    }
    */
};

Body.prototype.display = function () {
    push();
    fill(0);
    ellipse(this.position.x, this.position.y, 10);
    fill(0, 255, 0);
    ellipse(this.target.x, this.target.y, 10);
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

Body.prototype.setStart = function(initialPos, target){
    this.position = initialPos;
    this.start = initialPos;
    this.target = target;
};
