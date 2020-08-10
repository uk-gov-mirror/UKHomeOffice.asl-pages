const { get } = require('lodash');
const { getAwerbQuestion } = require('../../project-version/update/submit/schema');

module.exports = (task, chosenStatus) => {
  const commentRequired = stepId => {
    const nextStep = task.nextSteps.find(nextStep => nextStep.id === stepId);
    return nextStep && nextStep.commentRequired;
  };

  const awerbRequired = task => {
    // awerb question is required for project applications / amendments that haven't yet been marked as awerbed
    const model = get(task, 'data.model');
    const status = get(task, 'status');
    const wasAwerbed = get(task, 'data.meta.awerb') === 'Yes';
    return model === 'project' && status === 'awaiting-endorsement' && !wasAwerbed;
  };

  let schema = {
    comment: {
      inputType: 'textarea',
      validate: [{
        customValidate: comment => {
          return commentRequired(chosenStatus) ? !!comment : true;
        }
      }]
    }
  };

  const isAmendment = get(task, 'type') === 'amendment';

  if (awerbRequired(task)) {
    schema = {
      awerb: getAwerbQuestion(isAmendment),
      ...schema
    };
  }

  return schema;
};
