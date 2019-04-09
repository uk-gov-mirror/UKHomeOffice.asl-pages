const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const schema = require('./schema');
const confirm = require('../routers/confirm');
const success = require('../routers/success');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings,
    paths: ['/confirm', '/success']
  });

  app.use('/', (req, res, next) => {
    req.breadcrumb('profile.role.remove.base');
    next();
  });

  app.use('/', form({
    configure: (req, res, next) => {
      req.form.schema = {
        ...schema(req.profile.roles, 'remove')
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = req.form.schema;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('profile.role.remove.confirm'));
  });

  app.use('/confirm', confirm('remove'));

  app.post('/confirm', (req, res, next) => {
    const { type, comment } = req.session.form[req.model.id].values;
    const roleId = req.profile.roles.find(r => r.type === type).id;

    const opts = {
      method: 'DELETE',
      json: {
        data: { profileId: req.profileId },
        meta: { comment }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/role/${roleId}`, opts)
      .then(() => res.redirect(req.buildRoute(`profile.role.remove.success`)))
      .catch(next);
  });

  app.use('/success', success('remove'));

  return app;
};
