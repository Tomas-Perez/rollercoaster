const Ramp = function(maxHeight, leftHeight, rightHeight){
    this.vertices = [];
    const pathResolution = 5;
    const rampHeightLeftPath = maxHeight - leftHeight;
    const rampHeightRightPath = maxHeight - rightHeight;
    let cartPath = 'M0 ' + rampHeightLeftPath + 'Q0 500 512 500 Q1024 500 1024 ' + rampHeightRightPath;

    let cartPathLength = Raphael.getTotalLength(cartPath);
    this.lowestPoint = new p5.Vector(0, 0);
    for (let c = 0; c < cartPathLength; c += pathResolution) {
        const point = Raphael.getPointAtLength(cartPath, c);
        const vector = new p5.Vector(point.x, point.y);
        if(vector.y > this.lowestPoint.y) this.lowestPoint = vector;
        this.vertices.push(vector);
    }
    let lastCartPathPoint = Raphael.getPointAtLength(cartPath, cartPathLength - 1);
    this.vertices.push(new p5.Vector(lastCartPathPoint.x, lastCartPathPoint.y));
};