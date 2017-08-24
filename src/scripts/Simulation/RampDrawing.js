const RampDrawing = function(vertices, color){
    this.vertices = vertices;
    this.color = color;
};

RampDrawing.prototype.display = function(){
    push();
    fill(this.color);
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
        vertex(this.vertices[i].x, this.vertices[i].y, 0);
        //ellipse(this.vertices[i].x, this.vertices[i].y, 2);
    }
    line(this.vertices[0].x, this.vertices[0].y, 1024, this.vertices[0].y);
    vertex(width, height, 0);
    vertex(0, height, 0);
    vertex(0,0,0);
    endShape(CLOSE);
    pop();
};