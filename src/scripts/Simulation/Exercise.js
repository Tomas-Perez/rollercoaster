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
    this.body.listeners.push(this.railGuide.chooseTarget.bind(this.railGuide));
    this.body.listeners.push(this.updateBodyVelocity.bind(this));
    if(options.startListener){
        this.body.startListeners.push(options.startListener);
    }
};

Exercise.prototype.run = function(width, height){
    const heightScale = height / this.ramp.height;
    const widthScale = width / this.ramp.width;
    const finalScale = Math.min(heightScale, widthScale);
    const xTranslate = -this.ramp.mostLeftPoint;
    const yTranslate = -this.ramp.highestPoint + height * (1/finalScale) - this.ramp.height;
    push();
    scale(finalScale);
    translate(xTranslate, yTranslate);
    this.ramp.display();
    if(this.update) {
        this.updateBodyVelocity();
        this.body.update();
    }
    this.cart.display(this.railGuide.direction > 0);
    //this.body.display();
    pop();
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

