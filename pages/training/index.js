const { Router } = require('express');
const { cleanModel, buildModel } = require('../../lib/utils');
const schema = require('./schema');
const routes = require('./routes');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('certificateId', (req, res, next, certificateId) => {
    if (certificateId === 'create') {
      req.certificateId = 'create';
      req.model = {
        id: 'new-certificate',
        ...buildModel(schema)
      };
      return next();
    }
    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/certificate/${certificateId}`)
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
