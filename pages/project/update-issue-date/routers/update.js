const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema');

module.exports = () => {
  const app = Router();

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['newIssueDate-day'];
      const month = req.body['newIssueDate-month'];
      const year = req.body['newIssueDate-year'];

      Object.assign(req.form.values, {
        newIssueDate: `${year}-${month}-${day}`
      });
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('project.updateIssueDate', { suffix: 'confirm' }));
  });

  return app;
};
