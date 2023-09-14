const { merge } = require('lodash');
const baseContent = require('./base');
const tasks = require('../../content/tasks');

module.exports = merge({}, baseContent, {
  tasks,
  title: 'Upload harm benefit analysis file',
  intro: `To {{action}} this licence you must upload the PPL assessment form containing the harm benefit analysis (HBA) for this {{type}}.
    
  The HBA will be visible to ASRU only.`,
  fields: {
    upload: {
      label: 'Upload {{#model.hbaToken}}new {{/model.hbaToken}}file',
      hint: "You can review and confirm the file you've chosen before {{model.action}}ing the licence. You can also update the file in the future, if required."
    },
    hba: {
      label: 'Selected harm benefit analysis file'
    }
  },
  errors: {
    upload: {
      fileRequired: 'Select a harm benefit analysis file',
      maxSize: 'The harm benefit analysis file should be smaller than 15MB',
      ext: 'The selected file must be a .doc, .docx or .pdf'
    }
  }
});
