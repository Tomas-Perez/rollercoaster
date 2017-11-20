const Exercise = function(variables = {}, cycleFinishedCallback){
    console.log(variables);
    const defaults = {
        rampHeightLeft: 500,
        middlePathLength: 0,
        friction: 0,
        rampHeightRight: 500,
        radius: 0,
        gravity: 10/36, //if(1 pixel == 1cm) 1 == 36 m/s^2
        springConst: 0,
        velocity: 0,
        springLength: 0,
        startSpring: false,
        endSpring: false,
        mass: 50,
    };

    this.variables = Object.assign({}, defaults, variables);

    console.log(this.variables);
    const img = loadImage('./assets/cartDemo.png');
    const gravity = this.variables.gravity;

    this.update = true;
    this.finished = false;

    this.ramp = new Ramp(
        this.variables.rampHeightLeft,
        this.variables.middlePathLength,
        this.variables.friction,
        this.variables.rampHeightRight,
        this.variables.radius,
        '#795548'
    );
    this.body = new Body(new p5.Vector(0,0), this.variables.mass);
    this.railGuide = new RailGuide(this.body, this.ramp.vertices);
    this.cart = new CartDrawing(this.body, img);
    const cartHeight = this.ramp.lowestPoint - this.body.position.y;
    this.energy = new Energy(
        this.body.mass,
        gravity,
        this.variables.springConst,
        cartHeight,
        this.variables.velocity,
        this.variables.springLength
    );

    this.body.acceleration = new p5.Vector(0, gravity);
    this.body.listeners.push(this.railGuide.chooseTarget.bind(this.railGuide));
    this.body.updateListeners.push(this.energy.updateEnergy.bind(this.energy));
    this.body.updateListeners.push(this.updateBodyVelocity.bind(this));
    this.cycleFinishedListener = cycleFinishedCallback;
    this.body.startListeners.push(this.cycleFinishedListener);
    if(this.variables.startSpring){
        const start = this.railGuide.getStart();
        this.spring = new Spring(start.x, start.y, 100, 50);
    }
    else if(this.variables.endSpring){
        const end = this.railGuide.getEnd();
        this.spring = new Spring(end.x, end.y, 100, 50, false);
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
        const bbox = this.cart.display(this.body.position.x, this.body.position.y, this.railGuide.getTrajectory());
        if(this.spring){
          this.spring.compress(bbox);
          this.spring.display();
        }

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
        this.body.velocity = this.energy.updateVelocity(this.ramp.lowestPoint - this.body.position.y, this.spring? this.spring.getDeltaLength() : 0);
        this.body.position.y = this.ramp.lowestPoint - this.energy.height;
        if (this.energy.stuck) this.railGuide.chooseTarget();
    },

    finish: function() {
        this.finished = true;
        this.update = false;
    }
};