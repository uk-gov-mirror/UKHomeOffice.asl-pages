const { get } = require('lodash');
const getContent = require('../read/content');

module.exports = (task) => {

  const content = getContent(task);

  const commentRequired = stepId => {
    return task.nextSteps.find(nextStep => nextStep.id === stepId).commentRequired;
  };

  const options = task.nextSteps.map(option => {
    return {
      value: option.id,
      label: get(content, `fields.options.${option.id}.label`),
      hint: get(content, `fields.options.${option.id}.hint`)
    };
  });

  const schema = {
    status: {
      inputType: 'radioGroup',
      options: options,
      nullValue: [],
      validate: [
        'required',
        {
          definedValues: options.map(option => option.value)
        }
      ]
    },
    comment: {
      inputType: 'textarea',
      validate: [{
        customValidate: (field, model) => {
          return (model.status && commentRequired(model.status)) ? !!field : true;
        }
      }]

    }
  };

  return schema;
};
