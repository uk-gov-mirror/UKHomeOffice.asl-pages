const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { relatedTasks } = require('../../common/routers');
const loadPermissions = require('../../common/middleware/load-permissions');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.get('/', (req, res, next) => {
    res.locals.static.isOwnProfile = req.user.profile.id === req.profileId;
    next();
  });

  app.get('/', loadPermissions('training.read', 'training.update'));

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/profile/${req.profileId}/pil`)
      .then(response => {
        const openTask = get(response, 'json.meta.openTasks[0]');
        req.pil = response.json.data;
        if (req.pil) {
          req.pil.openTask = openTask;
          res.locals.static.openTask = openTask;
        }
        res.locals.static.profile.pil = req.pil;
        next();
      })
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
