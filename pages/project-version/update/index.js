const { Router } = require('express');
const update = require('./router');
const submit = require('./submit');
const success = require('./success');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    const isAmendment = req.project.status !== 'inactive';
    if (isAmendment) {
      req.breadcrumb('projectVersion.update');
    } else {
      req.breadcrumb('projectVersion.update-draft');
    }
    next();
  });

  app.use('/submit', submit());
  app.use('/success', success());

  app.use((req, res, next) => {
    //move users away from edit route if not viewing a draft
    if (req.version.status !== 'draft') {
      return res.redirect(req.buildRoute('projectVersion.read'));
    }
    next();
  });

  // we always want to serve the same template and
  // scripts for any sub-routes under /edit
  app.use('/*', update());

  app.use((req, res) => res.sendResponse());

  return app;
};
