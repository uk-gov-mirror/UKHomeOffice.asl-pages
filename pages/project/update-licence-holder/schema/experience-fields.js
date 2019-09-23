const { get, flattenDeep, castArray } = require('lodash');
const schema = require('@asl/projects/client/schema').default;

const fields = get(schema[1](), 'applicantInformation.subsections.experience.fields');
const fieldNames = flattenDeep(fields.map(field => {
  return [
    field.name,
    ...(field.options || []).filter(opt => opt.reveal).map(opt => castArray(opt.reveal).map(f => f.name))
  ];
}));

module.exports = {
  fields,
  fieldNames
};
