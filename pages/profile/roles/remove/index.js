const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    req.breadcrumb('profile.role.remove');
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
    return res.redirect(req.buildRoute('profile.role.confirm'));
  });

  return app;
};
