const { castArray, merge } = require('lodash');
const { suitabilityCodes, holdingCodes } = require('../../../constants');
const { getNacwos } = require('../../common/helpers');

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

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
    accessor: 'id',
    validate: ['required']
  }
};

const mapSchema = (nacwos, schema) => {
  const options = nacwos.map(({ id, profile: { name } }) => ({
    label: name,
    value: id
  }));
  return merge({}, schema, {
    nacwo: {
      options,
      validate: [
        ...schema.nacwo.validate,
        {
          definedValues: options.map(option => option.value)
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
