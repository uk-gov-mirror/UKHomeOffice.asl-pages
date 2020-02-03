const { get } = require('lodash');
const page = require('@asl/service/ui/page');
const success = require('../../../common/routers/success');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    req.model = req.version;
    next();
  });

  app.use((req, res, next) => success({
    licence: 'project',
    status: get(req.project, 'openTasks[0].status', 'with-inspectorate'),
    type: req.project.status === 'active' ? 'amendment' : 'application'
  })(req, res, next));

  app.use((req, res, next) => res.sendResponse());

  return app;
};
