const content = require('../content');
const { toArray, toBoolean } = require('../../../../lib/utils');
const { uniq } = require('lodash');
const { establishmentCountries } = require('@ukhomeoffice/asl-constants');

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

module.exports = (profiles = []) => {
  const profileAutoCompleteOptions = profiles.map(p => ({ value: p.id, label: `${p.firstName} ${p.lastName}` }));
  return ({
    name: {
      inputType: 'inputText',
      validate: ['required']
    },
    corporateStatus: {
      inputType: 'radioGroup',
      automapReveals: true,
      options: [{
        value: 'corporate',
        label: 'Corporate PEL',
        hint: 'A legal person is responsible. We will contact a representative about any problems.',
        reveal: {
          'legal-responsible-person': {
            inputType: 'fieldset',
            label: 'Enter the individual legally accountable for the corporate entity details',
            fields: {
              legalName: {
                inputType: 'inputText',
                validate: ['required'],
                className: 'smaller',
                class: 'smaller'
              },
              legalPhone: {
                inputType: 'inputText',
                validate: ['required'],
                className: 'smaller'
              },
              legalEmail: {
                inputType: 'inputText',
                validate: ['required']
              }
            }
          },
          nprc: {
            inputType: 'autoComplete',
            options: profileAutoCompleteOptions,
            validate: ['required']
          }
        }
      }, {
        value: 'non-profit',
        label: 'Individual PEL',
        hint: 'A natural person is responsible for this establishment',
        reveal: {
          pelh: {
            inputType: 'autoComplete',
            options: profileAutoCompleteOptions,
            validate: ['required']
          }
        }
      }],
      validate: ['required']
    },
    address: {
      inputType: 'textarea',
      validate: ['required']
    },
    country: {
      inputType: 'radioGroup',
      validate: ['required'],
      options: establishmentCountries
    },
    licences: {
      inputType: 'checkboxGroup',
      automapReveals: true,
      options: licenceOptions.map(option => ({
        value: option,
        label: content.fields.licences.options[option],
        reveal: option === 'procedure' && ({
          isTrainingEstablishment: {
            inputType: 'radioGroup',
            format: toBoolean,
            options: [
              {
                value: true,
                label: 'Yes'
              },
              {
                value: false,
                label: 'No'
              }
            ]
          }
        })
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
  });
};
