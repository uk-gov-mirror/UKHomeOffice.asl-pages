const getActionAdjustedWording = (action, type) => {
  return isAmendment(action, type) ? 'amend' : action;
};

const getTypeAdjustedWording = (action, type) => {
  if (isAmendment(action, type)) {
    return 'amendment';
  } else if (action === 'transfer') {
    return 'transfer';
  } else {
    return 'application';
  }
};

const isAmendment = (action, type) => {
  return ['update', 'grant'].includes(action) && type === 'amendment';
};

module.exports = {
  getActionAdjustedWording,
  getTypeAdjustedWording,
  isAmendment
};
