const { pick } = require('lodash');
const schema = require('./');

module.exports = pick(schema, 'title', 'coursePurpose', 'startDate', 'species', 'projectId');
