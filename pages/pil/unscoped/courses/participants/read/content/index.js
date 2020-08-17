const { merge } = require('lodash');
const pilContent = require('../../../../../read/content');
const courseContent = require('../../../read/content');

module.exports = merge({}, pilContent, courseContent);
