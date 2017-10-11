const CartDrawing = function(body, img){
    const scale = 0.05;
    this.body = body;
    this.img = img;
    this.width = 1222*scale;
    this.height = 742*scale;
};

CartDrawing.prototype.display = function(x, y, trajectory){
    const yOffSet = 18;
    const angle = trajectory.heading();
    push();
    noStroke();
    translate(x, y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, -yOffSet, this.width, this.height);
    pop();
    const center = {x, y};
    return tiltedRect(x, y - yOffSet, this.width, this.height, angle, center);
};

const tiltedRect = function(x, y, w, h, angle, center){
    const oldUl = {x: x - w / 2, y: y - h / 2};
    const oldUr = {x: x + w / 2, y: y - h / 2};
    const oldBl = {x: x - w / 2, y: y + h / 2};
    const oldBr = {x: x + w / 2, y: y + h / 2};

    const ul  = rotatePoint(oldUl, center, angle);
    const ur  = rotatePoint(oldUr, center, angle);
    const bl = rotatePoint(oldBl, center, angle);
    const br  =  rotatePoint(oldBr, center, angle);

    return [ul, ur, bl, br];
};

function rotatePoint(point, origin, angle) {
    const x = Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x;
    const y = Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y;
    return new p5.Vector(x, y);
}