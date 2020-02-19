const { merge } = require('lodash');
const commonContent = require('../../../common/content');
const read = require('../../read/content');
const standardConditions = require('./standard-conditions');

module.exports = merge({}, commonContent, read, { standardConditions });
