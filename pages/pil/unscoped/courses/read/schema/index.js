const { pick } = require('lodash');
const schema = require('../../schema');

module.exports = pick(schema, 'projectTitle', 'startDate', 'species', 'projectId');
