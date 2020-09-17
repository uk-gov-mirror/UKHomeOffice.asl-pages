const { page } = require('@asl/service/ui');
const { relatedTasks } = require('../common/routers');
const { omit } = require('lodash');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    req.breadcrumb('profile.read');

    if (req.profileId === req.user.profile.id) {
      res.locals.model = req.user.profile;
      res.locals.static.profile = req.user.profile;
      res.locals.static.isOwnProfile = true;
      return next();
    }

    return req.api(`/asru-profile/${req.profileId}`)
      .then(({ json: { data } }) => {
        res.locals.model = omit(data, 'dob');
        res.locals.pageTitle = `${data.firstName} ${data.lastName}`;
      })
      .then(() => next())
      .catch(next);
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'profile-touched',
      modelId: req.profileId
    };
  }));

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
