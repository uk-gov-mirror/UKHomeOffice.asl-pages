const { Router } = require('express');
const { get, intersection } = require('lodash');
const form = require('../../../common/routers/form');
const { modules: schema } = require('../schema');
const { buildModel } = require('../../../../lib/utils');
const sendData = require('../middleware/send-data');

const { modulesThatRequireSpecies } = require('../../constants');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    const modelId = `${req.profileId}-certificate`;
    req.model = Object.assign({}, req.session.form[modelId], buildModel(schema));
    req.model.id = modelId;
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const modules = get(req.session, `form[${req.profileId}-certificate].values.modules`);
    if (intersection(modules, modulesThatRequireSpecies).length) {
      return res.redirect(req.buildRoute('pil.training.species'));
    }
    return next();
  });

  app.post('/', sendData());

  app.post('/', (req, res) => {
    res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
