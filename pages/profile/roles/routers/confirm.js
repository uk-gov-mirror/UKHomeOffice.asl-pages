const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema/declarations');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    req.breadcrumb('profile.role.confirm');
    next();
  });

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
      return res.redirect(req.buildRoute('profile.role.apply'));
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('profile.view'));
    }
  }));

  app.post('/', (req, res, next) => {
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

  return app;
};
