const { omit, pick, isEmpty } = require('lodash');
const content = require('../content');

const conditionalRequired = (field, expected = 'Yes') => (value, model) => {
  if (model[field] === expected) {
    return !isEmpty(value);
  }
  return true;
};

const getSchema = (type, isAsru, openTask) => {
  const schema = {
    awerb: {
      inputType: 'radioGroup',
      inline: true,
      className: 'smaller',
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
    },
    ready: {
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
    },
    comments: {
      inputType: 'textarea',
      validate: ['required']
    },
    comment: {
      inputType: 'textarea'
    }
  };

  if (isAsru) {
    return pick(schema, 'comments', 'comment');
  }

  if (type === 'amendment') {
    schema.awerb.options[1] = {
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

    return omit(schema, 'ready');
  }

  if (!openTask) {
    return omit(schema, 'comments', 'ready');
  }

  return omit(schema, 'comments');
};

module.exports = getSchema;
