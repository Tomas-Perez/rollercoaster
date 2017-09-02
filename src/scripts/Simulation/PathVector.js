/**
 * @author Tomas Perez Molina
 */

const PathVector = function(x, y, friction){
    this.x = x;
    this.y = y;
    this.friction = friction;
};

PathVector.prototype = Object.create(p5.Vector.prototype);
