const { Router } = require('express');
const form = require('../../../common/routers/form');
const { modules: schema } = require('../schema');
const { pick } = require('lodash');
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

  app.post('/', (req, res, next) => {
    const fields = ['certificateNumber', 'accreditingBody', 'passDate', 'modules'];
    const values = pick(req.session.form[req.model.id].values, fields);

    values.modules = values.modules.map(module => ({ module, species: [] }));

    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values)
    };

    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/certificate`, opts)
      .then(() => {
        delete req.session.form[req.model.id];
        return next();
      })
      .catch(next);
  });

  app.post('/', (req, res, next) => {
    return res.redirect(req.buildRoute('pil.update'));
  });

  return app;
};
