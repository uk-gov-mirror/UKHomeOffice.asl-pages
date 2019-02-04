const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { some } = require('lodash');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({
    schema,
    getValues: (req, res, next) => {
      const role = req.profile.establishments.find(est => est.id === req.establishmentId).role;
      req.session.form[req.model.id].values.role = role;
      next();
    }
  }));

  app.use('/', (req, res, next) => {
    const hasRoles = !!(req.profile.roles && req.profile.roles.length);
    const hasPil = !!(req.profile.pil && req.profile.pil.status === 'active');
    const hasProjects = !!(req.profile.projects && req.profile.projects.length && some(req.profile.projects, project => project.status === 'active'));
    res.locals.static.isNamed = hasRoles || hasPil || hasProjects;
    next();
  });

  app.post('/', (req, res, next) => {
    const values = {
      role: req.session.form[req.model.id].values.role
    };

    const opts = {
      method: 'PUT',
      json: { data: values }
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => res.redirect(req.buildRoute('profile.view')))
      .catch(next);
  });

  app.post('/remove', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => res.redirect(req.buildRoute('profile.list')))
      .catch(next);
  });

  return app;
};
