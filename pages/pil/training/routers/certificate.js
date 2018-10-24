const moment = require('moment');
const { Router } = require('express');
const form = require('../../../common/routers/form');
const { certificate: schema } = require('../schema');
const { buildModel } = require('../../../../lib/utils');

module.exports = settings => {
  const app = Router();

  app.use((req, res, next) => {
    req.model = buildModel(schema);
    req.model.id = `${req.profileId}-certificate`;
    next();
  });

  app.use('/', form({
    schema,
    process: (req, res, next) => {
      const day = req.body['passDate-day'];
      const month = req.body['passDate-month'];
      const year = req.body['passDate-year'];

      Object.assign(req.form.values, {
        passDate: `${year}-${month}-${day}`
      });
      next();
    },
    saveValues: (req, res, next) => {
      req.session.form[req.model.id].values.passDate = moment(req.form.values.passDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    const {
      establishmentId,
      profileId,
      id
    } = req.profile.pil;

    return res.redirect(req.buildRoute('pil.trainingModules', {establishment: establishmentId, profile: profileId, pil: id}));
  });

  return app;
};
