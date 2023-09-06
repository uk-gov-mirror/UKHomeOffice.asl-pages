const { merge } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');

module.exports = merge({}, baseContent, {
  tasks,
  title: 'Confirm HBA file',

  fields: {
    establishment: {
      label: 'Establishment:'
    },
    applicant: {
      label: 'Applicant:'
    },
    hbaFilename: {
      label: 'Selected HBA file:',
      download: 'Download file'
    },
    confirmHba: {
      label: 'What do you want to do?',
      options: {
        yes: 'Confirm and continue to grant licence',
        yesAmend: 'Confirm and continue to amend licence',
        no: 'Discard selected file and choose another'
      }
    }
  },
  warning:
    'Once confirmed, this HBA file in ASPeL (not SharePoint) will be the single point of reference for this application, for future assessment and audit purposes',
  errors: {
    confirmHba: {
      required: 'Select an option',
      definedValues: 'Select from one of the provided options'
    }
  }
});
