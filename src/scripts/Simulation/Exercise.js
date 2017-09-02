const Exercise = function(options){
    options = options || {};

    const img = loadImage('../assets/cartDemo.png');
    const gravity = options.gravity || 10/36; //if(1 pixel == 1cm) 1 == 36 m/s^2

    this.update = true;
    this.finished = false;

    this.ramp = new Ramp(
        options.rampHeightLeft || 500,
        options.middlePathLength || 0,
        options.friction || 0,
        options.rampHeightRight || 500,
        options.radius || 0,
        options.rampColor || '#795548'
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
    this.body.updateListeners.push(this.energy.updateEnergy.bind(this.energy));
    this.body.updateListeners.push(this.updateBodyVelocity.bind(this));
    if(options.cycleFinishedListener){
        this.cycleFinishedListener = options.cycleFinishedListener;
        this.body.startListeners.push(this.cycleFinishedListener);
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
        if(this.energy.actualEnergy === 0){
            this.cycleFinishedListener();
            this.update = false;
            this.finished = true;
        }
    }
    this.cart.display(this.railGuide.direction > 0);
    //this.body.display();
    pop();
};

Exercise.prototype.pause = function(){
    if (!this.finished) {
        this.update = false;
    }
};

Exercise.prototype.play = function(){
    if (!this.finished) {
        this.update = true;
    }
};

Exercise.prototype.updateBodyVelocity = function () {
    this.body.velocity = this.energy.updateVelocity(this.ramp.lowestPoint - this.body.position.y, 0);
    this.body.position.y = this.ramp.lowestPoint - this.energy.height;
    if(this.energy.stuck) this.railGuide.chooseTarget();
};

Exercise.prototype.finish = function(){
    this.finished = true;
    this.update = false;
};
