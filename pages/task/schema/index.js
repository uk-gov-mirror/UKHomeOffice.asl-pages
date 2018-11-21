
module.exports = (task) => {
  const reasonRequired = stepId => {
    return task.nextSteps.find(nextStep => nextStep.id === stepId).reasonRequired;
  };

  const reasonField = stepId => {
    return {
      [`${stepId}-reason`]: {
        inputType: 'textarea',
        validate: [{
          customValidate: (field, model) => {
            return (model.decision && reasonRequired(model.decision)) ? !!field : true;
          }
        }]
      }
    };
  };

  const options = task.nextSteps.map(nextStep => {
    return {
      value: nextStep.id,
      label: nextStep.id,
      reveal: nextStep.reasonRequired ? reasonField(nextStep.id) : null
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
