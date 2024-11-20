const {moduleCodes} = require('@ukhomeoffice/asl-constants');
const {zipObject} = require('lodash');

// Array to object with values equal to the keys
const trainingModules = zipObject(moduleCodes, moduleCodes);
trainingModules.PILF = 'PILF (prolonged anaesthesia without surgical technique)';

module.exports = trainingModules;
