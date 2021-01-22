const { pick } = require('lodash');
const baseContent = require('../../../../retrospective-assessment/update/submit/content');

module.exports = {
  title: 'Agree to declaration',
  fields: pick(baseContent.fields, 'ra-awerb-date'),
  ...pick(baseContent, 'errors', 'declaration'),
  buttons: {
    submit: 'Agree and continue'
  }
};
