/**
 * @author Tomas Perez Molina
 */

const Energy = function(mass, gravity, springConst, height, velocity, springLength){
    this.mass = mass;
    this.gravity = gravity;
    this.springConst = springConst;
    this.height = height;
    this.velocity = velocity;
    this.springLength = springLength;
    let elasticEnergy = this.calculateElastic(springLength);
    let potentialEnergy = this.calculatePotential(height, true);
    let kineticEnergy = this.calculateKinetic(velocity);
    this.actualEnergy = elasticEnergy + potentialEnergy + kineticEnergy;
    this.initialEnergy = this.actualEnergy;
    this.stuck = false;
};

Energy.prototype.calculatePotential = function(height, firstTime){
    let absoluteGravity = Math.abs(this.gravity);
    let apparentPotential = this.mass * absoluteGravity * height;
    if(firstTime) return apparentPotential;
    let actualPotential = Math.min(apparentPotential, this.actualEnergy);
    this.height = (actualPotential / this.mass) / absoluteGravity;
    return actualPotential;
};

Energy.prototype.calculateKinetic = function(velocity){
    return 0.5 * this.mass * Math.pow(velocity, 2);
};

Energy.prototype.calculateElastic = function(springLength){
  return 0.5 * this.springConst * Math.pow(springLength, 2);
};

Energy.prototype.calculateVelocity = function(kineticEnergy){
    return Math.sqrt(2 * kineticEnergy / this.mass);
};

Energy.prototype.updateVelocity = function(height, springLength){
    if(this.actualEnergy > 0) {
        this.height = height;
        if(this.stuck){
            this.height -= 0.1;
        }
        this.stuck = false;
        this.springLength = springLength;
        const kineticEnergy = this.actualEnergy - this.getPotential() - this.getElastic();
        this.velocity = kineticEnergy > 0 ? this.calculateVelocity(kineticEnergy) : 0;
        if(this.velocity === 0) this.stuck = true;
    }
    else this.velocity = 0;

    return this.velocity;
};

Energy.prototype.getPotential = function(){
    return this.calculatePotential(this.height);
};

Energy.prototype.getElastic = function(){
    return this.calculateElastic(this.springLength);
};

Energy.prototype.getKinetic = function(){
    return this.calculateKinetic(this.velocity);
};

Energy.prototype.updateEnergy = function(distanceTimesFriction){
    const frictionWork = distanceTimesFriction * this.mass * this.gravity;
    this.actualEnergy = Math.max(this.actualEnergy - frictionWork, 0);
};