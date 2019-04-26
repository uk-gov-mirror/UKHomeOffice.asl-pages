const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { canComment } = require('../middleware');
const { getPreviousVersion, getVersionChanges } = require('../middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(canComment());

  app.use((req, res, next) => {
    const establishment = req.establishment;
    const task = get(req.project, 'openTasks[0]');
    const showComments = req.version.status !== 'granted' && !!task;

    res.locals.static.taskId = task ? task.id : null;
    res.locals.static.basename = req.buildRoute('project.version.read');
    res.locals.static.establishments = req.user.profile.establishments.filter(e => e.id !== establishment.id);
    res.locals.static.establishment = establishment;
    res.locals.static.isActionable = req.user.profile.asruUser && get(task, 'data.data.version') === req.versionId;
    res.locals.static.user = req.user.profile;
    res.locals.static.showComments = showComments;
    res.locals.static.commentable = showComments && req.user.profile.asruUser && res.locals.static.isCommentable;
    res.locals.model = req.version;
    next();
  });

  app.use(getPreviousVersion(), getVersionChanges());

  return app;
};
