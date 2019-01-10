const { omit } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const confirm = require('./routers/confirm');
const success = require('./routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', (req, res, next) => {
    req.breadcrumb('profile.role.apply');
    next();
  });

  app.use('/', form({
    configure: (req, res, next) => {
      const existingRoles = req.profile.roles.map(role => role.type);
      req.form.schema = {
        ...schema(existingRoles),
        rcvsNumber: {}
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = omit(req.form.schema, 'rcvsNumber');
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('profile.role.confirm'));
  });

  app.use('/confirm', (req, res, next) => {
    req.breadcrumb('profile.role.confirm');
    next();
  });

  app.use('/confirm', confirm());

  app.post('/confirm', (req, res, next) => {
    const { role, rcvsNumber, comment } = req.session.form[req.model.id].values;

    const opts = {
      method: 'PUT',
      json: {
        data: { role, rcvsNumber },
        meta: { comment }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/role`, opts)
      .then(() => res.redirect(req.buildRoute('profile.role.success')))
      .catch(next);
  });

  app.use('/success', success({ model: 'role' }));

  return app;
};
