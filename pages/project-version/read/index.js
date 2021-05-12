const { get, pick } = require('lodash');
const { page } = require('@asl/service/ui');
const {
  canComment,
  getAllChanges,
  getProjectEstablishment,
  getPreviousProtocols
} = require('../middleware');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use(
    canComment(),
    getAllChanges(),
    getProjectEstablishment(),
    getPreviousProtocols()
  );

  app.use((req, res, next) => {
    const task = get(req.project, 'openTasks[0]');
    const showComments = req.version.status !== 'granted' && !!task;

    res.locals.static.basename = req.fullApplication ? req.buildRoute('projectVersion.fullApplication') : req.buildRoute('projectVersion');
    res.locals.static.projectUrl = req.buildRoute('project.read');
    res.locals.static.establishment = req.project.establishment;
    res.locals.static.isActionable = get(task, 'data.data.version') === req.versionId;
    res.locals.static.user = req.user.profile;
    res.locals.static.showComments = showComments;
    res.locals.static.commentable = showComments && req.user.profile.asruUser && res.locals.static.isCommentable;

    const taskId = task ? task.id : null;

    if (taskId) {
      res.locals.static.taskLink = req.buildRoute('task.read', { taskId });
    }

    if (req.project.establishmentId !== req.establishmentId) {
      res.locals.static.additionalAvailability = (req.project.additionalEstablishments || []).find(e => e.id === req.establishmentId);
    }

    res.locals.static.showConditions = req.user.profile.asruUser
      ? req.version.status !== 'draft'
      : req.version.status === 'granted';

    res.locals.static.editConditions = req.user.profile.asruUser &&
      task && task.withASRU &&
      req.version.status === 'submitted' &&
      req.project.versions[0].id === req.version.id;

    res.locals.model = req.version;
    res.locals.static.project = req.project;
    res.locals.static.version = req.version.id;

    // granted legacy PPLs are displayed in "read-only" mode
    // there is no "granted view" of legacy licences
    const isGranted = req.project.status === 'active' && req.version.status === 'granted' && !req.fullApplication;
    res.locals.static.isGranted = isGranted && req.project.schemaVersion > 0;
    res.locals.static.legacyGranted = isGranted && req.project.schemaVersion === 0;
    if (task && task.data.action === 'transfer') {
      const establishments = task.data.meta.establishment;
      res.locals.static.establishments = [
        pick(establishments.to, 'id', 'name'),
        pick(establishments.from, 'id', 'name')
      ];
    }
    next();
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
