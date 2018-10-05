const page = require('../../../lib/page');
const bodyParser = require('body-parser');
const { some, has } = require('lodash');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  const profileOwnsModule = ({ trainingModules, exemptions }, moduleId) => {
    return some(trainingModules.concat(exemptions), ['id', moduleId]);
  };

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action === 'delete' && req.body.trainingModuleId) {
      const profile = res.locals.model;
      const trainingModuleId = req.body.trainingModuleId;

      if (!profileOwnsModule(profile, trainingModuleId)) {
        throw new Error('cannot delete training modules the profile does not own');
      }

      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ id: trainingModuleId })
      };

      return req.api(`/pil/training`, opts)
        .then(() => res.redirect(req.originalUrl))
        .catch(next);
    }
    return res.redirect(req.originalUrl);
  });

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishment);
    res.locals.static.establishment = establishment;
    res.locals.static.profile = res.locals.model;

    res.locals.static.pil = {
      id: 'create',
      // this will change once we have a data model for the procedures
      procedures: has(req, `session.form.${req.model.id}.values.procedures`)
        ? req.session.form[req.model.id].values.procedures
        : []
    };

    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/modules', require('../modules')());

  app.use('/training', require('../certificate')());

  return app;
};
