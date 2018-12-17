const { omit } = require('lodash');
const moment = require('moment');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname
  });

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['dob-day'];
      const month = req.body['dob-month'];
      const year = req.body['dob-year'];

      Object.assign(req.form.values, {
        dob: `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.dob = moment(req.form.values.dob, 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    }
  }));

  app.get('/', (req, res, next) => {
    req.breadcrumb('account.edit');
    next();
  });

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'PUT',
      json: {
        data: omit(values, 'comments'),
        meta: {
          comments: values.comments
        }
      }
    };
    return req.api(`/me`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    req.notification({ key: 'success' });

    delete req.session.form[id];
    delete req.session.profile;

    return res.redirect(req.buildRoute('account.edit'));
  });

  return app;
};
