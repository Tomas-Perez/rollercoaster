/**
 * @author Tomas Perez Molina
 */

const Spring = function (x, y, width, height, leftToRight = true) {
    this.x = x;
    this.y = y - height;
    this.maxWidth = width;
    this.height = height;
    this.currentWidth = width;
    const loopSeparation = 10;
    this.loops = this.maxWidth / loopSeparation;
    this.leftToRight = leftToRight;
};

Spring.prototype.collide = function(poly){
    let x = this.x;
    if(!this.leftToRight) x -= this.maxWidth;
    return collideRectPoly(x, this.y, this.maxWidth, this.height, poly);
};

Spring.prototype.compress = function(poly){
    let x;
    const xs = poly.map(point => point.x);
    if(this.leftToRight) x = Math.min(...xs);
    else x = Math.max(...xs);
    if(this.collide(poly)) {
        this.currentWidth = abs(x - this.x);
    } else this.currentWidth = this.maxWidth;
};

Spring.prototype.display = function(){
    push();
    translate(this.x, this.y);
    if(!this.leftToRight){
        rotate(PI);
        translate(0, -this.height);
    }
    noFill();
    stroke(0);
    const endPoint = int(this.currentWidth);
    const loopSeparation = Math.abs(this.currentWidth / this.loops);
    beginShape();
    if(this.currentWidth > 0) {
        for (let i = 0; i < endPoint; i += loopSeparation) {
            vertex(i, this.height);
            vertex(i, 0);
        }
    } else {
        for (let i = 0; i > endPoint; i -= loopSeparation) {
            vertex(i, this.height);
            vertex(i, 0);
        }
    }
    vertex(this.currentWidth, this.height);
    vertex(this.currentWidth, 0);
    endShape();
    pop();
};