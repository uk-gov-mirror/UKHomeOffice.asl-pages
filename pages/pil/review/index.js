const page = require('../../../lib/page');
const form = require('../../common/routers/form');
const schema = require('./schema');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.task = {};
    next();
  });

  app.use(form({
    schema,
    validate: (req, res, next) => {
      next();
    },
    locals: (req, res, next) => {
      res.locals.static.pil = req.pil;
      res.locals.static.establishment = req.establishment;
      res.locals.static.profile = req.profile;
      res.locals.static.task = req.task;
      next();
    }
  }));

  app.post('/', (req, res, next) => {
    return req.api(
      `/establishment/${req.establishmentId}/profiles/${req.profileId}/pil/${req.pilId}/endorse`,
      { method: 'PUT' }
    )
      .then(() => res.redirect(req.originalUrl + '/success'))
      .catch(next);
  });

  return app;
};
