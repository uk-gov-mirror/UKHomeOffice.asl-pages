const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { some } = require('lodash');
const content = require('./content');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({
    schema,
    configure: (req, res, next) => {
      const role = req.profile.establishments.find(est => est.id === req.establishmentId).role;
      req.session.form[req.model.id].values.role = role;
      next();
    }
  }));

  app.use('/', (req, res, next) => {
    const hasRoles = some(req.profile.roles, role => role.establishmentId === req.establishmentId);
    const hasPil = req.profile.pil && req.profile.pil.status === 'active' && req.profile.pil.establishmentId === req.establishmentId;

    const hasProjects = some(req.profile.projects, project => {
      return project.status === 'active' && project.establishmentId === req.establishmentId;
    });

    const hasAdditionalProjects = some(req.profile.projects, project => {
      return project.status === 'active' && project.additionalEstablishments.filter(e => e.status !== 'removed').map(est => est.id).includes(req.establishmentId);
    });

    Object.assign(res.locals.static, {
      hasRoles: !!hasRoles,
      hasPil: !!hasPil,
      hasProjects: !!hasProjects,
      hasAdditionalProjects: !!hasAdditionalProjects
    });
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
      .then(() => req.notification({ key: 'changed' }))
      .then(() => res.redirect(req.buildRoute('profile.read')))
      .catch(next);
  });

  app.post('/remove', (req, res, next) => {
    const opts = {
      method: 'DELETE'
    };

    res.locals.static.content = content;

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => req.notification({ key: 'removed' }))
      .then(() => res.redirect(req.buildRoute('profile.list')))
      .catch(next);
  });

  return app;
};
