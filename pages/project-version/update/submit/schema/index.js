const { omit } = require('lodash');

const getDateField = establishmentName => {
  return {
    inputType: 'inputDate',
    label: `Enter date of application's most recent AWERB review at ${establishmentName}`,
    hint: 'For example, 12 06 2020',
    validate: [
      'required',
      'validDate',
      { dateIsBefore: 'now' }
    ]
  };
};

const getAwerbQuestion = ({ isLegacy, isAmendment, awerbEstablishments }) => {
  let awerbDateFields = {};

  if (isLegacy) {
    awerbDateFields = {
      'awerb-review-date': {
        inputType: 'textarea',
        validate: ['required']
      }
    };
  } else {
    awerbDateFields = awerbEstablishments.reduce((fields, establishment) => {
      return {
        ...fields,
        [`awerb-${establishment.id}`]: getDateField(establishment.name)
      };
    }, {});
  }

  if (!isAmendment) {
    return awerbDateFields;
  }

  return {
    'awerb-exempt': {
      inputType: 'radioGroup',
      validate: ['required'],
      automapReveals: true,
      options: [
        {
          label: 'No',
          value: 'no',
          reveal: {
            ...awerbDateFields
          }
        },
        {
          label: 'Yes',
          value: 'yes',
          reveal: {
            'awerb-no-review-reason': {
              inputType: 'textarea',
              validate: ['required']
            }
          }
        }
      ]
    }
  };
};

const getSchema = ({ isLegacy, isAmendment, isAsru, includeReady, includeAwerb, awerbEstablishments }) => {
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

    schema = {
      ready: readyQuestion,
      ...schema
    };
  }

  // awerb question should always be first if included
  if (includeAwerb) {
    schema = {
      ...getAwerbQuestion({ isLegacy, isAmendment, awerbEstablishments }),
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
