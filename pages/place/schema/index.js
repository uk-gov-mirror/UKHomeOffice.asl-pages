const { merge } = require('lodash');
const { suitabilityCodes, holdingCodes } = require('@asl/constants');
const { toArray } = require('../../../lib/utils');

const baseSchema = {
  site: {
    inputType: 'inputText',
    nullValue: null,
    validate: [
      'required'
    ]
  },
  area: {
    inputType: 'inputText',
    nullValue: null
  },
  name: {
    inputType: 'inputText',
    nullValue: null,
    validate: [
      'required'
    ]
  },
  suitability: {
    inputType: 'checkboxGroup',
    options: suitabilityCodes,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: suitabilityCodes
      }
    ]
  },
  holding: {
    inputType: 'checkboxGroup',
    options: holdingCodes.map(c => {
      return {
        value: c,
        label: c,
        hint: c === 'STH' && 'Animals will be held for no more than 48 hours'
      };
    }),
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: holdingCodes
      }
    ]
  },
  nacwos: {
    inputType: 'selectMany'
  },
  restrictions: {
    inputType: 'restrictionsField',
    showDiff: false
  },
  comments: {
    inputType: 'textarea',
    showDiff: false,
    checkChanged: false
  }
};

const mapSchema = (nacwos, schema) => {
  const options = nacwos.map(({ id, profile: { firstName, lastName } }) => ({
    label: `${firstName} ${lastName}`,
    value: id
  }));
  return merge({}, schema, {
    nacwos: {
      options,
      validate: [
        { definedValues: options.map(option => option.value).concat(['']) }
      ]
    }
  });
};

const getSchemaWithNacwos = (req, schema) => mapSchema(req.establishment.nacwo, schema);

module.exports = {
  schema: baseSchema,
  getSchemaWithNacwos
};
