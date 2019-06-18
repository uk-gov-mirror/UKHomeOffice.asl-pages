const content = require('../content');

const licenceOptions = ['supplying', 'breeding', 'procedure'];
const authorisationOptions = ['killing', 'rehomes'];

module.exports = {
  name: {
    inputType: 'inputText',
    validate: ['required']
  },
  address: {
    inputType: 'inputText',
    validate: ['required']
  },
  licences: {
    inputType: 'checkboxGroup',
    options: licenceOptions.map(option => ({
      value: option,
      label: content.fields.licences.options[option]
    })),
    validate: [
      {
        definedValues: licenceOptions
      }
    ],
    nullValue: []
  },
  authorisations: {
    inputType: 'checkboxGroup',
    options: authorisationOptions.map(option => ({
      value: option,
      label: content.fields.authorisations.options[option]
    })),
    validate: [
      {
        definedValues: authorisationOptions
      }
    ],
    nullValue: []
  }
};
