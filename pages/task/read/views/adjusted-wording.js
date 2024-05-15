const getActionAdjustedWording = (action, type) => {
  return isAmendment(action, type) ? 'amend' : action;
};

const getTypeAdjustedWording = (action, type) => {
  return isAmendment(action, type) ? 'amendment' : 'transfer';
};

const isAmendment = (action, type) => {
  return ['update', 'grant'].includes(action) && type === 'amendment';
};

module.exports = {
  getActionAdjustedWording,
  getTypeAdjustedWording,
  isAmendment
};
