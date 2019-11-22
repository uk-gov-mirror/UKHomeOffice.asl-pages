const { merge } = require('lodash');
const read = require('../../read/content');
const standardConditions = require('./standard-conditions');

module.exports = merge({}, read, { standardConditions });
