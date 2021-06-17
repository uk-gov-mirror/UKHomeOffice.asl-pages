const { get } = require('lodash');

module.exports = (task, chosenStatus) => {
  if (['discarded-by-applicant', 'recalled-by-applicant', 'returned-to-applicant'].includes(chosenStatus)) {
    return false;
  }

  const model = get(task, 'data.model');
  const action = get(task, 'data.action');
  const status = get(task, 'status');

  if (action === 'grant-ra') {
    return false;
  }

  return model === 'project' && status === 'awaiting-endorsement';
};
