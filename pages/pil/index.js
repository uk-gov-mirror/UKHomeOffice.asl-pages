const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { schema } = require('./certificate/schema');
// const { modulesSchema } = require('./modules/schema');

module.exports = () => {
  const app = Router();

  // before each request
  app.use((req, res, next) => {
    req.model = reduce(
      schema,
      (all, { nullValue }, key) => {
        return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
      },
      {}
    );

    // req.model = {};
    req.model.id = 'new-training';

    console.log('MODEL IS ', req.model);

    return next('route');
  });

  // app.param('id', (req, res, next, id) => {
  //   console.log('ID is ', id);
  //   // if (id === 'create') {
  //   req.model = reduce(schema, (all, { nullValue }, key) => {
  //     return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
  //   }, {});
  //   req.model.id = 'new-training';
  //   return next('route');
  //   // }

  //   // return req.api(`/establishment/${req.establishment}/place/${id}`)
  //   //   .then(({ json: { data } }) => {
  //   //     req.model = cleanModel(data);
  //   //   })
  //   //   .then(() => next())
  //   //   .catch(next);
  // });

  app.use('/apply', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
