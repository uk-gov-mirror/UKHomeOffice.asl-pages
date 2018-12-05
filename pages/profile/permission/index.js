const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    root: __dirname,
    ...settings
  });

  app.use('/', form({ schema }));

  app.use('/', (req, res, next) => {

    const hasRoles = !!(req.profile.roles && req.profile.roles.length);
    const hasPil = !!(req.profile.pil && req.profile.pil.status === 'active');
    const hasProjects = !!(req.profile.projects && req.profile.projects.length);
    res.locals.static.isNamed = hasRoles || hasPil || hasProjects;
    next();
  });

  app.post('/', (req, res, next) => {

    const values = {
      role: req.session.form[req.model.id].values.role,
      establishmentId: req.establishmentId,
      profileId: req.profileId
    };

    const opts = {
      method: 'PUT',
      json: values
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => res.redirect(req.buildRoute('profile.view')))
      .catch(next);
  });

  app.post('/remove', (req, res, next) => {

    const values = {
      establishmentId: req.establishmentId,
      profileId: req.profileId
    };

    const opts = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => res.redirect(req.buildRoute('profile.list')))
      .catch(next);
  });

  return app;
};
