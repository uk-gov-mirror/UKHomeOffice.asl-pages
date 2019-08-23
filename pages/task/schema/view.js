const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = task => {
  const content = getContent(task);

  const options = task.nextSteps.map(option => {
    return {
      value: option.id,
      label: get(content, `status.${option.id}.action.${task.type}`, get(content, `status.${option.id}.action`)),
      hint: get(content, `status.${option.id}.hint.${task.type}`, get(content, `status.${option.id}.hint`))
    };
  });

  return {
    status: {
      inputType: 'radioGroup',
      options,
      nullValue: [],
      label: get(content, `fields.status.${task.status}.${task.type}`, get(content, `fields.status.${task.status}`, get(content, 'fields.status.label'))),
      validate: [
        'required',
        {
          definedValues: options.map(option => option.value)
        }
      ]
    }
  };
};
