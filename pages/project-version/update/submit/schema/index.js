const { omit, isEmpty } = require('lodash');
const content = require('../content');

const conditionalRequired = (field, expected = 'Yes') => (value, model) => {
  if (model[field] === expected) {
    return !isEmpty(value);
  }
  return true;
};

const getAwerbQuestion = isAmendment => {
  const awerbQuestion = {
    inputType: 'radioGroup',
    inline: true,
    className: 'smaller',
    automapReveals: true,
    options: [
      {
        value: 'Yes',
        label: 'Yes',
        reveal: {
          'awerb-review-date': {
            inputType: 'textarea',
            label: content.fields['awerb-review-date'].label,
            validate: [
              {
                customValidate: conditionalRequired('awerb')
              }
            ]
          }
        }
      },
      {
        value: 'Not yet',
        label: 'Not yet'
      }
    ],
    validate: ['required']
  };

  if (isAmendment) {
    awerbQuestion.options[1] = {
      label: 'No',
      value: 'No',
      reveal: {
        'awerb-no-review-reason': {
          label: content.fields['awerb-no-review-reason'].label,
          inputType: 'textarea',
          validate: [
            {
              customValidate: conditionalRequired('awerb', 'No')
            }
          ]
        }
      }
    };
  }

  return awerbQuestion;
};

const readyQuestion = {
  inputType: 'radioGroup',
  inline: true,
  className: 'smaller',
  options: [
    {
      value: 'Yes',
      label: 'Yes'
    },
    {
      value: 'No',
      label: 'No'
    }
  ],
  validate: ['required']
};

const getSchema = (isAmendment, isAsru, includeReady, includeAwerb) => {
  let schema = {
    comments: {
      inputType: 'textarea',
      validate: ['required']
    },
    comment: {
      inputType: 'textarea'
    }
  };

  if (isAsru) {
    return schema; // no additional questions required
  }

  if (includeReady) {
    schema = {
      ready: readyQuestion,
      ...schema
    };
  }

  // awerb question should always be first if included
  if (includeAwerb) {
    schema = {
      awerb: getAwerbQuestion(isAmendment),
      ...schema
    };
  }

  if (isAmendment) {
    return schema;
  }

  return omit(schema, 'comments');
};

module.exports = {
  getAwerbQuestion,
  getSchema
};
