var Engine = Matter.Engine,
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
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1024,
        height: 768
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var terrain;

$.get('./svg/simple-ramp.svg').done(function(data) {
    var vertexSets = [];

    $(data).find('path').each(function(i, path) {
        vertexSets.push(Svg.pathToVertices(path, 30));
    });

    terrain = Bodies.fromVertices(0, 768, vertexSets, {
        isStatic: true,
        render: {
            fillStyle: '#2e2b44',
            strokeStyle: '#2e2b44',
            lineWidth: 1
        }
    }, true);

    Body.setPosition(terrain, {
        x: -terrain.bounds.min.x,
        y: -terrain.bounds.min.y + 768
    });

    World.add(world, terrain);

});

// add mouse control
var mouse = Mouse.create(render.canvas),
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