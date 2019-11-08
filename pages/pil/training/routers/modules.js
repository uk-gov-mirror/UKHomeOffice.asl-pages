const { Router } = require('express');
const form = require('../../../common/routers/form');
const { modules: schema } = require('../schema');
const { buildModel } = require('../../../../lib/utils');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    const modelId = `${req.profileId}-certificate`;
    req.model = Object.assign({}, req.session.form[modelId], buildModel(schema));
    req.model.id = modelId;
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res) => {
    res.redirect(req.buildRoute('pil.training.species'));
  });

  return app;
};
