const { merge } = require('lodash');
const details = require('../../details/content');
const standardConditions = require('./standard-conditions');

module.exports = merge({}, details, { standardConditions });
