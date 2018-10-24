const { get } = require('lodash');
const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

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
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}`, { method: 'PUT' })
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/training', require('../training')());

  return app;
};
