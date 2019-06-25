const fields = require('./fields');
const authorisations = require('./authorisations');

module.exports = {
  fields,
  authorisations,
  declarations: {
    title: 'Please confirm that you understand',
    declaration1: 'By submitting this change, I confirm that I also have the consent of the Establishment Licence holder'
  },
  subtitle: 'Amend establishment details',
  errors: {
    declarations: {
      customValidate: 'Please confirm that you understand'
    }
  }
};
