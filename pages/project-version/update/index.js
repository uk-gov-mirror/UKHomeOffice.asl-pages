const { Router } = require('express');
const update = require('./router');
const submit = require('./submit');
const success = require('./success');
const { getVersion, getComments } = require('../middleware');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use(getVersion());

  app.use(getComments());

  app.use('/submit', submit());
  app.use('/success', success());

  // we always want to serve the same template and
  // scripts for any sub-routes under /edit
  app.use('/*', update());

  app.use((req, res) => res.sendResponse());

  return app;
};
