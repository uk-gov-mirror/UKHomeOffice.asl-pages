const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const certificateSchema = require('./certificate/schema');
const moduleSchema = require('./modules/schema');

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, pil) => {
    if (pil === 'create') {
      req.model = Object.assign(reduce(
        certificateSchema,
        (all, { nullValue }, key) => {
          return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
        },
        {}
      ), reduce(
        moduleSchema,
        (all, { nullValue }, key) => {
          return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
        },
        {}
      ));
      req.model.id = 'new-training';
      return next();
    }
  });

  app.use('/:pil', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
