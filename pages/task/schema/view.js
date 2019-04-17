const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = task => {
  const content = getContent(task);

  const options = task.nextSteps.map(option => {
    if (option.id === 'withdrawn-by-applicant') {
      task.canBeWithdrawn = true;
    }

    const defaultLabel = get(content, `status.${option.id}.action`);
    return {
      value: option.id,
      label: get(content, `status.${option.id}.${task.status}`, defaultLabel),
      hint: get(content, `status.${option.id}.declaration`)
    };
  });

  return {
    status: {
      inputType: 'radioGroup',
      options: options.filter(option => option.value !== 'withdrawn-by-applicant'),
      nullValue: [],
      label: get(content, `fields.status.${task.status}`, get(content, 'fields.status.label')),
      validate: [
        'required',
        {
          definedValues: options.map(option => option.value)
        }
      ]
    }
  };
};
