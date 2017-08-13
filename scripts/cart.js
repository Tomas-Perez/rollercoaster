/**
 * @author Tomas Perez Molina
 */

"use strict";

const composite = Matter.Composite,
    constraint = Matter.Constraint;

const cart = function(xx, yy, width, height, wheelSize) {
    const group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

    const cart = composite.create({label: 'Cart'}),
        body = Bodies.rectangle(xx, yy, width, height, {
            collisionFilter: {
                group: group
            },
            density: 0.0002,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 0
        });

    const wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group
        },
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0
    });

    const wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
        collisionFilter: {
            group: group
        },
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0
    });

    const axelA = constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: wheelA,
        stiffness: 1,
        length: 0
    });

    const axelB = constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: wheelB,
        stiffness: 1,
        length: 0
    });

    composite.addBody(cart, body);
    composite.addBody(cart, wheelA);
    composite.addBody(cart, wheelB);
    composite.addConstraint(cart, axelA);
    composite.addConstraint(cart, axelB);

    return cart;
};
