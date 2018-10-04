const { Router } = require('express');
const { buildModel } = require('../../lib/utils');
const certificateSchema = require('./certificate/schema');
const moduleSchema = require('./modules/schema');
const proceduresSchema = require('./procedures/schema');

module.exports = () => {
  const app = Router();

  app.param('pil', (req, res, next, pil) => {
    if (pil === 'create') {
      req.model = buildModel(certificateSchema, moduleSchema, proceduresSchema);
      req.model.id = 'new-training';
      return next();
    }
  });

  app.use('/:pil', require('./dashboard')());

  app.get('/', require('./categories')());

  return app;
};
