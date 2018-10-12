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
        const model = cleanModel(data);
        model.exemptions = model.trainingModules.filter(m => { return m.exemption; });
        model.trainingModules = model.trainingModules.filter(m => { return !m.exemption; });
        req.model = model;

        // todo: save profile object to req.profile and replace uses of req.profile with req.profile.id
        req.profileData = model;

        res.locals.static.establishment = meta.establishment;
        res.locals.model = req.model;
      })
      .then(() => next())
      .catch(next);
  });

  app.use('/:profile', permissions('profile.read.basic'), read());
  app.use('/invite', permissions('profile.invite'), invite());

  app.get('/', list());

  return app;
};
