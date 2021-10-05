const { page } = require('@asl/service/ui');
const { get, forEach, omit, isEmpty } = require('lodash');
const form = require('../../common/routers/form');
const getSchema = require('./schema');

const defaultAdminAlerts = ['pil', 'ppl', 'pel'];

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', (req, res, next) => {
    req.model = { id: 'email-preferences' };

    return req.api('/me/email-preferences')
      .then(({ json: { data } }) => {
        const isAdmin = req.profile.establishments.some(e => e.role === 'admin');
        const isHolc = req.profile.roles.some(r => r.type === 'holc');
        res.locals.static.isAdmin = isAdmin;
        res.locals.static.isHolc = isHolc;

        req.model.projectCollaborations = [get(data, 'preferences.projectCollaborations', true)];

        if (isAdmin) {
          req.profile.establishments.forEach(e => {
            req.model[`alerts-${e.id}`] = get(data, `preferences[alerts-${e.id}]`, defaultAdminAlerts);
          });
        }
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/', form({
    configure: (req, res, next) => {
      req.form.schema = getSchema(req.profile);
      next();
    },
    process: (req, res, next) => {
      forEach(omit(req.model, 'id'), (value, key) => {
        req.form.values[key] = req.form.values[key] || [];
      });
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const values = req.session.form[req.model.id].values;

    // if the collab checkbox is unticked then empty array is returned, save as bool
    values.projectCollaborations = !isEmpty(values.projectCollaborations);

    const opts = {
      method: 'PUT',
      json: {
        data: {
          preferences: values
        }
      }
    };

    // clear the session regardless of success (always display saved prefs)
    delete req.session.form[req.model.id];

    req.api('/me/email-preferences', opts)
      .then(() => {
        req.notification({ key: 'success' });
      })
      .then(() => res.redirect(req.buildRoute('account.emailPreferences')))
      .catch(next);
  });

  return app;
};
