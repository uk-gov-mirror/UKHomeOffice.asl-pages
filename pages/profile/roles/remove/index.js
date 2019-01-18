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
    req.breadcrumb('profile.role.remove.base');
    next();
  });

  app.use('/', form({
    configure: (req, res, next) => {
      const existingRoles = req.profile.roles.map(role => role.type);
      req.form.schema = {
        ...schema(existingRoles, 'remove')
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
  app.use('/success', success('remove'));

  return app;
};
