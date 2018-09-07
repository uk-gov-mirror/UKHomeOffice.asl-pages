const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { schema } = require('./training/schema');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = reduce(schema, (all, { nullValue }, key) => {
      return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
    }, {});
    req.model.id = 'new-training';
    return next('route');
  });

  app.use('/training/modules', require('./modules')());

  app.use('/training', require('./training')());

  app.use('/apply', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
