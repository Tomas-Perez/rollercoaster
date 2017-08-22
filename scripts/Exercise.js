const Exercise = function(options){
    options = options || {};

    const img = loadImage('./assets/cart.png');
    const gravity = options.gravity || 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

    this.update = true;
    this.ramp = new Ramp(
        options.maxHeight || 500,
        options.rampHeightLeft || 500,
        options.rampHeightRight || 500
    );
    this.rampDrawing = new RampDrawing(this.ramp.vertices, options.rampColor || '#795548');
    this.body = new Body(new p5.Vector(0,0), options.mass || 50);
    this.railGuide = new RailGuide(this.body, this.ramp.vertices);
    this.cart = new CartDrawing(this.body, img);
    const cartHeight = height - this.body.position.y;
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
    this.body.position.y += 0.1;
};

Exercise.prototype.run = function(){
    this.rampDrawing.display();
    if(this.update) {
        this.body.velocity = this.energy.updateVelocity(height - this.body.position.y, 0);
        this.body.update();
    }
    this.cart.display();
};

Exercise.prototype.pause = function(){
    this.update = false;
};

Exercise.prototype.play = function(){
    this.update = true;
};