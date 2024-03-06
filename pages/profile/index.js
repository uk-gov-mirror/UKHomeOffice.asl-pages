const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { differenceInYears } = require('date-fns');
const { schema } = require('./list/schema');
const { cleanModel } = require('../../lib/utils');
const { validateUuidParam } = require('../common/middleware');

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
    next();
  });

  app.param('profileId', validateUuidParam());
  app.param('profileId', (req, res, next, profileId) => {
    return req.api(`/establishment/${req.establishmentId}/profile/${profileId}`)
      .then(({ json: { data, meta } }) => {
        const model = cleanModel(data);
        model.openTasks = meta.openTasks;
        model.over18 = model.dob && differenceInYears(new Date(), new Date(model.dob)) >= 18;
        req.model = model;
        req.profile = model;
        req.profileId = profileId;

        res.locals.pageTitle = `${req.profile.firstName} ${req.profile.lastName} - ${req.establishment.name}`;
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
