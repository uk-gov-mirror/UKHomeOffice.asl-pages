const commentRequired = (task, stepId) => {
  const nextStep = task.nextSteps.find(nextStep => nextStep.id === stepId);
  return nextStep && nextStep.commentRequired;
};

module.exports = ({ task, chosenStatus }) => {
  return {
    comment: {
      inputType: 'textarea',
      meta: true,
      validate: [{
        customValidate: comment => {
          return commentRequired(task, chosenStatus) ? !!comment : true;
        }
      }]
    }
  };
};
