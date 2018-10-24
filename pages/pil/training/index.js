const page = require('../../../lib/page');
const { certificate, modules, deleteTrainingModule } = require('./routers');

module.exports = settings => {
  const app = page({
    root: __dirname,
    paths: ['/modules'],
    ...settings
  });

  app.param('training', (req, res, next, trainingModuleId) => {
    if (trainingModuleId === 'modules') {
      return next('route');
    }
    req.trainingModuleId = trainingModuleId;
    next();
  });

  app.use('/:training/delete', deleteTrainingModule());

  app.use('/modules', modules());
  app.use('/', certificate());

  return app;
};
