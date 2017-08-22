
const Ramp = function(vertices, color){
    this.vertices = vertices;
    this.color = color;
};

Ramp.prototype.display = function(){
    push();
    fill(this.color);
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
        vertex(this.vertices[i].x, this.vertices[i].y);
        //ellipse(this.vertices[i].x, this.vertices[i].y, 2);
    }
    vertex(width, height);
    vertex(0, height);
    vertex(0,0);
    endShape(CLOSE);
    pop();
};