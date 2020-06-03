const { page } = require('@asl/service/ui');
const { relatedTasks } = require('../../common/routers');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.locals.static.isOwnProfile = req.user.profile.id === req.profileId;
    next();
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'profile-touched',
      modelId: req.profileId,
      establishmentId: req.establishmentId
    };
  }));

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
