const { merge } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');

module.exports = merge({}, baseContent, {
  tasks,
  title: 'Confirm harm benefit analysis file',

  fields: {
    establishment: {
      label: 'Establishment:'
    },
    applicant: {
      label: 'Applicant:'
    },
    hbaFilename: {
      label: 'Selected harm benefit analysis file:',
      download: 'Download file'
    },
    confirmHba: {
      label: 'What do you want to do?',
      options: {
        yes: 'Confirm and continue to grant licence',
        no: 'Discard selected file and choose another'
      }
    }
  },
  warning:
    'Once confirmed, this file will become the single source of truth of the harm benefit analysis for this application',
  errors: {
    confirmHba: {
      required: 'Select an option',
      definedValues: 'Select from one of the provided options'
    }
  }
});
