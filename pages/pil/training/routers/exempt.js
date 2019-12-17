const { Router } = require('express');
const { set } = require('lodash');
const form = require('../../../common/routers/form');
const { buildModel } = require('../../../../lib/utils');
const { exempt: schema } = require('../schema');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = buildModel(schema);
    req.model.id = `${req.profileId}-skipTraining`;
    next();
  });

  app.use('/', form({ schema }));

  app.get('/', (req, res, next) => {
    if (req.profile.certificates.length) {
      return res.redirect(req.buildRoute('pil.update.training.certificate'));
    }
    next();
  });

  app.post('/', (req, res, next) => {
    delete req.session.form[req.model.id].validationErrors;
    if (req.form.values.exempt === 'Yes') {
      set(req.session, `${req.profileId}.skipTraining`, false);
      return res.redirect(req.buildRoute('pil.update.training.certificate'));
    } else {
      set(req.session, `${req.profileId}.skipTraining`, true);
      return res.redirect(req.buildRoute('pil.update'));
    }
  });

  return app;
};
