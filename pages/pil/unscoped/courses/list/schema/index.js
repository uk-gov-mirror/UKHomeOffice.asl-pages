const { pick } = require('lodash');
const schema = require('../../schema');

module.exports = {
  ...pick(schema, 'title', 'startDate'),
  applications: {
    show: true
  },
  licences: {
    show: true
  }
};
