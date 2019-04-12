const { Router } = require('express');
const read = require('./read');
const pdf = require('./pdf');
const { getVersion } = require('./middleware');

module.exports = settings => {
  const app = Router();

  app.use(getVersion());

  app.use('/pdf', pdf(settings));
  app.use('/*', read());

  return app;
};
