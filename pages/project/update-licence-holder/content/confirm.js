const { merge } = require('lodash');
const content = require('./');

module.exports = merge({}, content, {
  title: 'Please review your answers for changing a PPL holder',
  declarations: {
    title: 'Please confirm that you understand',
    declaration1: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
  },
  errors: {
    declarations: {
      customValidate: 'Please confirm that you understand'
    }
  }
});
