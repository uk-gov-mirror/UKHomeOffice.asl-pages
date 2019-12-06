const { Router } = require('express');
const form = require('../../common/routers/form');
const { updateDataFromTask, redirectToTaskIfOpen } = require('../../common/middleware');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.post('/', updateDataFromTask(settings.sendData));

  app.use('/', form({
    requiresDeclaration: req => !req.user.profile.asruUser,
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
      return res.redirect(req.buildRoute('profile.read'));
    }
  }));

  app.post('/', redirectToTaskIfOpen());

  return app;
};
