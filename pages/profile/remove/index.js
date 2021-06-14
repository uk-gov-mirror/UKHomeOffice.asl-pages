const { page } = require('@asl/service/ui');

module.exports = (settings) => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    const isOwnProfile = req.user.profile.id === req.profileId;
    res.locals.static.content = {
      ...res.locals.static.content,
      ...res.locals.static.content[isOwnProfile ? 'self' : 'otherUser']
    };
    res.locals.static.isOwnProfile = isOwnProfile;
    next();
  });

  app.get('/', (req, res, next) => {
    res.locals.model.drafts = req.profile.projects.filter(project => project.establishmentId === req.establishmentId && project.status === 'inactive');
    next();
  });

  app.post('/', (req, res, next) => {
    const isOwnProfile = req.user.profile.id === req.profileId;
    const opts = {
      method: 'DELETE'
    };

    return req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/permission`, opts)
      .then(() => req.notification({ key: 'removed', establishment: req.establishment }))
      .then(() => res.redirect(req.buildRoute(isOwnProfile ? 'dashboard' : 'profile.list')))
      .catch(next);
  });

  return app;
};
