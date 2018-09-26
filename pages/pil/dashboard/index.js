const page = require('../../../lib/page');
const modulesToCertificates = require('../../../lib/utils/modules-to-certificates');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use('/', (req, res, next) => {
    const establishment = req.user.profile.establishments.find(e => e.id === req.establishment);
    res.locals.static.establishment = establishment;

    const profile = res.locals.model;
    profile.certificates = modulesToCertificates(profile.trainingModules);

    console.log(profile.trainingModules);

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
