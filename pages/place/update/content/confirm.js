const { merge } = require('lodash');
const commonContent = require('../../content');
const baseContent = require('./');

module.exports = merge({}, commonContent, baseContent, {
  fields: {
    declaration: {
      title: 'Please confirm that you understand',
      label: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
    }
  },
  subtitle: 'Amend approved area'
});
