const { Router } = require('express');

module.exports = () => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const values = req.version.data || {};
    res.attachment(`${values.title || 'Untitled project'}.ppl`);
    res.end(JSON.stringify(values));
  });

  return app;
};
