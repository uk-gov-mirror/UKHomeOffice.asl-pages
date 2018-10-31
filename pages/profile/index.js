const { reduce, isUndefined } = require('lodash');
const { Router } = require('express');
const { schema } = require('./list/schema');
const { cleanModel } = require('../../lib/utils');
const { permissions } = require('../../lib/middleware');

const list = require('./list');
const read = require('./read');
const invite = require('./invite');

module.exports = () => {
  const app = Router({ mergeParams: true });

  app.param('profileId', (req, res, next, profileId) => {
    if (profileId === 'invite') {
      req.model = reduce(schema, (all, { nullValue }, key) => {
        return { ...all, [key]: isUndefined(nullValue) ? null : nullValue };
      }, {});
      req.model.id = 'new-profile';
      return next('route');
    }
    return req.api(`/establishment/${req.establishmentId}/profile/${profileId}`)
      .then(({ json: { data, meta } }) => {
        const model = cleanModel(data);
        req.model = model;
        req.profile = model;
        req.profileId = profileId;

        res.locals.static.establishment = meta.establishment;
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:profileId', permissions('profile.read.basic'), read());
  app.use('/invite', permissions('profile.invite'), invite());

  app.get('/', list());

  return app;
};
