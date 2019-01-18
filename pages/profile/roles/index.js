const { Router } = require('express');
const apply = require('./apply');
const remove = require('./remove');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use('/apply', apply(settings));
  app.use('/remove', remove(settings));

  return app;
};
