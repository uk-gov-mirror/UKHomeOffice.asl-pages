const { Router } = require('express');
const { pick } = require('lodash');
const form = require('../../../common/routers/form');
const { species: schema } = require('../schema/');
const { buildModel } = require('../../../../lib/utils');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    const modelId = `${req.profileId}-certificate`;
    req.model = Object.assign({}, req.session.form[modelId], buildModel(schema));
    req.model.id = modelId;
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    const fields = [
      'certificateNumber',
      'accreditingBody',
      'otherAccreditingBody',
      'passDate',
      'modules',
      'species'
    ];
    const values = pick(req.session.form[req.model.id].values, fields);

    const opts = {
      method: 'POST',
      json: {
        data: {
          ...values,
          modules: (values.modules || []).map(m => ({ module: m }))
        }
      }
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
