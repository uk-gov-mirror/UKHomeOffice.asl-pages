const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { canComment } = require('../middleware');
const { getAllChanges } = require('../middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(canComment());
  app.use(getAllChanges());

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
    res.locals.static.showConditions = req.user.profile.asruUser
      ? req.version.status !== 'draft'
      : req.version.status === 'granted';
    res.locals.static.editConditions = req.user.profile.asruUser && req.version.status === 'submitted';
    res.locals.model = req.version;
    res.locals.static.project = req.project;
    res.locals.static.isGrantedVersion = req.project.granted ? req.version.id === req.project.granted.id : false;
    next();
  });

  return app;
};
