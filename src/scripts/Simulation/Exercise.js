const Exercise = function(options = {}){
    const defaults = {
        rampHeightLeft: 500,
        middlePathLength: 0,
        friction: 0,
        rampHeightRight: 500,
        radius: 0,
        rampColor: '#795548',
        gravity: 10/36, //if(1 pixel == 1cm) 1 == 36 m/s^2
        springConst: 0,
        velocity: 0,
        springLength: 0,
        mass: 50,
        cycleFinishedListener: function () {}
    };

    const actualOptions = Object.assign({}, defaults, options);

    const img = loadImage('./assets/cartDemo.png');
    const gravity = actualOptions.gravity;

    this.update = true;
    this.finished = false;

    this.ramp = new Ramp(
        actualOptions.rampHeightLeft,
        actualOptions.middlePathLength,
        actualOptions.friction,
        actualOptions.rampHeightRight,
        actualOptions.radius,
        actualOptions.rampColor
    );
    this.body = new Body(new p5.Vector(0,0), actualOptions.mass);
    this.railGuide = new RailGuide(this.body, this.ramp.vertices);
    this.cart = new CartDrawing(this.body, img);
    const cartHeight = this.ramp.lowestPoint - this.body.position.y;
    this.energy = new Energy(
        this.body.mass,
        gravity,
        actualOptions.springConst,
        cartHeight,
        actualOptions.velocity,
        actualOptions.springLength
    );

    this.body.acceleration = new p5.Vector(0, gravity);
    this.body.listeners.push(this.railGuide.chooseTarget.bind(this.railGuide));
    this.body.updateListeners.push(this.energy.updateEnergy.bind(this.energy));
    this.body.updateListeners.push(this.updateBodyVelocity.bind(this));
    if(actualOptions.cycleFinishedListener){
        this.cycleFinishedListener = actualOptions.cycleFinishedListener;
        this.body.startListeners.push(this.cycleFinishedListener);
    }
};

Exercise.prototype = {
    run: function (width, height) {
        const heightScale = height / this.ramp.height;
        const widthScale = width / this.ramp.width;
        const finalScale = Math.min(heightScale, widthScale);
        const xTranslate = -this.ramp.mostLeftPoint;
        const yTranslate = -this.ramp.highestPoint + height * (1 / finalScale) - this.ramp.height;
        push();
        scale(finalScale);
        translate(xTranslate, yTranslate);
        this.ramp.display();
        if (this.update) {
            this.updateBodyVelocity();
            this.body.update();
            if (this.energy.actualEnergy === 0) {
                this.cycleFinishedListener();
                this.update = false;
                this.finished = true;
            }
        }
        this.cart.display(this.body.position.x, this.body.position.y, this.railGuide.getTrajectory());
        //this.body.display();
        pop();
    },

    pause: function () {
        if (!this.finished) {
            this.update = false;
        }
    },

    play: function () {
        if (!this.finished) {
            this.update = true;
        }
    },

    updateBodyVelocity: function () {
        this.body.velocity = this.energy.updateVelocity(this.ramp.lowestPoint - this.body.position.y, 0);
        this.body.position.y = this.ramp.lowestPoint - this.energy.height;
        if (this.energy.stuck) this.railGuide.chooseTarget();
    },

    finish: function() {
        this.finished = true;
        this.update = false;
    }
};