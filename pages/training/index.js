const { Router } = require('express');
const { cleanModel, buildModel } = require('../../lib/utils');
const schema = require('./schema');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.use((req, res, next) => {
    res.locals.static.basePage = req.establishmentId ? 'training' : 'ownTraining';
    res.locals.pageTitle = `Training - ${req.profile.firstName} ${req.profile.lastName}`;
    next();
  });

  app.param('certificateId', (req, res, next, certificateId) => {
    if (certificateId === 'create') {
      req.certificateId = 'create';
      req.model = {
        id: 'new-certificate',
        ...buildModel(schema)
      };
      return next();
    }

    const apiPrefix = req.establishmentId
      ? `/establishment/${req.establishmentId}/profile/${req.profileId}`
      : '/me';
    return req.api(`${apiPrefix}/certificate/${certificateId}`)
      .then(({ json: { data, meta } }) => {
        req.certificateId = certificateId;
        req.model = cleanModel(data);
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
