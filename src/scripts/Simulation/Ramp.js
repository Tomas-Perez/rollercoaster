const Ramp = function(leftHeight, middleLength, friction, rightHeight, radius, color){
    this.vertices = [];
    this.shapes = [];
    this.color = color;
    this.hasLoop = radius > 0;
    this.heightBuffer = 76;
    const pathResolution = 5;
    const rampHeightLeftPath = - leftHeight;
    const rampHeightRightPath = - rightHeight;
    const startRampWidth = 512;
    const endRampWidth = 512;
    const middlePathEnd = startRampWidth + middleLength;
    const endRampCorner = middlePathEnd + endRampWidth;
    let startLoop = "";
    let loopTop = "";
    let endLoop = "";
    if(this.hasLoop){
        startLoop = describeArc(middlePathEnd, - radius, radius, 90, 180);
        loopTop = describeArc(middlePathEnd, - radius, radius, -90, 90);
        endLoop = describeArc(middlePathEnd, - radius, radius, 180, 270);
    }
    let startPath = 'M0 ' + rampHeightLeftPath + ' Q0 0 ' + startRampWidth + ' 0';
    let middlePath = 'M' + startRampWidth + ' 0 h' + middleLength + startLoop;
    let endPath = endLoop + 'M' + middlePathEnd + ' 0 Q' + endRampCorner + ' 0 ' + endRampCorner + ' ' + rampHeightRightPath;
    console.log(endPath);
    const paths = [startPath, middlePath, loopTop, endPath];
    for(let i = 0; i < paths.length; i++) {
        let pathLength = Raphael.getTotalLength(paths[i]);
        if(pathLength > 0) {
            let vectorFriction = 0;
            if(paths[i] === loopTop) this.loopIndex = this.shapes.length;
            else if(paths[i] === middlePath) vectorFriction = friction;
            let shape = [];
            for (let c = 0; c < pathLength; c += pathResolution) {
                const point = Raphael.getPointAtLength(paths[i], c);
                const vector = new PathVector(point.x, point.y, vectorFriction);
                if (vector.y > this.lowestPoint || !this.lowestPoint) this.lowestPoint = vector.y;
                if (vector.y < this.highestPoint || !this.highestPoint) this.highestPoint = vector.y;
                if (vector.x > this.mostRightPoint || !this.mostRightPoint) this.mostRightPoint = vector.x;
                if (vector.x < this.mostLeftPoint || !this.mostLeftPoint) this.mostLeftPoint = vector.x;
                this.vertices.push(vector);
                shape.push(vector);
            }
            const lastPoint = Raphael.getPointAtLength(paths[i], pathLength - 1);
            const vector = new PathVector(lastPoint.x, lastPoint.y, 0);
            shape.push(vector);
            this.shapes.push(shape);
        }
    }
    let lastCartPathPoint = Raphael.getPointAtLength(endPath, Raphael.getTotalLength(endPath) - 1);
    this.vertices.push(new PathVector(lastCartPathPoint.x, lastCartPathPoint.y, 0));

    this.height = this.lowestPoint - this.highestPoint + this.heightBuffer;
    this.width = this.mostRightPoint - this.mostLeftPoint;
};

Ramp.prototype.display = function(){
    push();
    stroke(0);
    for(let i = this.shapes.length - 1; i >= 0; i--) {
        let shape = this.shapes[i];
        if(this.hasLoop && i === this.loopIndex) noFill();
        else fill(this.color);
        beginShape();
        for (let j = 0; j < shape.length; j++) {
            vertex(shape[j].x, shape[j].y, 0);
            //ellipse(shape[j].x, shape[j].y, 2);
        }
        vertex(shape[shape.length - 1].x, this.lowestPoint + this.heightBuffer, 0);
        vertex(shape[0].x, this.lowestPoint + this.heightBuffer, 0);
        vertex(shape[0].x, shape[0].y, 0);
        endShape(CLOSE);
    }
    pop();
};