const { Router } = require('express');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
