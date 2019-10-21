const { page } = require('@asl/service/ui');
const { get, pick } = require('lodash');
const form = require('../../common/routers/form');
const success = require('../../common/routers/success');
const confirm = require('./routers/confirm');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success'],
    ...settings
  });

  app.use((req, res, next) => {
    req.breadcrumb('account.updateEmail.base');
    req.model = req.user.profile;
    next();
  });

  app.use('/', form({
    schema,
    locals: (req, res, next) => {
      res.locals.static.profile = req.user.profile;
      res.locals.model.password = ''; // clear password field on validation fail

      if (res.locals.model.email === req.user.profile.email) {
        res.locals.model.email = ''; // don't render existing email in new email field
      }
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const opts = {
      method: 'POST',
      json: {
        username: req.user.profile.email,
        password: req.form.values.password
      }
    };

    req.api('/me/auth-token', opts)
      .then(response => {
        req.session.form[req.model.id].values = {
          ...pick(req.session.form[req.model.id].values, 'email'),
          authToken: get(response, 'json.data.token')
        };
        req.session.form[req.model.id].values.authToken.access_token = req.user.access_token;
      })
      .then(() => res.redirect(req.buildRoute('account.updateEmail.confirm')))
      .catch(next);
  });

  app.use('/confirm', confirm());

  app.use('/success', success({
    model: 'profile',
    type: 'amendment',
    status: 'resubmitted'
  }));

  return app;
};
