
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Svg = Matter.Svg,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Events = Matter.Events;

// create engine
const engine = Engine.create(),
    world = engine.world;

const canvasHeight = 768;
const canvasWidth = 1024;
// create renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        showVelocity: true,
        showCollisions: true
    }
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
let terrain;

$.get('./svg/ramp.svg').done(data => {
    const vertexSets = [];

    $(data).find('path').each(function(i, path) {
        vertexSets.push(Svg.pathToVertices(path, 30));
    });

    terrain = Bodies.fromVertices(0, 0, vertexSets, {
        isStatic: true,
        render: {
            fillStyle: '#2e2b44',
            strokeStyle: '#2e2b44',
            lineWidth: 1
        },
        friction: 0,
        frictionStatic: 0
    }, true);

    const terrainHeight = terrain.bounds.max.y - terrain.bounds.min.y;

    //Position the terrain on the bottom left
    Body.setPosition(terrain, {
        x: -terrain.bounds.min.x,
        y: -terrain.bounds.min.y + canvasHeight - terrainHeight
    });

    World.add(world, terrain);

});

const cart = new Cart(30, 0, 150, 30, 30);

World.add(world, cart.composite);

//World.add(world, Bodies.rectangle(800, 600, 200, 200, {isStatic: true}));

// add mouse control
const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

let wheelABondingForce = {x: 0, y: 0};
let wheelBBondingForce = {x: 0, y: 0};

//change the velocity of a body when it collides
Events.on(engine, 'collisionActive', function(event) {
    let pairs = event.pairs;
    pairs.forEach(pair => {
        if(pair.isActive && pair.activeContacts.length > 0){
            const collisionVector = getCollisionVector(pair);
            const body = pair.bodyA.isStatic ? pair.bodyB : pair.bodyA;
            if(body === cart.wheelA) wheelABondingForce = Matter.Vector.neg(Matter.Vector.perp(vectorProjectionOnU(collisionVector, body.force)));
            else if (body === cart.wheelB) wheelBBondingForce = Matter.Vector.neg(Matter.Vector.perp(vectorProjectionOnU(collisionVector, body.force)));
        }
    });
});

Events.on(engine, 'beforeUpdate', function(event){
    Body.applyForce(cart.wheelA, cart.wheelA.position, wheelABondingForce);
    Body.applyForce(cart.wheelB, cart.wheelB.position, wheelBBondingForce);
    console.log(cart.wheelA.force);
    console.log(cart.wheelB.force);
});

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);