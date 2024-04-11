const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const confirm = require('./routers/confirm');
const success = require('../../success');
const update = require('./routers/update');
const endorse = require('./routers/endorse');

module.exports = (settings) => {
  const app = page({
    root: __dirname,
    paths: ['/confirm', '/success', '/endorse']
  });

  app.use((req, res, next) => {
    req.model = req.project;
    next();
  });

  app.use((req, res, next) => {
    const licenceHolderId = get(req.session, `form[${req.model.id}].values.licenceHolderId`);
    if (!licenceHolderId) {
      return next();
    }
    req.api(`/establishment/${req.establishmentId}/profiles/${licenceHolderId}`)
      .then(({ json: { data } }) => {
        req.proposedLicenceHolder = data;
      })
      .catch(err => {
        // if profile returns 404 it is likely a collaborator
        if (err.status === 404) {
          const recipient = req.project.collaborators.find(collab => collab.id === licenceHolderId);
          if (recipient) {
            req.proposedLicenceHolder = recipient;
            return;
          }
        }
        throw err;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/', update(settings));
  app.use('/confirm', confirm(settings));
  app.use('/endorse', endorse(settings));
  app.use('/success', success(settings));

  return app;
};
