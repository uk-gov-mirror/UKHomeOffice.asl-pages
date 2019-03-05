const { page } = require('@asl/service/ui');
const form = require('../../common/routers/form');
const schema = require('./schema');
const { get } = require('lodash');

const success = require('../../common/routers/success');
const procedures = require('../procedures');
const exemptions = require('../exemptions');
const training = require('../training');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  app.use((req, res, next) => {
    req.model = req.pil;
    next();
  });

  app.use(form({
    schema,
    validate: (req, res, next) => {
      if (!req.model.procedures.length) {
        return next({ validation: { form: 'incomplete' } });
      }
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.profile = req.profile;
      res.locals.static.skipExemptions = get(req.session, [req.profileId, 'skipExemptions'], null);
      res.locals.static.skipTraining = get(req.session, [req.profileId, 'skipTraining'], null);
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return req.api(
      `/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/grant`,
      { method: 'PUT' }
    )
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  app.use('/success', success({ licence: 'pil' }));

  app.use('/procedures', procedures());

  app.use('/exemptions', exemptions());

  app.use('/training', training());

  return app;
};
