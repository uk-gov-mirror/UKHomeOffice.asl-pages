const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema/declarations');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../../common/middleware');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    req.breadcrumb('role.confirm');
    next();
  });

  app.post('/', updateDataFromTask(settings.sendData));

  app.use('/', form({
    model: 'role-confirm',
    schema,
    locals: (req, res, next) => {
      Object.assign(res.locals, { model: req.model });
      Object.assign(res.locals.static, {
        profile: req.profile,
        values: {
          ...req.session.form[req.model.id].values
        }
      });
      next();
    },
    checkSession: (req, res, next) => {
      if (req.session.form && req.session.form[req.model.id]) {
        return next();
      }
      return res.redirect(req.buildRoute(`role.${settings.action}`));
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('profile.view'));
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  return app;
};
