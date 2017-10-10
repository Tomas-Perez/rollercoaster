/**
 * 100 pixels == 1 meter
 * 60 frames = 1 second
 * @author Tomas Perez Molina
 */

const UnitConverter = (function () {
    const self = {};

    const meterToPixel = 100;
    const meterSecToPixelFrame = 1 / 6;
    const meterSecSqToPixelFrameSq = 1 / 36;
    const kgToVirtualMass = 1;
    const constSpringToVirtualConst = 1;
    const frictionConstToVirtualConst = 1;
    const jouleToVirtualJoule = 1 / 6;

    const pixelToMeter = 1 / meterToPixel;
    const pixelFrameToMeterSec = 1 / meterSecToPixelFrame;
    const pixelFrameSqToMeterSecSq = 1 / meterSecSqToPixelFrameSq;
    const virtualMassToKg = 1 / kgToVirtualMass;
    const virtualConstToConstSpring = 1 / constSpringToVirtualConst;
    const virtualConstToFrictionConst = 1 / frictionConstToVirtualConst;
    const virtualJouleToJoule = 1 / jouleToVirtualJoule;

    self.initVarsConvertToVirtual = function (variables = {}) {
        const result = {
            rampHeightLeft: self.convertLongitudeToVirtual(variables.rampHeightLeft),
            middlePathLength: self.convertLongitudeToVirtual(variables.middlePathLength),
            friction: self.convertFrictionToVirtual(variables.friction),
            rampHeightRight: self.convertLongitudeToVirtual(variables.rampHeightRight),
            radius: self.convertLongitudeToVirtual(variables.radius),
            gravity: self.convertAccToVirtual(variables.gravity),
            springConst: self.convertSpringConstToVirtual(variables.springConst),
            velocity: self.convertVelocityToVirtual(variables.velocity),
            springLength: self.convertLongitudeToVirtual(variables.springLength),
            mass: self.convertMassToVirtual(variables.mass),
        };
        cleanObject(result);
        return result;
    };

    self.energiesConvertToVirtual = function (energies) {
        const result = {
            kinetic: self.convertEnergyToVirtual(energies.kinetic),
            elastic: self.convertEnergyToVirtual(energies.elastic),
            potential: self.convertEnergyToVirtual(energies.potential),
            initial: self.convertEnergyToVirtual(energies.initial),
            current: self.convertEnergyToVirtual(energies.current)
        };
        cleanObject(result);
        return result;
    };

    self.initVarsConvertToReal = function (variables) {
        const result = {
            rampHeightLeft: self.convertLongitudeToReal(variables.rampHeightLeft),
            middlePathLength: self.convertLongitudeToReal(variables.middlePathLength),
            friction: self.convertFrictionToReal(variables.friction),
            rampHeightRight: self.convertLongitudeToReal(variables.rampHeightRight),
            radius: self.convertLongitudeToReal(variables.radius),
            gravity: self.convertAccToReal(variables.gravity),
            springConst: self.convertSpringConstToReal(variables.springConst),
            velocity: self.convertVelocityToReal(variables.velocity),
            springLength: self.convertLongitudeToReal(variables.springLength),
            mass: self.convertMassToReal(variables.mass),
        };
        cleanObject(result);
        return result;
    };

    self.energiesConvertToReal = function (energies) {
        const result = {
            kinetic: self.convertEnergyToReal(energies.kinetic),
            elastic: self.convertEnergyToReal(energies.elastic),
            potential: self.convertEnergyToReal(energies.potential),
            initial: self.convertEnergyToReal(energies.initial),
            current: self.convertEnergyToReal(energies.current)
        };
        cleanObject(result);
        return result;
    };

    const convert = (x, ratio) => {
        return x * ratio;
    };

    const cleanObject = obj => Object.keys(obj).forEach(key => obj[key] === undefined || isNaN(obj[key]) ? delete obj[key] : '');


    self.convertVelocityToVirtual = x => convert(x, meterSecToPixelFrame);
    self.convertLongitudeToVirtual = x => convert(x, meterToPixel);
    self.convertFrictionToVirtual = x => convert(x, frictionConstToVirtualConst);
    self.convertAccToVirtual = x => convert(x, meterSecSqToPixelFrameSq);
    self.convertMassToVirtual = x => convert(x, kgToVirtualMass);
    self.convertSpringConstToVirtual = x => convert(x, constSpringToVirtualConst);
    self.convertEnergyToVirtual = x => convert(x, jouleToVirtualJoule);

    self.convertVelocityToReal = x => convert(x, pixelFrameToMeterSec);
    self.convertLongitudeToReal = x => convert(x, pixelToMeter);
    self.convertFrictionToReal = x => convert(x, virtualConstToFrictionConst);
    self.convertAccToReal = x => convert(x, pixelFrameSqToMeterSecSq);
    self.convertMassToReal = x => convert(x, virtualMassToKg);
    self.convertSpringConstToReal = x => convert(x, virtualConstToConstSpring);
    self.convertEnergyToReal = x => convert(x, virtualJouleToJoule);

    return self;
}());