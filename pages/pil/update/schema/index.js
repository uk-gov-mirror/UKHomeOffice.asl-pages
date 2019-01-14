const content = require('../content');

module.exports = {
  declarations: {
    inputType: 'checkboxGroup',
    validate: ['required'],
    options: [
      {
        value: 'yes',
        label: content.fields.declaration.yes.label
      }
    ]
  }
};
