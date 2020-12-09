const { flattenDeep, castArray } = require('lodash');
const schema = require('@asl/projects/client/schema/v1/experience').default;

module.exports = (version, schemaVersion) => {
  if (schemaVersion === 0) {
    return {
      fields: [
        {
          name: 'experience-knowledge',
          label: 'What relevant scientific knowledge or education do you have?',
          alt: {
            label: 'What relevant scientific knowledge or education does this person have?'
          },
          type: 'texteditor'
        }
      ],
      fieldNames: ['experience-knowledge']
    };
  }

  const fields = schema.fields.filter(f => !f.show || f.show(version.data));
  const fieldNames = flattenDeep(fields.map(field => {
    return [
      field.name,
      ...(field.options || []).filter(opt => opt.reveal).map(opt => castArray(opt.reveal).map(f => f.name))
    ];
  }));

  return {
    fields,
    fieldNames
  };

};
