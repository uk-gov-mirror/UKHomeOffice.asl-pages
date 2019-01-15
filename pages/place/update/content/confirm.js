const { merge } = require('lodash');
const commonContent = require('../../content');
const baseContent = require('./');

module.exports = merge({}, commonContent, baseContent, {
  declarations: {
    title: 'Please confirm that you understand',
    declaration1: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
  },
  subtitle: 'Update premises',
  errors: {
    declarations: {
      customValidate: 'Please confirm that you understand'
    }
  }
});
