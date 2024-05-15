const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = task => {
  const content = getContent(task);
  const model = get(task, 'data.model');
  const action = get(task, 'data.action');

  const options = task.nextSteps
    .filter(step => step.id !== 'discarded-by-asru') // don't display ASRU discard as an option (has separate UI)
    .filter(step => step.id !== 'recovered') // don't display recovered as an option (has separate UI)
    .map(option => {
      const label = option.id === 'resubmitted' && model === 'role'
        ? get(
          content,
          `status.${option.id}.action.role-${task.type}`,
          get(
            content,
            `status.${option.id}.action.default`,
            get(content, `status.${option.id}.action`)
          ))
        : get(
          content,
          `status.${option.id}.action.${task.type}`,
          get(
            content,
            `status.${option.id}.action.default`,
            get(content, `status.${option.id}.action`)
          )
        );

      const hint = option.id === 'resubmitted' && model === 'pil' && action === 'update-conditions'
        ? get(content, `status.${option.id}.hint.updateConditions`, get(content, `status.${option.id}.hint.default`))
        : get(content, `status.${option.id}.hint.${task.type}`, get(content, `status.${option.id}.hint.default`));

      return {
        value: option.id,
        label,
        hint
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
