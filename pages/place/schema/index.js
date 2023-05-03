const { merge, concat } = require('lodash');
const { suitabilityCodes, holdingCodes } = require('@ukhomeoffice/asl-constants');
const { toArray } = require('../../../lib/utils');

const baseSchema = (sites, areas) => {
  return {
    site: {
      inputType: 'autoComplete',
      options: sites,
      preventOptionMapping: true,
      allowNewOption: true,
      validate: [
        'required'
      ]
    },
    area: {
      inputType: 'autoComplete',
      options: areas,
      preventOptionMapping: true,
      allowNewOption: true
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
      addAnotherLabel: 'Add NACWO',
      removeLabel: 'Remove NACWO',
      minRequiredFields: 0,
      nullValue: []
    },
    nvssqps: {
      inputType: 'selectMany',
      addAnotherLabel: 'Add NVS / SQP',
      removeLabel: 'Remove NVS / SQP',
      minRequiredFields: 0,
      nullValue: []
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
};

const getSchema = ({ establishment, sites, areas }) => {
  const getOption = role => ({
    label: `${role.profile.firstName} ${role.profile.lastName}`,
    value: role.id
  });

  const byLastName = (roleA, roleB) => {
    return roleA.profile.lastName < roleB.profile.lastName ? -1 : 1;
  };

  const nacwoOptions = establishment.nacwo.sort(byLastName).map(getOption);
  const nvsSqpOptions = concat([], establishment.nvs, establishment.sqp).sort(byLastName).map(getOption);

  return merge({}, baseSchema(sites, areas), {
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
  baseSchema,
  getSchema
};
