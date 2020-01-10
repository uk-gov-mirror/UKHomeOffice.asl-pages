const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: 'Licence fees overview',
  fees: {
    overview: {
      establishment: {
        title: 'Establishment licence',
        fee: 'Establishment licence fee'
      },
      personal: {
        title: 'Personal licences',
        count: 'Number of licences held',
        transfers: 'Number of licences transferred',
        fee: 'Fee per licence',
        total: 'Fee for all personal licences'
      },
      total: {
        title: 'Fee for all personal and establishment licences',
        fee: 'Total fee'
      }
    }
  }
});
