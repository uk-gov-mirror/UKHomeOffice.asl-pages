const { get } = require('lodash');
const { page } = require('@asl/service/ui');
const { differenceInYears } = require('date-fns');

module.exports = settings => {
  const app = page({
    ...settings,
    root: __dirname
  });

  app.use((req, res, next) => {
    const over18 = req.profile.dob ? differenceInYears(new Date(), new Date(req.profile.dob)) >= 18 : false;

    if (!over18) {
      throw new Error('All licence applicants must be over 18.');
    }

    next();
  });

  app.use((req, res, next) => {
    if (!req.profile.pil || !req.profile.pil.id) {
      return next();
    }
    // allow new application if a revoked PIL is held by another establishment
    if (req.profile.pil.status === 'revoked' && req.profile.pil.establishmentId !== req.establishmentId) {
      return next();
    }
    if (req.pil && req.pil.openTask) {
      return res.redirect(req.buildRoute('task.read', { taskId: req.pil.openTask.id }));
    }
    res.redirect(req.buildRoute('pil.update', { pilId: req.profile.pil.id }));
  });

  app.post('/', (req, res, next) => {
    const { action } = req.query;

    if (action === 'catAF') {
      return Promise.resolve()
        // create empty PIL
        .then(() => req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil`, { method: 'POST' }))
        .then(({ json: { data } }) => {
          // redirect to newly created pil
          const pilId = get(data, 'data.id');
          return res.redirect(req.buildRoute('pil.update', { pilId }));
        })
        .catch(next);
    }
    if (action === 'catE') {
      // legacy TODO
      // eslint-disable-next-line no-warning-comments
      // TODO: cat e
    }

    return next();

  });

  return app;
};
