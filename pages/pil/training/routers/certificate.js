const moment = require('moment');
const { Router } = require('express');
const { omit } = require('lodash');
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
    configure: (req, res, next) => {
      req.form.schema = {
        ...schema,
        otherAccreditingBody: {}
      };
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.schema = omit(req.form.schema, 'otherAccreditingBody');
      next();
    },
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
    delete req.session.form[req.model.id].validationErrors;
    return res.redirect(req.buildRoute('pil.update.training.modules'));
  });

  return app;
};
