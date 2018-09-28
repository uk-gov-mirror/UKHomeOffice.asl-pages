const moment = require('moment');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use((req, res, next) => {
    next();
  });

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['pass_date-day'];
      const month = req.body['pass_date-month'];
      const year = req.body['pass_date-year'];

      Object.assign(req.form.values, {
        pass_date: `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.pass_date = moment(req.form.values.pass_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.originalUrl.replace(/training/, 'modules'));
  });

  return app;
};
