const { page } = require('@asl/service/ui');
const { get } = require('lodash');
const confirm = require('./routers/confirm');
const success = require('../../success');
const update = require('./routers/update');
const endorse = require('./routers/endorse');

module.exports = () => {
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
      .then(() => next())
      .catch(next);
  });

  app.use('/', update());
  app.use('/confirm', confirm());
  app.use('/endorse', endorse());
  app.use('/success', success());

  return app;
};
