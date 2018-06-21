const { castArray, merge } = require('lodash');
const { suitabilityCodes, holdingCodes } = require('../../../constants');
const { getNacwos } = require('../../common/helpers');

const toArray = val => {
  if (!val) {
    return [];
  }
  return castArray(val);
};

const schema = {
  site: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  area: {
    inputType: 'inputText'
  },
  name: {
    inputType: 'inputText',
    validate: [
      'required'
    ]
  },
  suitability: {
    inputType: 'checkboxGroup',
    options: suitabilityCodes,
    format: toArray,
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

const mapSchema = nacwos => {
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

const getSchemaWithNacwos = req =>
  getNacwos(req)
    .then(nacwos => Promise.resolve(mapSchema(nacwos)))
    .catch(err => Promise.reject(err));

module.exports = {
  schema,
  getSchemaWithNacwos
};
