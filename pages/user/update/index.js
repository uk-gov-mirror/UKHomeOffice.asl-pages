const moment = require('moment');
const { set } = require('lodash');
const page = require('../../../lib/page');
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

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;
    const opts = {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };
    return req.api(`/me`, opts)
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    const id = req.model.id;
    set(req.session, 'notifications', [{
      type: 'success',
      props: {
        email: req.session.form[id].values.email
      }
    }]);
    delete req.session.form[id];
    delete req.session.profile;

    return res.redirect(req.buildRoute('account.edit'));
  });

  return app;
};
