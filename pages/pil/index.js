const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const certSchema = require('./certificate/schema');
const modSchema = require('./modules/schema');

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, pil) => {
    if (pil === 'create') {
      req.model = Object.assign(reduce(
        certSchema,
        (all, { nullValue }, key) => {
          return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
        },
        {}
      ), reduce(
        modSchema,
        (all, { nullValue }, key) => {
          return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
        },
        {}
      ));
      req.model.id = 'new-training';
      return next();
    }

    // return req.api(`/establishment/${req.establishment}/place/${id}`)
    //   .then(({ json: { data } }) => {
    //     req.model = cleanModel(data);
    //   })
    //   .then(() => next())
    //   .catch(next);
  });

  app.use('/:pil', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
