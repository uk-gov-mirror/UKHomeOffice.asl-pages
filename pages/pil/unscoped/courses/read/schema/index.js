const { pick } = require('lodash');
const schema = require('../../schema');

module.exports = pick(schema, 'title', 'startDate', 'species', 'projectId', 'projectTitle');
