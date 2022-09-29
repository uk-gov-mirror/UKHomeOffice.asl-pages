const { page } = require('@asl/service/ui');
const { set, pick } = require('lodash');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use((req, res, next) => {
    req.model = {
      id: `${req.user.profile.id}-password`
    };
    res.locals.static.profile = req.user.profile;
    next();
  });

  app.use('/', form({
    schema,
    locals: (req, res, next) => {
      // clear password fields on validation fail
      res.locals.model.oldPassword = '';
      res.locals.model.password = '';
      res.locals.model.passwordConfirm = '';
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    // verify old password first
    const opts = {
      method: 'POST',
      json: {
        username: req.user.profile.email,
        password: req.form.values.oldPassword
      }
    };

    req.api('/me/verify', opts)
      .then(() => next())
      .catch(err => {
        if (err.status === 403) {
          set(req.session.form[req.model.id], 'validationErrors.oldPassword', 'invalid');
          return res.redirect(req.buildRoute('account.updatePassword'));
        }
        next(err);
      });
  });

  app.post('/', (req, res, next) => {
    // update password
    const opts = {
      method: 'PUT',
      json: {
        data: {
          ...pick(req.session.form[req.model.id].values, 'password')
        }
      }
    };
    return req.api('/me/password', opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return res.redirect(req.buildRoute('account.updatePassword', { suffix: 'success' }));
      })
      .catch(next);
  });

  app.get('/success', (req, res, next) => {
    return req.api('/me/logout', { method: 'POST' })
      .then(() => req.session.destroy())
      .then(() => res.sendResponse())
      .catch(next);
  });

  return app;
};
