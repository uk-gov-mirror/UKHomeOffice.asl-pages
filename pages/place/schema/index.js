const { merge, concat } = require('lodash');
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
    inputType: 'selectMany',
    addAnotherLabel: 'Add another NACWO',
    removeLabel: 'Remove NACWO'
  },
  nvssqps: {
    inputType: 'selectMany',
    addAnotherLabel: 'Add another NVS / SQP',
    removeLabel: 'Remove NVS / SQP'
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

const getSchema = establishment => {
  const getOption = role => ({
    label: `${role.profile.firstName} ${role.profile.lastName}`,
    value: role.id
  });

  const byLastName = (roleA, roleB) => {
    return roleA.profile.lastName < roleB.profile.lastName ? -1 : 1;
  };

  const nacwoOptions = establishment.nacwo.sort(byLastName).map(getOption);
  const nvsSqpOptions = concat([], establishment.nvs, establishment.sqp).sort(byLastName).map(getOption);

  return merge({}, baseSchema, {
    nacwos: {
      options: nacwoOptions,
      validate: [
        { definedValues: nacwoOptions.map(option => option.value).concat(['']) }
      ]
    },
    nvssqps: {
      options: nvsSqpOptions,
      validate: [
        { definedValues: nvsSqpOptions.map(option => option.value).concat(['']) }
      ]
    }
  });
};

module.exports = {
  schema: baseSchema,
  getSchema
};
