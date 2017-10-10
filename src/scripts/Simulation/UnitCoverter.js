/**
 * 100 pixels == 1 meter
 * 60 frames = 1 second
 * @author Tomas Perez Molina
 */

const meterToPixel = 100;
const meterSecToPixelFrame = 1/6;
const meterSecSqToPixelFrameSq = 1/36;
const kgToVirtualMass = 1;
const constSpringToVirtualConst = 1;
const frictionConstToVirtualConst = 1;
const jouleToVirtualJoule = 1/6;

const pixelToMeter = 1/meterToPixel;
const pixelFrameToMeterSec = 1/meterSecToPixelFrame;
const pixelFrameSqToMeterSecSq = 1/meterSecSqToPixelFrameSq;
const virtualMassToKg = 1/kgToVirtualMass;
const virtualConstToConstSpring = 1/constSpringToVirtualConst;
const virtualConstToFrictionConst = 1/frictionConstToVirtualConst;
const virtualJouleToJoule = 1/jouleToVirtualJoule;

const initVarsConvertToVirtual = function(variables = {}){
    const result = {
        rampHeightLeft: convertLongitudeToVirtual(variables.rampHeightLeft),
        middlePathLength: convertLongitudeToVirtual(variables.middlePathLength),
        friction: convertFrictionToVirtual(variables.friction),
        rampHeightRight: convertLongitudeToVirtual(variables.rampHeightRight),
        radius: convertLongitudeToVirtual(variables.radius),
        gravity: convertAccToVirtual(variables.gravity),
        springConst: convertSpringConstToVirtual(variables.springConst),
        velocity: convertVelocityToVirtual(variables.velocity),
        springLength: convertLongitudeToVirtual(variables.springLength),
        mass: convertMassToVirtual(variables.mass),
    };
    cleanObject(result);
    return result;
};

const energiesConvertToVirtual = function(energies){
    const result = {
        kinetic: convertEnergyToVirtual(energies.kinetic),
        elastic: convertEnergyToVirtual(energies.elastic),
        potential: convertEnergyToVirtual(energies.potential),
        initial: convertEnergyToVirtual(energies.initial),
        current: convertEnergyToVirtual(energies.current)
    };
    cleanObject(result);
    return result;
};

const initVarsConvertToReal = function(variables){
    const result = {
        rampHeightLeft: convertLongitudeToReal(variables.rampHeightLeft),
        middlePathLength: convertLongitudeToReal(variables.middlePathLength),
        friction: convertFrictionToReal(variables.friction),
        rampHeightRight: convertLongitudeToReal(variables.rampHeightRight),
        radius: convertLongitudeToReal(variables.radius),
        gravity: convertAccToReal(variables.gravity),
        springConst: convertSpringConstToReal(variables.springConst),
        velocity: convertVelocityToReal(variables.velocity),
        springLength: convertLongitudeToReal(variables.springLength),
        mass: convertMassToReal(variables.mass),
    };
    cleanObject(result);
    return result;
};

const energiesConvertToReal = function(energies){
    const result = {
        kinetic: convertEnergyToReal(energies.kinetic),
        elastic: convertEnergyToReal(energies.elastic),
        potential: convertEnergyToReal(energies.potential),
        initial: convertEnergyToReal(energies.initial),
        current: convertEnergyToReal(energies.current)
    };
    cleanObject(result);
    return result;
};

const convert = (x, ratio) => {
    return x * ratio;
};

const cleanObject = obj => Object.keys(obj).forEach(key => obj[key] === undefined || isNaN(obj[key])? delete obj[key] : '');


const convertVelocityToVirtual = x => convert(x, meterSecToPixelFrame);
const convertLongitudeToVirtual = x => convert(x, meterToPixel);
const convertFrictionToVirtual = x => convert(x, frictionConstToVirtualConst);
const convertAccToVirtual = x => convert(x, meterSecSqToPixelFrameSq);
const convertMassToVirtual = x => convert(x, kgToVirtualMass);
const convertSpringConstToVirtual = x => convert(x, constSpringToVirtualConst);
const convertEnergyToVirtual = x => convert(x, jouleToVirtualJoule);

const convertVelocityToReal = x => convert(x, meterSecToPixelFrame);
const convertLongitudeToReal = x => convert(x, pixelToMeter);
const convertFrictionToReal = x => convert(x, virtualConstToFrictionConst);
const convertAccToReal = x => convert(x, pixelFrameSqToMeterSecSq);
const convertMassToReal = x => convert(x, virtualMassToKg);
const convertSpringConstToReal = x => convert(x, virtualConstToConstSpring);
const convertEnergyToReal = x => convert(x, virtualJouleToJoule);
