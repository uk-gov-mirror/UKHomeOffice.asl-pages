const { isInteger } = require('lodash');
const { page } = require('@asl/service/ui');
const { form } = require('../../common/routers');
const confirm = require('./routers/confirm');
const schema = require('./schema');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm']
  });

  app.use((req, res, next) => {
    req.model = {
      id: 'create-legacy-stub'
    };
    next();
  });

  app.use(form({
    schema,
    process: (req, res, next) => {
      const day = req.body['issueDate-day'];
      const month = req.body['issueDate-month'];
      const year = req.body['issueDate-year'];
      req.form.values.issueDate = `${year}-${month}-${day}`;

      const durationMonths = parseInt(req.body['months'], 10);
      const durationYears = parseInt(req.body['years'], 10);

      if (isInteger(durationMonths) && isInteger(durationYears)) {
        req.form.values.duration = {
          years: durationYears,
          months: durationMonths
        };
      }

      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('profile.convertLegacyProject', { suffix: 'confirm' }));
  });

  app.use('/confirm', confirm());

  return app;
};
