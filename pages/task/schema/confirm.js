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

  const taskType = get(task, 'type');
  const isAmendment = taskType === 'amendment';
  const isTransfer = taskType === 'transfer';
  const isWithOutgoingEstablishment = task.data.establishmentId === task.data.modelData.establishmentId;
  const canBeAwerbExempt = isAmendment || (isTransfer && isWithOutgoingEstablishment);

  if (askAwerb(task, chosenStatus)) {
    schema = {
      ...getAwerbQuestion({ isLegacy, isAmendment, isTransfer, canBeAwerbExempt, awerbEstablishments }),
      ...schema
    };
  }

  return schema;
};
