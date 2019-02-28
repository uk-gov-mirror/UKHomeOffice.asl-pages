const { pick } = require('lodash');

const schema = {
  id: {},
  title: {
    show: true
  },
  status: {
    show: true
  },
  licenceHolder: {
    show: true,
    sort: 'licenceHolder.lastName'
  },
  licenceNumber: {
    show: true
  },
  expiryDate: {
    show: true
  },
  submittedAt: {
    show: true
  },
  updatedAt: {
    show: true
  },
  granted: {
    show: true
  },
  draft: {
    show: true
  },
  submitted: {
    show: true
  }
};

const getSchema = status => {
  return status === 'inactive'
    ? pick(schema, 'id', 'title', 'licenceHolder', 'updatedAt')
    : pick(schema, 'id', 'title', 'licenceHolder', 'licenceNumber', 'expiryDate');
};

getSchema.schema = schema;

module.exports = getSchema;