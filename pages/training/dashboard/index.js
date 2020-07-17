const { page } = require('@asl/service/ui');

module.exports = () => {
  const app = page({ root: __dirname });

  app.get('/', (req, res, next) => {
    const trainingReferrer = req.session['training-referrer'];
    if (trainingReferrer) {
      res.locals.static.referrer = trainingReferrer;
    }
    next();
  });

  app.get('/', (req, res) => res.sendResponse());

  return app;
};
