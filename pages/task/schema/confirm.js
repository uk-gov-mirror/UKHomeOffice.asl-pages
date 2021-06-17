const { get } = require('lodash');
const askAwerb = require('../helper/ask-awerb');
const { getAwerbQuestion } = require('../../project-version/update/submit/schema');

const commentRequired = (task, stepId) => {
  const nextStep = task.nextSteps.find(nextStep => nextStep.id === stepId);
  return nextStep && nextStep.commentRequired;
};

module.exports = ({ task, chosenStatus, isLegacy, awerbEstablishments }) => {
  let schema = {
    comment: {
      inputType: 'textarea',
      validate: [{
        customValidate: comment => {
          return commentRequired(task, chosenStatus) ? !!comment : true;
        }
      }]
    }
  };

  const isAmendment = get(task, 'type') === 'amendment';

  if (askAwerb(task, chosenStatus)) {
    schema = {
      ...getAwerbQuestion({ isLegacy, isAmendment, awerbEstablishments }),
      ...schema
    };
  }

  return schema;
};
