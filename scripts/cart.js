/**
 * @author Tomas Perez Molina
 */

"use strict";

const Composite = Matter.Composite,
    Constraint = Matter.Constraint;

const Cart = function (xx, yy, width, height, wheelSize) {

    const group = Body.nextGroup(true),
        wheelBase = 20,
        wheelAOffset = -width * 0.5 + wheelBase,
        wheelBOffset = width * 0.5 - wheelBase,
        wheelYOffset = 0;

    this.composite = Composite.create({label: 'Cart'});

    const body = Bodies.rectangle(xx, yy, width, height,
        {
            collisionFilter: {
                group: group
            },
            density: 0.0002,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 0
        }
    );

    this.wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
        id: 'wheelA',
        collisionFilter: {
            group: group
        },
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0
    });


    this.wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
        id: 'wheelB',
        collisionFilter: {
            group: group
        },
        frictionAir: 0,
        friction: 0,
        frictionStatic: 0
    });

    const axelA = Constraint.create({
        bodyB: body,
        pointB: { x: wheelAOffset, y: wheelYOffset },
        bodyA: this.wheelA,
        stiffness: 1,
        length: 0,
        friction: 0,
        frictionAir: 0
    });

    const axelB = Constraint.create({
        bodyB: body,
        pointB: { x: wheelBOffset, y: wheelYOffset },
        bodyA: this.wheelB,
        stiffness: 1,
        length: 0,
        friction: 0,
        frictionAir: 0
    });

    Composite.addBody(this.composite, body);
    Composite.addBody(this.composite, this.wheelA);
    Composite.addBody(this.composite, this.wheelB);
    Composite.addConstraint(this.composite, axelA);
    Composite.addConstraint(this.composite, axelB);
};
