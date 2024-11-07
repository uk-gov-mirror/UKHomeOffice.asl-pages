const { pick } = require('lodash');
const schema = require('../../schema');

module.exports = pick(schema, 'title', 'coursePurpose', 'startDate', 'species', 'projectId', 'projectTitle');
