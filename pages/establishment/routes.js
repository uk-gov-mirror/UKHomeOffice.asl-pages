const read = require('./read');
const pdf = require('./pdf');
const update = require('./update');
const dashboard = require('./dashboard');
const apply = require('./apply');
const licenceFees = require('./licence-fees');

module.exports = {
  dashboard: {
    path: '',
    permissions: 'establishment.read',
    router: dashboard
  },
  read: {
    path: '/details',
    permissions: 'establishment.read',
    router: read
  },
  pdf: {
    path: '/details/pdf',
    router: pdf,
    permissions: 'establishment.pdf'
  },
  update: {
    path: '/details/edit',
    router: update,
    permissions: 'establishment.update'
  },
  apply: {
    path: '/apply',
    router: apply,
    permissions: 'establishment.update'
  },
  fees: {
    path: '/licence-fees',
    router: licenceFees,
    permissions: 'establishment.licenceFees'
  }
};
