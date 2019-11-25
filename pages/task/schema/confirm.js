module.exports = (task, chosenStatus) => {
  const commentRequired = stepId => {
    const nextStep = task.nextSteps.find(nextStep => nextStep.id === stepId);
    return nextStep && nextStep.commentRequired;
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
