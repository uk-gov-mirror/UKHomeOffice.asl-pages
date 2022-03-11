const { get } = require('lodash');

module.exports = () => (req, res, next) => {
  const fixStatus = task => {
    if (task.data.model === 'rop') {
      if (task.data.action === 'submit') {
        task.status = 'resubmitted';
      }
      if (task.data.action === 'unsubmit') {
        task.status = 'reopened';
      }
    }
  };
  if (req.task) {
    fixStatus(req.task);
  }
  if (get(req, 'datatable.data.rows')) {
    req.datatable.data.rows.forEach(fixStatus);
  }
  next();
};
