const { Router } = require('express');
const routes = require('./routes');
const { FEATURE_NAMED_PERSON_MVP } = require('@asl/service/ui/feature-flag');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    if (!req.hasFeatureFlag(FEATURE_NAMED_PERSON_MVP)) {
      return res.redirect(req.buildRoute('role.create'));
    }

    next();
  });

  return app;
};

module.exports.routes = routes;
