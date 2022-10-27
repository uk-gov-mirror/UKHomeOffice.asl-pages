const { Router } = require('express');
const form = require('../../common/routers/form');
const { updateDataFromTask, redirectToTaskIfOpen, populateNamedPeople } = require('../../common/middleware');
const { profileReplaced } = require('../helper');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.post('/', updateDataFromTask(settings.sendData));

  app.use('/', populateNamedPeople, form({
    requiresDeclaration: req => !req.user.profile.asruUser,
    locals: (req, res, next) => {
      req.model.openTasks = []; // hide the open tasks warning on role forms as it is not applicable

      const { type } = req.session.form[req.model.id].values;
      Object.assign(res.locals, { model: req.model });
      Object.assign(res.locals.static, {
        profile: req.profile,
        values: {
          ...req.session.form[req.model.id].values
        },
        profileReplaced: profileReplaced(req.establishment, type)
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
