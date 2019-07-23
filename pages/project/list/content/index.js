const { merge } = require('lodash');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  searchText: 'Search by project title, licence holder or licence number',
  buttons: {
    create: 'Apply for project licence',
    upload: 'Upload draft application'
  }
});
