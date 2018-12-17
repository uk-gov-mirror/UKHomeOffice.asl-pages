const content = require('../read/content');

module.exports = (task) => {

  const commentRequired = stepId => {
    return task.nextSteps.find(nextStep => nextStep.id === stepId).commentRequired;
  };

  const reasonField = stepId => {
    return {
      [`${stepId}-reason`]: {
        inputType: 'textarea',
        validate: [{
          customValidate: (field, model) => {
            return (model.decision && commentRequired(model.decision)) ? !!field : true;
          }
        }]
      }
    };
  };

  const key = task.data.model;

  const options = task.nextSteps.map(nextStep => {
    const option = content[key].fields.options.find(opt => opt.value === nextStep.id);
    return {
      value: option.value,
      label: option.label,
      hint: option.hint,
      reveal: nextStep.commentRequired ? reasonField(nextStep.id) : null
    };
  });

  const schema = {
    decision: {
      inputType: 'radioGroup',
      options,
      nullValue: [],
      validate: [
        'required',
        {
          definedValues: options.map(option => option.value)
        }
      ]
    }
  };

  return schema;
};
