const { page } = require('@asl/service/ui');
const confirm = require('./routers/confirm');
const success = require('../../common/routers/success');
const update = require('./routers/update');

module.exports = () => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success']
  });

  app.use((req, res, next) => {
    req.breadcrumb('project.updateLicenceHolder');
    next();
  });

  app.use((req, res, next) => {
    req.model = req.project;
    next();
  });

  app.use('/', update());
  app.use('/confirm', confirm());
  app.use('/success', (req, res, next) => {
    success({
      licence: 'project',
      status: req.project.status === 'inactive' ? 'licenceHolderUpdated' : null
    })(req, res, next);
  });

  return app;
};
