const Cart = function(position){
    this.position = position;
};

Cart.prototype.display = function(){
    push();
    noStroke();
    fill(0);
    rect(this.position.x, this.position.y, 30, 10);
    pop();
};