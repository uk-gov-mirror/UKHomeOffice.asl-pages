const { page } = require('@asl/service/ui');
const relatedTasks = require('../../common/middleware/related-tasks');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.locals.static.isOwnProfile = req.user.profile.id === req.profileId;

    return req.user.can('profile.relatedTasks', { id: req.profile.id, establishment: req.establishmentId })
      .then(showRelatedTasks => {
        res.locals.static.showRelatedTasks = showRelatedTasks;
      })
      .then(() => next())
      .catch(next);
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
