const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = task => {
  const content = getContent(task);

  const options = task.nextSteps
    .filter(step => step.id !== 'discarded-by-asru') // don't display ASRU discard as an option (has separate UI)
    .filter(step => step.id !== 'recovered') // don't display recovered as an option (has separate UI)
    .map(option => {
      if (option.id === 'resubmitted' && task.data.model === 'role') {
        return {
          value: option.id,
          label: get(content, `status.${option.id}.action.role-${task.type}`, get(content, `status.${option.id}.action`)),
          hint: get(content, `status.${option.id}.hint.${task.type}`, get(content, `status.${option.id}.hint.default`))
        };
      }

      return {
        value: option.id,
        label: get(content, `status.${option.id}.action.${task.type}`, get(content, `status.${option.id}.action`)),
        hint: get(content, `status.${option.id}.hint.${task.type}`, get(content, `status.${option.id}.hint.default`))
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
