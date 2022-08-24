const { Router } = require('express');
const { merge } = require('lodash');
const form = require('../../common/routers/form');
const schema = require('../schema');
const content = require('../content');

module.exports = ({ modelType, action }) => {
  const app = Router();

  app.use(form({
    schema,
    locals(req, res, next) {
      res.locals.static.model = req.model;
      res.locals.static.licenceHolder = req.model.licenceHolder || req.profile;
      res.locals.static.content = merge({}, res.locals.static.content, content[action]);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    res.redirect(req.buildRoute(`${modelType}.${action}`, { suffix: 'confirm' }));
  });

  return app;
};
