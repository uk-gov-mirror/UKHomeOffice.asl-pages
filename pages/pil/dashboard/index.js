const page = require('../../../lib/page');
const modulesToCertificates = require('../../../lib/utils/modules-to-certificates');
const bodyParser = require('body-parser');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  const profileOwnsModules = (profile, modules) => {
    const profileModuleIds = profile.trainingModules.map(module => module.id);
    return modules.every(id => profileModuleIds.includes(id));
  };

  app.post('/', bodyParser.urlencoded({ extended: true }), (req, res, next) => {
    if (req.body.action === 'delete' && req.body.modules.length) {
      const profile = res.locals.model;
      const modules = req.body.modules;

      if (!profileOwnsModules(profile, modules)) {
        throw new Error('cannot delete training modules the profile does not own');
      }

      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ modules })
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

    const profile = res.locals.model;
    profile.certificates = modulesToCertificates(profile.trainingModules);

    res.locals.static.profile = profile;
    res.locals.static.pilApplication = {
      id: 'create'
    };
    next();
  });

  app.use('/procedures', require('../procedures')());

  app.use('/exemptions', require('../exemptions')());

  app.use('/modules', require('../modules')());

  app.use('/training', require('../certificate')());

  return app;
};
