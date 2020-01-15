const { Router } = require('express');
const moment = require('moment');
const { get } = require('lodash');

module.exports = () => {
  const app = Router();

  app.use('/', (req, res, next) => {
    const newIssueDate = get(req.session.form[req.model.id], 'values.newIssueDate');
    const duration = get(req.model, 'granted.duration');
    req.model.newIssueDate = new Date(newIssueDate); // moment is firing a deprecation warning for non-ISO date strings
    req.model.newExpiryDate = moment(req.model.newIssueDate).add(duration);
    next();
  });

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {
          issueDate: req.model.newIssueDate.toISOString()
        }
      }
    };

    return req.api(`/project/${req.projectId}/issue-date`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        req.notification({ key: 'issueDateUpdated' });
        return res.redirect(req.buildRoute('project.read'));
      })
      .catch(next);
  });

  return app;
};
