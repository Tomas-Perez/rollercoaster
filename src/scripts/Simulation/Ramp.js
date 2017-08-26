const Ramp = function(maxHeight, leftHeight, rightHeight, radius, color){
    this.vertices = [];
    this.shapes = [];
    this.color = color;
    this.hasLoop = radius > 0;
    const pathResolution = 5;
    const rampHeightLeftPath = maxHeight - leftHeight;
    const rampHeightRightPath = maxHeight - rightHeight;
    let startLoop = "";
    let loopTop = "";
    let endLoop = "";
    if(this.hasLoop){
        startLoop = describeArc(512, 500 - radius, radius, 90, 180);
        loopTop = describeArc(512, 500 - radius, radius, -90, 90);
        endLoop = describeArc(512, 500 - radius, radius, 180, 270);
    }
    let startPath = 'M0 ' + rampHeightLeftPath + ' Q0 500 512 500 ' + startLoop;
    let endPath = endLoop + 'M512 500 Q1024 500 1024 ' + rampHeightRightPath;
    const paths = [startPath, loopTop, endPath];
    this.lowestPoint = new p5.Vector(0, 0);
    for(let i = 0; i < paths.length; i++) {
        let pathLength = Raphael.getTotalLength(paths[i]);
        if(pathLength > 0) {
            let shape = [];
            for (let c = 0; c < pathLength; c += pathResolution) {
                const point = Raphael.getPointAtLength(paths[i], c);
                const vector = new p5.Vector(point.x, point.y);
                if (vector.y > this.lowestPoint.y) this.lowestPoint = vector;
                this.vertices.push(vector);
                shape.push(vector);
            }
            this.shapes.push(shape);
        }
    }
    let lastCartPathPoint = Raphael.getPointAtLength(endPath, Raphael.getTotalLength(endPath) - 1);
    this.vertices.push(new p5.Vector(lastCartPathPoint.x, lastCartPathPoint.y));
};

Ramp.prototype.display = function(){
    push();
    for(let i = this.shapes.length - 1; i >= 0; i--) {
        let shape = this.shapes[i];
        if(this.hasLoop && i === 1) noFill();
        else fill(this.color);
        beginShape();
        for (let j = 0; j < shape.length; j++) {
            vertex(shape[j].x, shape[j].y, 0);
            //ellipse(shape[j].x, shape[j].y, 2);
        }
        vertex(shape[shape.length - 1].x, height, 0);
        vertex(shape[0].x, height, 0);
        vertex(shape[0].x, shape[0].y, 0);
        endShape(CLOSE);
    }
    pop();
};