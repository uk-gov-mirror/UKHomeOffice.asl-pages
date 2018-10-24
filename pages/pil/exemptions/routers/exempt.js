const { Router } = require('express');
const { set } = require('lodash');
const form = require('../../../common/routers/form');
const { buildModel } = require('../../../../lib/utils');
const { exempt: schema } = require('../schema');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = buildModel(schema);
    req.model.id = `${req.profileId}-skipExemptions`;
    next();
  });

  app.use('/', form({ schema }));

  app.post('/', (req, res, next) => {
    if (req.form.values.exempt === 'Yes') {
      set(req.session, `${req.profileId}.skipExemptions`, false);
      return res.redirect(req.originalUrl.concat('/modules'));
    } else {
      set(req.session, `${req.profileId}.skipExemptions`, true);
      return res.redirect(req.originalUrl.replace(/\/exemptions/, ''));
    }
  });

  return app;
};
