const { merge } = require('lodash');
const { suitabilityCodes, holdingCodes } = require('@asl/constants');
const { getNacwos } = require('../../common/helpers');
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
    options: holdingCodes,
    format: toArray,
    nullValue: [],
    validate: [
      'required',
      {
        definedValues: holdingCodes
      }
    ]
  },
  nacwo: {
    inputType: 'select',
    accessor: 'id'
  }
};

const mapSchema = (nacwos, schema) => {
  const options = nacwos.map(({ profile: { firstName, lastName, id } }) => ({
    label: `${firstName} ${lastName}`,
    value: id
  }));
  return merge({}, schema, {
    nacwo: {
      options,
      validate: [
        ...(schema.nacwo.validate || []),
        {
          definedValues: options.map(option => option.value).concat([''])
        }
      ]
    }
  });
};

const getSchemaWithNacwos = (req, schema) =>
  getNacwos(req)
    .then(nacwos => Promise.resolve(mapSchema(nacwos, schema)))
    .catch(err => Promise.reject(err));

module.exports = {
  schema: baseSchema,
  getSchemaWithNacwos
};
