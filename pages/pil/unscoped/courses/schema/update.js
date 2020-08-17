const { pick } = require('lodash');
const schema = require('./');

module.exports = pick(schema, 'title', 'startDate', 'species', 'projectId');
