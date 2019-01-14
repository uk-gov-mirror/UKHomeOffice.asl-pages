const content = require('../update/content/confirm');

module.exports = {
  declarations: {
    inputType: 'checkboxGroup',
    validate: ['required'],
    options: [
      {
        label: content.declarations.declaration1,
        value: 'declaration-1'
      }
    ]
  }
};
