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
    let potentialEnergy = this.calculatePotential(height);
    let kineticEnergy = this.calculateKinetic(velocity);
    this.actualEnergy = elasticEnergy + potentialEnergy + kineticEnergy;
};

Energy.prototype.calculatePotential = function(height){
    let absoluteGravity = Math.abs(this.gravity);
    return this.mass * absoluteGravity * height;
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
    this.height = height;
    this.springLength = springLength;
    const kineticEnergy = this.actualEnergy - this.calculatePotential(height) - this.calculateElastic(springLength);
    this.velocity = this.calculateVelocity(kineticEnergy);
};
