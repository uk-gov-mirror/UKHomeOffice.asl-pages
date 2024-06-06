const { pick, merge } = require('lodash');
const { dateFormat } = require('../../../constants');
const { isValid: isValidDate, toDate, format: dateFormatter } = require('date-fns');

function formatCSVDate(date) {
  return isValidDate(toDate(date)) ? dateFormatter(date, dateFormat.long) : '-';
}

const schema = {
  id: {},
  title: {
    show: true,
    title: 'Licence title'
  },
  status: {
    show: true,
    title: 'Licence status'
  },
  licenceHolder: {
    show: true,
    sort: 'licenceHolder.lastName',
    title: 'Licence holder',
    toCSVString: licenceHolder => `${licenceHolder.firstName} ${licenceHolder.lastName}`
  },
  licenceNumber: {
    show: true,
    title: 'Licence number'
  },
  expiryDate: {
    show: true,
    title: 'Expiry date',
    toCSVString: formatCSVDate
  },
  submittedAt: {
    show: true
  },
  updatedAt: {
    show: true
  },
  amendedDate: {
    title: 'Last amended date',
    toCSVString: formatCSVDate
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
  },
  establishment: {
    toCSVString: est => est.name,
    title: 'Primary establishment'
  },
  species: {
    title: 'Animal types',
    toCSVString: species => species && species.length ? species.join(', ') : '-'
  },
  issueDate: {
    title: 'Grant date',
    toCSVString: formatCSVDate
  },
  raDate: {
    show: true,
    title: 'RA due date',
    toCSVString: formatCSVDate
  }
};

const getSchema = (status, csv) => {
  const inactiveLicenceHolder = { licenceHolder: { label: 'Name' } };

  if (csv) {
    return merge({}, pick(schema, 'licenceNumber', 'title', 'licenceHolder', 'establishment', 'status', 'issueDate', 'amendedDate', 'expiryDate', 'species', 'raDate'));
  }

  switch (status) {
    case 'inactive':
      return merge({}, pick(schema, 'id', 'title', 'licenceHolder', 'status', 'updatedAt'), inactiveLicenceHolder);
    case 'inactive-statuses':
      return merge({}, pick(schema, 'id', 'title', 'licenceHolder', 'licenceNumber', 'status', 'raDate'), inactiveLicenceHolder);
    default:
      return pick(schema, 'id', 'title', 'licenceHolder', 'licenceNumber', 'status', 'expiryDate');
  }
};

getSchema.schema = schema;

module.exports = getSchema;
