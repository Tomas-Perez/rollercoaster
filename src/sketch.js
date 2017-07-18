/**
 * @author Tomas Perez Molina
 */

"use strict";


// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites;

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

var slope = Bodies.rectangle(400, 500, 1000, 25, { isStatic: true });
var ground = Bodies.rectangle(400, 800, 810, 60, { isStatic: true });
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);

Body.rotate(slope, Math.PI / 4);

// add all of the bodies to the world
World.add(engine.world, [ground, slope, boxA, boxB]);
var scale = 0.9;
World.add(engine.world, Composites.car(150, 100, 150 * scale, 30 * scale, 30 * scale));

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

