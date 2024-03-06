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
    if (!req.profile.pil) {
      return next();
    }
    // allow new application if a revoked PIL is held by another establishment
    if (req.profile.pil.status === 'revoked' && req.profile.pil.establishmentId !== req.establishmentId) {
      return next();
    }
    res.redirect(req.buildRoute('pil.read', { pilId: req.profile.pil.id }));
  });

  app.post('/', (req, res, next) => {
    const { action } = req.query;

    if (action === 'catAF') {
      return Promise.resolve()
        // create empty PIL
        .then(() => req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}/pil`, { method: 'POST' }))
        // lookup created PIL
        .then(() => req.api(`/establishment/${req.establishmentId}/profiles/${req.profileId}`))
        .then(({ json: { data } }) => {
          return res.redirect(req.buildRoute('pil.update', { pilId: data.pil.id }));
        })
        .catch(next);
    }
    if (action === 'catE') {
      // TODO: cat e
    }

    return next();

  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
