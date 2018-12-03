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
    res.locals.static.isNamed = !!((req.profile.roles && req.profile.roles.length) || req.profile.pil || (req.profile.projects && req.profile.projects.length));
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
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
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
