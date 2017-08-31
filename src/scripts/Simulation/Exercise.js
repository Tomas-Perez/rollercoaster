const Exercise = function(options){
    options = options || {};

    const img = loadImage('../assets/cartDemo.png');
    const gravity = options.gravity || 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

    this.update = true;
    this.ramp = new Ramp(
        options.rampHeightLeft || 500,
        options.rampHeightRight || 500,
        options.radius || 0,
        options.rampColor || '#795548',
        options.middlePathLength || 0
    );
    this.body = new Body(new p5.Vector(0,0), options.mass || 50);
    this.railGuide = new RailGuide(this.body, this.ramp.vertices);
    this.cart = new CartDrawing(this.body, img);
    const cartHeight = this.ramp.lowestPoint - this.body.position.y;
    this.energy = new Energy(
        this.body.mass,
        gravity,
        options.springConst || 0,
        cartHeight,
        options.velocity || 0,
        options.springLength || 0
    );

    this.body.acceleration = new p5.Vector(0, gravity);
    this.body.positionReachedListeners.push(this.railGuide.chooseTarget.bind(this.railGuide));
    this.body.positionReachedListeners.push(this.updateBodyVelocity.bind(this));
};

Exercise.prototype.run = function(width, height){
    const heightBuffer = 76;
    const actualSimHeight = this.ramp.lowestPoint - this.ramp.highestPoint + heightBuffer;
    const actualSimWidth = this.ramp.mostRightPoint - this.ramp.mostLeftPoint;
    const heightScale = height / actualSimHeight;
    const widthScale = width / actualSimWidth;
    const finalScale = Math.min(heightScale, widthScale);
    push();
    scale(finalScale);
    translate(-this.ramp.mostLeftPoint, -this.ramp.highestPoint);
    this.ramp.display();
    if(this.update) {
        this.updateBodyVelocity();
        this.body.update();
    }
    this.cart.display(this.railGuide.direction > 0);
    pop();
    //this.body.display();
};

Exercise.prototype.pause = function(){
    this.update = false;
};

Exercise.prototype.play = function(){
    this.update = true;
};

Exercise.prototype.updateBodyVelocity = function () {
    this.body.velocity = this.energy.updateVelocity(this.ramp.lowestPoint - this.body.position.y, 0);
};

