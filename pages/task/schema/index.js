const getContent = require('../read/content');

module.exports = (task) => {

  const content = getContent(task);

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

  const options = content.fields.options.map(option => {
    return {
      ...option,
      reveal: task.nextSteps.find(step => step.id === option.value).commentRequired ? reasonField(option.value) : null
    };
  });

  const schema = {
    decision: {
      inputType: 'radioGroup',
      options: options,
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
