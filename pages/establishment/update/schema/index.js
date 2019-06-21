const content = require('../content');

const licenceOptions = ['supplying', 'breeding', 'procedure'];
const authorisationTypeOptions = ['killing', 'rehomes'];

const reveal = {
  method: {
    inputType: 'textarea'
  },
  description: {
    inputType: 'textarea'
  }
};

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
  authorisationTypes: {
    inputType: 'checkboxGroup',
    options: authorisationTypeOptions.map(option => ({
      value: option,
      label: content.fields.authorisationTypes.options[option],
      reveal
    })),
    validate: [
      {
        definedValues: authorisationTypeOptions
      }
    ],
    nullValue: [],
    showDiff: false
  }
};
