const { Router } = require('express');
const form = require('../../../common/routers/form');
const schema = require('../schema/declarations');

module.exports = action => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    req.breadcrumb(`profile.role.${action}.confirm`);
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
      return res.redirect(req.buildRoute(`profile.role.${action}.base`));
    },
    cancelEdit: (req, res, next) => {
      return res.redirect(req.buildRoute('profile.view'));
    }
  }));

  app.post('/', (req, res, next) => {
    const { role, rcvsNumber, comment } = req.session.form[req.model.id].values;

    const opts = {
      method: action === 'remove' ? 'DELETE' : 'PUT',
      json: {
        data: { role, rcvsNumber },
        meta: { comment }
      }
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/role`, opts)
      .then(() => res.redirect(req.buildRoute(`profile.role.${action}.success`)))
      .catch(next);
  });

  return app;
};
