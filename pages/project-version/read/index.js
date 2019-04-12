const { get } = require('lodash');
const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    const establishment = req.establishment;
    const task = get(req.project, 'openTasks[0]');

    res.locals.static.taskId = task ? task.id : null;
    res.locals.static.basename = req.buildRoute('project.version.read');
    res.locals.static.establishments = req.user.profile.establishments.filter(e => e.id !== establishment.id);
    res.locals.static.establishment = establishment;
    res.locals.static.isActionable = req.user.profile.isAsru && get(task, 'data.data.version') === req.versionId;
    res.locals.model = req.version;
    next();
  });

  return app;
};
