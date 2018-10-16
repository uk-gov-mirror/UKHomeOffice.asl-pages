const page = require('../../../lib/page');
const bodyParser = require('body-parser');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname,
    paths: ['/success']
  });

  const profileOwnsModule = ({ trainingModules, exemptions }, moduleId) => {
    return [ ...trainingModules, ...exemptions ].some(m => m.id === moduleId);
  };

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action === 'submit-pil-application') {
      return res.redirect(req.originalUrl + '/success');
    }

    if (req.body.action === 'delete' && req.body.trainingModuleId) {
      const profile = res.locals.model;
      const trainingModuleId = req.body.trainingModuleId;

      if (!profileOwnsModule(profile, trainingModuleId)) {
        throw new Error('cannot delete training modules the profile does not own');
      }

      const opts = {
        method: 'DELETE'
      };

      return req.api(`/establishment/${req.establishment}/profiles/${req.profile}/training/${trainingModuleId}`, opts)
        .then(() => res.redirect(req.originalUrl))
        .catch(next);
    }
    return res.redirect(req.originalUrl);
  });

  app.use('/', (req, res, next) => {
    req.model.procedures = req.model.procedures || [];
    res.locals.model = req.model;
    res.locals.static.pil = req.model;
    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/training', require('../certificate')());

  return app;
};
