module.exports = (task, chosenStatus) => {
  const commentRequired = stepId => {
    return task.nextSteps.find(nextStep => nextStep.id === stepId).commentRequired;
  };

  return {
    comment: {
      inputType: 'textarea',
      validate: [{
        customValidate: comment => {
          console.log('chosen status: ', chosenStatus);
          console.log('comment: ', comment);

          return commentRequired(chosenStatus) ? !!comment : true;
        }
      }]
    }
  };
};
