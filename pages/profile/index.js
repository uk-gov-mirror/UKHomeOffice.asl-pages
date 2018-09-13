const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { schema } = require('./list/schema');
const { cleanModel } = require('../../lib/utils');
const { permissions } = require('../../lib/middleware');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('profile', (req, res, next, profile) => {
    if (profile === 'invite') {
      req.model = reduce(schema, (all, { nullValue }, key) => {
        return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
      }, {});
      req.model.id = 'new-profile';
      return next('route');
    }
    return req.api(`/establishment/${req.establishment}/profile/${profile}`)
      .then(({ json: { data, meta } }) => {
        req.model = cleanModel(data);
        res.locals.static.establishment = meta.establishment;
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:profile', permissions('profile.read.basic'), require('./read')());
  app.use('/invite', permissions('profile.invite'), require('./invite')());

  app.get('/', require('./list')());

  return app;
};
