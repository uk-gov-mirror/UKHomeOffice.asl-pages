const { page } = require('@asl/service/ui');
const relatedTasks = require('../../common/middleware/related-tasks');

const isEstablishmentAdmin = (profile, establishmentId) => {
  const currentEstablishment = profile.establishments.find(e => e.id === establishmentId);
  return currentEstablishment && currentEstablishment.role === 'admin';
};

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    const isOwnProfile = req.user.profile.id === req.profileId;
    res.locals.static.isOwnProfile = isOwnProfile;
    res.locals.static.showRelatedTasks = isOwnProfile ||
      isEstablishmentAdmin(req.user.profile, req.establishmentId) ||
      req.user.profile.asruUser;
    next();
  });

  app.get('/', relatedTasks(req => {
    return {
      model: 'profile-touched',
      modelId: req.profileId,
      establishmentId: req.establishmentId
    };
  }));

  return app;
};
