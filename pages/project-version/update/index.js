const { Router } = require('express');
const { set } = require('lodash');
const update = require('./router');
const endorse = require('./endorse');
const success = require('./success');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.post('/update-training', (req, res, next) => {
    set(req.session, 'training-referrer', {
      target: `${req.buildRoute('projectVersion.update')}/training`,
      label: req.project.title || 'Untitled project'
    });
    res.redirect(req.buildRoute('training.dashboard', { profileId: req.project.licenceHolderId }));
  });
  // if someone ends up on a GET by mistake then rediect them to the training page in projects
  app.get('/update-training', (req, res) => res.redirect(`${req.buildRoute('projectVersion.update')}/training`));

  app.use((req, res, next) => {
    const isAmendment = req.project.status !== 'inactive';
    if (isAmendment) {
      req.breadcrumb('projectVersion.update');
    } else {
      req.breadcrumb('projectVersion.update-draft');
    }
    next();
  });

  app.use('/submit', endorse());
  app.use('/success', success());

  app.use((req, res, next) => {
    // move users to read only route if there is a non-editable open task
    if (req.project.openTasks && req.project.openTasks.length && req.project.openTasks[0].editable === false) {
      return res.redirect(req.buildRoute('projectVersion.read'));
    }
    // move users away from edit route if not viewing a draft
    if (req.version.status !== 'draft') {
      return res.redirect(req.buildRoute('projectVersion.read'));
    }
    // if this is not the latest draft (i.e. this version was returned by admin without endorsing)
    // then redirect to edit view of latest draft
    if (req.project.draft && req.version.id !== req.project.draft.id) {
      return res.redirect(req.buildRoute('projectVersion.update', { versionId: req.project.draft.id }));
    }
    next();
  });

  // we always want to serve the same template and
  // scripts for any sub-routes under /edit
  app.use('/*', update(settings));

  app.use((req, res) => res.sendResponse());

  return app;
};
