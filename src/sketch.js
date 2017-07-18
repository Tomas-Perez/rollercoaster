/**
 * @author Tomas Perez Molina
 */

"use strict";

/*
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800
    }
});

// create two boxes and a ground

var slope = Bodies.rectangle(400, 500, 1200, 25, { isStatic: true });
Body.rotate(slope, Math.PI / 4);

var leftWall = Bodies.rectangle(0, 400, 15, 800, { isStatic: true });
var rightWall = Bodies.rectangle(800, 400, 15, 800, { isStatic: true });
var topWall = Bodies.rectangle(400, 0, 800, 15, { isStatic: true });
var ground = Bodies.rectangle(400, 800, 800, 15, { isStatic: true });
var box = Bodies.rectangle(20, 20, 40, 40, { isStatic: true });
var car = Composites.car(150, 100, 50, 30, 40);


var spring = Constraint.create({
    bodyA: car.bodies[0],
    bodyB: box,
    length: 150,
    stiffness: 0.001
});

// add all of the bodies to the world
World.add(engine.world, [box, leftWall, rightWall, topWall, ground, slope, car, spring]);

var group = Body.nextGroup(true);

var ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x, y, 50, 20, { collisionFilter: { group: group } });
});

Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
Composite.add(ropeA, Constraint.create({
    bodyB: ropeA.bodies[0],
    pointB: { x: -25, y: 0 },
    pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
    stiffness: 0.5
}));

World.add(engine.world, ropeA);

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



World.add(engine.world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;
*/

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
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
var terrain;

$.get('./svg/ramp.svg').done(function(data) {
    var vertexSets = [];

    $(data).find('path').each(function(i, path) {
        vertexSets.push(Svg.pathToVertices(path, 30));
    });

    terrain = Bodies.fromVertices(400, 350, vertexSets, {
        isStatic: true,
        render: {
            fillStyle: '#2e2b44',
            strokeStyle: '#2e2b44',
            lineWidth: 1
        }
    }, true);

    World.add(world, terrain);

    var bodyOptions = {
        frictionAir: 0,
        friction: 0.0001,
        restitution: 0.6
    };

    World.add(world, Composites.stack(80, 100, 20, 20, 10, 10, function(x, y) {
        if (Query.point([terrain], { x: x, y: y }).length === 0) {
            return Bodies.polygon(x, y, 5, 12, bodyOptions);
        }
    }));
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

