const { omit } = require('lodash');
const { page } = require('@asl/service/ui');
const form = require('../../../common/routers/form');
const schema = require('../schema');
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
      const existingRoles = req.profile.roles.map(role => role.type);
      req.form.schema = {
        ...schema(existingRoles, 'apply'),
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
  app.use('/success', success('apply'));

  return app;
};
