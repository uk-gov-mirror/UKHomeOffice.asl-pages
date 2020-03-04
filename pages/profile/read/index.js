const { page } = require('@asl/service/ui');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.locals.static.isOwnProfile = req.user.profile.id === req.profileId;

    if (!process.env.ENABLE_PPL_CONVERSION) {
      res.locals.static.allowedActions = res.locals.static.allowedActions.filter(action => action !== 'project.convertLegacy');
    }

    next();
  });

  return app;
};
