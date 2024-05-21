const content = require('../read/content/confirm-hba');
const { getFromContentTemplate } = require('../../../lib/utils');

const buildOptions = (taskType) => ['yes', 'no'].map((value) => {
  console.log({value, taskType});
  return {
    value,
    label: getFromContentTemplate(
      content,
      [
        `fields.confirmHba.options.${value}.${taskType}`,
        `fields.confirmHba.options.${value}`
      ]
    )
  };
});

module.exports = (taskType) => {
  const options = buildOptions(taskType);
  const schema = {
    confirmHba: {
      inputType: 'radioGroup',
      options,
      nullValue: [],
      validate: [
        'required',
        {
          definedValues: options.map((option) => option.value)
        }
      ]
    }
  };

  console.log(JSON.stringify(schema));

  return schema;
};
