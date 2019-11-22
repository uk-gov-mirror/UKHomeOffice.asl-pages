const { Router } = require('express');
const update = require('../../update');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use('/', update());

  return app;
};
