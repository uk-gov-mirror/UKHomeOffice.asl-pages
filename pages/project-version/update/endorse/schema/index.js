const { omit } = require('lodash');
const { toBoolean } = require('../../../../../lib/utils');

const getDateField = establishmentName => {
  return {
    meta: true,
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

const getAwerbQuestion = ({ isLegacy, canBeAwerbExempt, awerbEstablishments }) => {
  let awerbDateFields = {};

  if (isLegacy) {
    awerbDateFields = {
      'awerb-review-date': {
        meta: true,
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

  if (!canBeAwerbExempt) {
    return awerbDateFields;
  }

  return {
    'awerb-exempt': {
      meta: true,
      inputType: 'radioGroup',
      validate: ['required'],
      automapReveals: true,
      format: toBoolean,
      options: [
        {
          value: false,
          reveal: {
            ...awerbDateFields
          }
        },
        {
          value: true,
          reveal: {
            'awerb-no-review-reason': {
              meta: true,
              inputType: 'textarea',
              validate: ['required']
            }
          }
        }
      ]
    }
  };
};

const getSchema = ({ isLegacy, isAmendment, isAsru, includeAwerb, canBeAwerbExempt, awerbEstablishments, omitCommentsField }) => {
  let schema = {
    comments: {
      inputType: 'textarea',
      validate: ['required']
    },
    comment: {
      inputType: 'textarea',
      meta: true
    }
  };

  if (omitCommentsField) {
    delete schema.comments;
  }

  if (isAsru) {
    return schema; // no additional questions required
  }

  // awerb question should always be first if included
  if (includeAwerb) {
    schema = {
      ...getAwerbQuestion({ isLegacy, isAmendment, canBeAwerbExempt, awerbEstablishments }),
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
