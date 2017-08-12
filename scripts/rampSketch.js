
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Query = Matter.Query,
    Svg = Matter.Svg,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

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
        showVelocity: true
    }
});

Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
let terrain;

$.get('./svg/ramp.svg').done(function(data) {
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
        friction: 0
    }, true);

    const terrainHeight = terrain.bounds.max.y - terrain.bounds.min.y;

    Body.setPosition(terrain, {
        x: -terrain.bounds.min.x,
        y: -terrain.bounds.min.y + canvasHeight - terrainHeight
    });

    World.add(world, terrain);

});

const cart1 = cart(30, 0, 150, 30, 30);

World.add(world, cart1);

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

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);