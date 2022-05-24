const { page } = require('@asl/service/ui');
const { BadRequestError } = require('@asl/service/errors');
const bodyParser = require('body-parser');
const { getAllChanges } = require('../../project-version/middleware');
const { get } = require('lodash');

const hasEditPermission = (req) => {
  if (req.user.profile.asruUser) {
    return Promise.resolve();
  }
  const params = {
    id: req.projectId,
    licenceHolderId: req.project.licenceHolderId,
    establishment: req.establishmentId
  };

  return req.user.can('project.update', params);
};

const userCanComment = req => {
  const asruUser = req.user.profile.asruUser;
  const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
  if (!task) {
    return Promise.resolve(false);
  }
  return Promise.resolve()
    .then(() => {
      return asruUser ? task.withASRU : (!task.withASRU && hasEditPermission(req));
    });
};

const canComment = () => (req, res, next) => {
  userCanComment(req)
    .then(isCommentable => {
      res.locals.static.isCommentable = isCommentable;
    })
    .then(() => next())
    .catch(next);
};

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    const params = {
      projectId: req.projectId,
      licenceHolderId: req.project.licenceHolderId,
      establishment: req.establishmentId
    };
    Promise.all([
      req.user.can('project.update', params),
      req.user.can('retrospectiveAssessment.submit', params)
    ])
      .then(([canUpdate, canSubmit]) => {
        res.locals.static.canUpdate = canUpdate;
        res.locals.static.canSubmit = canSubmit;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', canComment(), getAllChanges('retrospective-assessments'));

  app.get('/', (req, res, next) => {
    const task = get(req.project, 'openTasks', []).find(task => task.data.action === 'grant-ra');
    const showComments = req.retrospectiveAssessment.status !== 'granted' && !!task;

    let editable = req.retrospectiveAssessment.status === 'draft';
    // check that there's not a task awaiting endorsement
    if (task && task.editable === false) {
      editable = false;
    }
    // check that this is the most recent version
    if (req.project.draftRa && req.retrospectiveAssessment.id !== req.project.draftRa.id) {
      editable = false;
    }

    res.locals.static.isActionable = req.user.profile.asruUser && get(task, 'data.data.raVersion') === req.raId;
    res.locals.static.basename = req.buildRoute('retrospectiveAssessment');
    res.locals.static.projectUrl = req.buildRoute('project.read');
    res.locals.static.establishment = req.project.establishment;
    res.locals.static.project = req.project;
    res.locals.static.grantedVersion = req.version;
    res.locals.static.taskId = task && task.id;
    res.locals.static.showComments = showComments;
    res.locals.static.commentable = showComments && res.locals.static.isCommentable;
    res.locals.static.readonly = !editable || !res.locals.static.canUpdate;

    const params = { versionId: req.version.id };

    res.locals.static.sidebarLinks = {
      nts: req.buildRoute('projectVersion.nts', params),
      granted: req.buildRoute('projectVersion.read', params),
      adverse: `${req.buildRoute('projectVersion.pdf', params)}/protocols`,
      protocols: `${req.buildRoute('projectVersion.read', params)}/protocol-summary`
    };

    res.locals.static.newApplication = req.project.retrospectiveAssessments.length === 1 && req.project.retrospectiveAssessments[0].status === 'draft';

    res.locals.model = req.retrospectiveAssessment;
    next();
  });

  app.put('/', bodyParser.json({ limit: settings.bodySizeLimit }));

  app.put('/', (req, res, next) => {
    if (req.project.draftRa && req.retrospectiveAssessment.id !== req.project.draftRa.id) {
      return next(new BadRequestError());
    }
    next();
  });

  app.put('/', (req, res, next) => {
    const opts = {
      method: 'PUT',
      json: {
        data: {
          patch: req.body
        }
      }
    };
    req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/retrospective-assessment/${req.raId}/patch`, opts)
      .then(({ json: { data, meta } }) => {
        req.retrospectiveAssessment.checksum = meta.checksum;
        req.retrospectiveAssessment.data = data.data;
      })
      .then(() => next())
      .catch(err => {
        // if trying to edit an uneditable version then redirect
        if (err.status === 400) {
          return res.redirect(req.buildRoute('projectVersion.read'));
        }
        next(err);
      });
  });

  app.put('/', (req, res) => {
    res.json({ checksum: req.retrospectiveAssessment.checksum });
  });

  app.use((req, res, next) => res.sendResponse());

  return app;
};
