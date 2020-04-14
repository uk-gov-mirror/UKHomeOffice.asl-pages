const { merge } = require('lodash');
const { Router } = require('express');
const bodyParser = require('body-parser');
const content = require('./content');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.get('/', (req, res) => {
    if (req.query.referrer) {
      return res.redirect(req.query.referrer);
    }
    res.redirect(req.buildRoute('project.read'));
  });

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    const { profileId } = req.body;
    req.api(`/establishment/${req.establishmentId}/project/${req.project.id}/collaborators/${profileId}`, { method: 'DELETE' })
      .then(() => next())
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    res.locals.static.content = merge(res.locals.static.content, content);
    req.notification({ key: 'success', name: req.body.profileName });
    res.redirect(req.query.referrer);
  });

  return app;
};
