
module.exports = (task) => {
  const applicationCanProceed = taskId => {
    return task.nextSteps.find(nextStep => nextStep.id === taskId).proceed;
  };

  const reason = stepId => {
    return {
      [`${stepId}-reason`]: {
        inputType: 'textarea',
        validate: [{
          customValidate: (field, model) => {
            // when the application is rejected, a reason must be provided
            return (model.decision && !applicationCanProceed(model.decision)) ? !!field : true;
          }
        }]
      }
    };
  };

  const options = task.nextSteps.map(nextStep => {
    return {
      value: nextStep.id,
      label: nextStep.proceed ? 'Yes' : 'No',
      // only add the reason field if we're not proceeding with the application
      reveal: nextStep.proceed ? null : reason(nextStep.id)
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
