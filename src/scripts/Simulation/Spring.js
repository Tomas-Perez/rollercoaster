/**
 * @author Tomas Perez Molina
 */

const Spring = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.maxWidth = width;
    this.height = height;
    this.currentWidth = width;
    const loopSeparation = 10;
    this.loops = this.maxWidth / loopSeparation;
};

Spring.prototype.collide = function(rectangle){
    return collideRectRect(this.x, this.y, this.maxWidth, this.height,
        rectangle.x, rectangle.y, rectangle.width, rectangle.height);
};

Spring.prototype.compress = function(rectangle){
    if(this.collide(rectangle)) {
        this.currentWidth = rectangle.x - this.x;
    } else this.currentWidth = this.maxWidth;
};

Spring.prototype.display = function(){
    push();
    noFill();
    stroke(0);
    const endPoint = int(this.currentWidth + this.x);
    const loopSeparation = Math.abs(this.currentWidth / this.loops);
    beginShape();
    if(this.currentWidth > 0) {
        for (let i = this.x; i < endPoint; i += loopSeparation) {
            vertex(i, this.y + this.height);
            vertex(i, this.y);
        }
    } else {
        for (let i = this.x; i > endPoint; i -= loopSeparation) {
            vertex(i, this.y + this.height);
            vertex(i, this.y);
        }
    }
    vertex(this.currentWidth + this.x, this.y + this.height);
    vertex(this.currentWidth + this.x, this.y);
    endShape();
    pop();
};