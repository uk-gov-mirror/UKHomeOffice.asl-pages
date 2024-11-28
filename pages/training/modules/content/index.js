const { merge } = require('lodash');
const trainingModules = require('../../../common/content/training-modules');
const baseContent = require('../../content');

module.exports = merge({}, baseContent, {
  title: '{{#isExemption}}On what grounds is an exemption being requested?{{/isExemption}}{{^isExemption}}Which modules are covered by this certificate?{{/isExemption}}',
  hint: 'The NTCO should email the relevant certificates and supporting evidence to ASRU Licensing: [ASRULicensing@homeoffice.gov.uk](mailto:ASRULicensing@homeoffice.gov.uk)',
  fields: {
    exemptionReason: {
      label: 'Reason for exemption'
    },
    modules: {
      label: '{{#isExemption}}Modules exemption applies to{{/isExemption}}',
      hint: 'Select all that apply',
      options: trainingModules
    }
  },
  errors: {
    exemptionReason: {
      required: 'Add a reason an exemption is required.'
    },
    modules: {
      required: 'You need to select at least one module.',
      definedValues: 'Select modules from the list.'
    }
  },
  buttons: {
    submit: 'Continue'
  }
});
