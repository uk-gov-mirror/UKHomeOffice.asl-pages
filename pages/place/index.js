const { Router } = require('express');
const { cleanModel } = require('../../lib/utils');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('placeId', (req, res, next, placeId) => {
    const params = req.path.match(/delete\/success$/)
      ? { query: { withDeleted: true } }
      : {};
    return req.api(`/establishment/${req.establishmentId}/place/${placeId}`, params)
      .then(({ json: { data, meta } }) => {
        req.placeId = placeId;
        res.locals.static.establishment = meta.establishment;
        req.model = cleanModel(data);
        req.model.openTasks = meta.openTasks || [];
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
