const { merge } = require('lodash');
const baseContent = require('../../../project-version/update/endorse/content');

module.exports = merge({}, baseContent, {
  title: 'Endorse {{type}}',
  buttons: {
    submit: 'Endorse {{type}}'
  }
});
