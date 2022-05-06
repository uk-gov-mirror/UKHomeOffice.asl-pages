const { get, pick } = require('lodash');
const { page } = require('@asl/service/ui');
const {
  canComment,
  getAllChanges,
  getProjectEstablishment,
  getPreviousProtocols,
  getPreviousAA
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
    getPreviousProtocols(),
    getPreviousAA()
  );

  app.use((req, res, next) => {
    const task = get(req.project, 'openTasks[0]');
    const showComments = req.version.status !== 'granted' && !!task;

    const previewLink = req.buildRoute('projectVersion.preview');

    if (req.fullApplication) {
      res.locals.static.basename = req.buildRoute('projectVersion.fullApplication');
    } else if (req.isPreview) {
      res.locals.static.basename = previewLink;
    } else {
      res.locals.static.basename = req.buildRoute('projectVersion');
    }

    res.locals.static.projectUrl = req.buildRoute('project.read');
    res.locals.static.establishment = req.project.establishment;
    res.locals.static.isActionable = get(task, 'data.data.version') === req.versionId;
    res.locals.static.showComments = !req.isPreview && showComments;
    res.locals.static.commentable = !req.isPreview && showComments && req.user.profile.asruUser && res.locals.static.isCommentable;

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

    res.locals.static.editConditions = !req.isPreview &&
      req.user.profile.asruUser &&
      task && task.withASRU &&
      req.version.status === 'submitted' &&
      req.project.versions[0].id === req.version.id;

    res.locals.model = req.version;
    res.locals.static.project = req.project;
    res.locals.static.version = req.version.id;

    // granted legacy PPLs are displayed in "read-only" mode
    // there is no "granted view" of legacy licences
    const isGranted = req.isPreview || (req.project.status === 'active' && req.version.status === 'granted' && !req.fullApplication);
    res.locals.static.isGranted = isGranted && req.project.schemaVersion > 0;

    res.locals.static.isPreview = req.isPreview && req.project.status === 'inactive';
    res.locals.static.isDraft = req.project.status === 'inactive';
    res.locals.static.previewLink = previewLink;
    res.locals.static.asruUser = req.user.profile.asruUser;

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
