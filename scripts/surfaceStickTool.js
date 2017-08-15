/**
 * @author Tomas Perez Molina
 */

const getCollisionVector = function(pair) {
    const collision = pair.collision;

    let finalNormalX = pair.activeContacts[0].vertex.x,
        finalNormalY = pair.activeContacts[0].vertex.y,
        startNormalX,
        startNormalY;

    if (pair.activeContacts.length === 2) {
        finalNormalX = (pair.activeContacts[0].vertex.x + pair.activeContacts[1].vertex.x) / 2;
        finalNormalY = (pair.activeContacts[0].vertex.y + pair.activeContacts[1].vertex.y) / 2;
    }

    if (collision.bodyB === collision.supports[0].body || collision.bodyA.isStatic === true) {
        startNormalX = finalNormalX - collision.normal.x * 8;
        startNormalY = finalNormalY - collision.normal.y * 8;
    } else {
        startNormalX = finalNormalX + collision.normal.x * 8;
        startNormalY = finalNormalY + collision.normal.y * 8;
    }

    return {
        x: finalNormalX - startNormalX,
        y: finalNormalY - startNormalY
    };
};



const angleBetweenVectors = function (u, v) {
    const numerator = Matter.Vector.dot(u, v);
    const denominator = vector.angleBetween()

};
