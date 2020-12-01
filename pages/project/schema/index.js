const { pick, merge } = require('lodash');

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
  },
  transferredOutDate: {
    show: true
  }
};

const getSchema = status => {
  const inactiveLicenceHolder = { licenceHolder: { label: 'Name' } };

  switch (status) {
    case 'inactive':
      return merge({}, pick(schema, 'id', 'title', 'licenceHolder', 'status', 'updatedAt'), inactiveLicenceHolder);
    case 'inactive-statuses':
      return merge({}, pick(schema, 'id', 'title', 'licenceHolder', 'licenceNumber', 'status'), inactiveLicenceHolder);
    default:
      return pick(schema, 'id', 'title', 'licenceHolder', 'licenceNumber', 'status', 'expiryDate');
  }
};

getSchema.schema = schema;

module.exports = getSchema;
