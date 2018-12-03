module.exports = {
  id: {},
  title: {
    show: true
  },
  licenceHolder: {
    show: true,
    sort: 'licenceHolder.lastName',
    accessor: 'licenceHolder.name',
    title: 'Licence holder'
  },
  licenceNumber: {
    show: true,
    title: 'Licence number'
  },
  expiryDate: {
    show: true,
    title: 'Expiry date'
  }
};
