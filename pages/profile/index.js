const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { schema } = require('./list/schema');
const { cleanModel } = require('../../lib/utils');

const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('profileId', (req, res, next, profileId) => {
    if (profileId === 'invitations') {
      return next('route');
    }
    if (profileId === 'invite') {
      req.model = reduce(schema, (all, { nullValue }, key) => {
        return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
      }, {});
      req.profile = req.model;
      req.model.id = 'new-profile';
      return next('route');
    }

    return req.api(`/establishment/${req.establishmentId}/profile/${profileId}`)
      .then(({ json: { data, meta } }) => {
        const model = cleanModel(data);
        model.openTasks = meta.openTasks;
        req.model = model;
        req.profile = model;
        req.profileId = profileId;

        res.locals.static.establishment = meta.establishment;
        res.locals.static.profile = req.profile;
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
