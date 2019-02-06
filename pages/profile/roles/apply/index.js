const { omit } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const getSchema = require('./schema');
const confirm = require('../routers/confirm');
const success = require('../routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', (req, res, next) => {
    req.breadcrumb('profile.role.apply.base');
    next();
  });

  app.use('/', form({
    configure: (req, res, next) => {
      const roles = req.profile.roles.map(role => role.type);
      req.form.schema = {
        ...getSchema(roles),
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
    return res.redirect(req.buildRoute('profile.role.apply.confirm'));
  });

  app.use('/confirm', confirm('apply'));

  app.post('/confirm', (req, res, next) => {
    const { type, rcvsNumber, comment } = req.session.form[req.model.id].values;

    const opts = {
      method: 'POST',
      json: {
        data: { type, rcvsNumber, profileId: req.profileId },
        meta: { comment }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/role`, opts)
      .then(() => res.redirect(req.buildRoute(`profile.role.apply.success`)))
      .catch(next);
  });

  app.use('/success', success('apply'));

  return app;
};
