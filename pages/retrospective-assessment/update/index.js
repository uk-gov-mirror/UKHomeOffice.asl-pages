const { Router } = require('express');
const update = require('./router');
const submit = require('./submit');
const success = require('./success');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use('/submit', submit(settings));
  app.use('/success', success(settings));

  app.use('/*', update(settings));

  return app;
};
