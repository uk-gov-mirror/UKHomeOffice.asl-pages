const { Router } = require('express');
const { get } = require('lodash');
const form = require('../../../common/routers/form');
const { species: schema } = require('../schema/');
const { buildModel } = require('../../../../lib/utils');
const sendData = require('../middleware/send-data');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    const modelId = `${req.profileId}-certificate`;
    const savedModel = get(req.session, `form.${modelId}`);
    if (!savedModel) {
      return res.redirect(req.buildRoute('pil.update'));
    }
    req.model = Object.assign({}, savedModel, buildModel(schema));
    req.model.id = modelId;
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', sendData());

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
