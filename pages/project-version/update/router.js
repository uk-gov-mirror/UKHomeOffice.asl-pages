const { page } = require('@asl/service/ui');
const bodyParser = require('body-parser');
const { get } = require('lodash');
const {
  getVersion,
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

  app.get('/',
    canComment(),
    getAllChanges(),
    getProjectEstablishment(),
    getPreviousProtocols()
  );

  app.get('/', (req, res, next) => {
    Promise.all([
      req.user.can('project.update', req.params),
      req.user.can('project.transfer', req.params)
    ])
      .then(([canUpdate, canTransfer]) => {
        res.locals.static.canUpdate = canUpdate;
        res.locals.static.canTransfer = canTransfer;
        res.locals.static.transferInProgress = get(req.project, 'openTasks[0].data.action') === 'transfer';
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', (req, res, next) => {
    const isAmendment = req.project.status !== 'inactive';
    const openTask = get(req.project, 'openTasks[0]');
    const showComments = req.version.status !== 'granted' && !!openTask;
    const previousVersion = req.project.versions[1];

    // can only update asru version if asru, and vice versa
    res.locals.static.canUpdate = res.locals.static.canUpdate && req.version.asruVersion === req.user.profile.asruUser;

    res.locals.static.basename = req.buildRoute('projectVersion.update');
    res.locals.static.projectUrl = req.buildRoute('project.read');
    res.locals.static.establishment = req.project.establishment;
    res.locals.static.user = req.user.profile;
    res.locals.static.showComments = showComments;
    res.locals.static.commentable = showComments && res.locals.static.isCommentable;

    res.locals.static.newApplication = !isAmendment && (!previousVersion || previousVersion.status === 'withdrawn');
    res.locals.model = req.version;
    res.locals.static.version = req.version;
    next();
  });

  app.put('/', bodyParser.json({ limit: '5mb' }));

  app.put('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {
          patch: req.body
        }
      }
    };
    req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/project-versions/${req.version.id}/patch`, opts)
      .then(() => next())
      .catch(err => {
        // if trying to edit an uneditable version then redirect
        if (err.status === 400) {
          return res.redirect(req.buildRoute('projectVersion.read'));
        }
        next(err);
      });
  });

  app.put('/', getVersion(), getAllChanges(), (req, res) => {
    res.json({ changes: res.locals.static.changes });
  });

  app.use((req, res, next) => res.sendResponse());

  return app;
};
