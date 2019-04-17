module.exports = (task, chosenStatus) => {
  const commentRequired = stepId => {
    return task.nextSteps.find(nextStep => nextStep.id === stepId).commentRequired;
  };

  return {
    comment: {
      inputType: 'textarea',
      validate: [{
        customValidate: comment => {
          return commentRequired(chosenStatus) ? !!comment : true;
        }
      }]
    }
  };
};
