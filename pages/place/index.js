const { Router } = require('express');
const { schema } = require('./schema');

module.exports = () => {
  const app = Router();

  app.param('id', (req, res, next, id) => {
    if (id === 'create') {
      return next('route');
    }
    return req.api(`/establishment/${req.establishment}/place/${id}`)
      .then(({ json: { data } }) => {
        req.model = data;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    res.locals.static.schema = schema;
    req.listPath = req.baseUrl;
    next();
  });

  app.use('/:id/edit', require('./update')());
  app.use('/:id/delete', require('./delete')());
  app.use('/:id', require('./read')());

  app.use('/create', require('./create')());

  app.use('/', require('./list')());

  return app;
};
