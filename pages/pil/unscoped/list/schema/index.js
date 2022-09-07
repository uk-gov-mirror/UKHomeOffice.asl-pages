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
    omitFromCSV: true
  },
  firstName: {
    title: 'First name',
    show: false,
    toCSVString: (_, row) => row.profile.firstName
  },
  lastName: {
    title: 'Last name',
    show: false,
    toCSVString: (_, row) => row.profile.lastName
  },
  licenceNumber: {
    show: true,
    title: 'Licence number',
    sort: 'profile.pilLicenceNumber'
  },
  status: {
    show: true,
    title: 'Licence status'
  },
  procedures: {
    title: 'Categories',
    toCSVString: concatArray
  },
  species: {
    title: 'Animal types',
    toCSVString: concatArray
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
