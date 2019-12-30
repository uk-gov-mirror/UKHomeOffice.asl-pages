const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    const query = {
      filters: {
        startDate: req.financialYear.startDate,
        endDate: req.financialYear.endDate,
        onlyBillable: true
      }
    };
    req.api(`/establishment/${req.establishmentId}/pils`, { query })
      .then(({ json: { meta } }) => {
        const { count } = meta;
        const { startDate, endDate, prices } = req.financialYear;
        const personal = prices.personal * count;
        const establishment = prices.establishment;
        const fees = {
          numPersonal: count,
          establishment,
          personal,
          personalFee: prices.personal,
          total: establishment + personal,
          startDate,
          endDate
        };
        res.locals.static.fees = fees;
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
