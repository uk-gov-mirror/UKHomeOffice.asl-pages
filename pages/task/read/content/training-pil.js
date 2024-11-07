const { merge } = require('lodash');
const baseContent = require('./pil');
const fields = require('../../../pil/unscoped/courses/content/fields');

module.exports = merge({}, baseContent, {
  fields,
  'sticky-nav': {
    applicant: 'Applicant',
    procedures: 'Procedures',
    trainingNeed: 'Higher education or training outcomes',
    otherNotes: 'Other notes'
  },
  'applicant-over-18': 'Applicant over 18?'
});
