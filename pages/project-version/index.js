const { Router } = require('express');
const read = require('./read');
const pdf = require('./pdf');

module.exports = settings => {
  const app = Router();

  app.use('/pdf', pdf(settings));
  app.use('/*', read());

  return app;
};
