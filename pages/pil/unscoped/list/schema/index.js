const moment = require('moment');
const { dateFormat } = require('../../../../../constants');

function formatDate(date) {
  return date ? moment(date).format(dateFormat.long) : '-';
}

function concatArray(arr) {
  return (arr || []).join(', ');
}

module.exports = {
  id: {
    title: 'ID'
  },
  profile: {
    show: true,
    title: 'Licence holder',
    sort: 'profile.lastName',
    toCSVString: licenceHolder => `${licenceHolder.firstName} ${licenceHolder.lastName}`
  },
  licenceNumber: {
    show: true,
    title: 'Licence number',
    sort: 'profile.pilLicenceNumber'
  },
  procedures: {
    title: 'Categories',
    toCSVString: concatArray
  },
  species: {
    title: 'Animal types',
    toCSVString: concatArray
  },
  status: {
    title: 'Licence status'
  },
  issueDate: {
    title: 'Grant date',
    show: true,
    toCSVString: formatDate
  },
  updatedAt: {
    title: 'Last amended date',
    toCSVString: formatDate
  },
  reviewDate: {
    show: true,
    title: '5 year PIL review due date',
    toCSVString: formatDate
  },
  reviewStatus: {
    show: true,
    sortable: false,
    omitFromCSV: true
  }
};
