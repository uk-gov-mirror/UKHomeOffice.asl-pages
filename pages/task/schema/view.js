const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = task => {
  const content = getContent(task);

  const options = task.nextSteps.map(option => {
    if (option.id === 'withdrawn-by-applicant') {
      task.canBeWithdrawn = true;
    }

    return {
      value: option.id,
      label: get(content, `status.${option.id}.action.${task.type}`, get(content, `status.${option.id}.action`)),
      hint: get(content, `status.${option.id}.declaration.${task.type}`, get(content, `status.${option.id}.declaration`))
    };
  });

  return {
    status: {
      inputType: 'radioGroup',
      options: options.filter(option => option.value !== 'withdrawn-by-applicant'),
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
