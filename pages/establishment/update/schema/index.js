const content = require('../content');
const { toArray } = require('../../../../lib/utils');
const { uniq } = require('lodash');

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
    getValue: model => licenceOptions.filter(licence => model[licence]),
    format: toArray,
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
    getValue: model => uniq((model.authorisations || []).map(authorisation => authorisation.type)),
    format: toArray,
    nullValue: [],
    showDiff: false
  },
  comments: {
    inputType: 'textarea',
    validate: 'required',
    showDiff: false
  }
};
