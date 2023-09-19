const getActionAdjustedWording = (action, type) => {
  return isAmendment(action, type) ? 'amend' : action;
};

const getTypeAdjustedWording = (action, type) => {
  return isAmendment(action, type) ? 'amendment' : 'application';
};

const isAmendment = (action, type) => {
  return action === 'grant' && type === 'amendment';
};

module.exports = {
  getActionAdjustedWording,
  getTypeAdjustedWording,
  isAmendment
};
