const { Router } = require('express');
const routes = require('./routes');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.use('/', (req, res, next) => {
    const query = {
      startDate: req.financialYear.startDate,
      endDate: req.financialYear.endDate
    };
    Promise.all([
      req.api(`/establishment/${req.establishmentId}/pils/count`, { query }),
      req.api(`/establishment/${req.establishmentId}/pils/transfers`, { query })
    ])
      .then(([numPils, numTransfers]) => {
        numPils = parseInt(numPils.json.data, 10);
        numTransfers = parseInt(numTransfers.json.data, 10);

        const { startDate, endDate, prices } = req.financialYear;
        const personal = prices.personal * (numPils + numTransfers);
        const establishment = prices.establishment;
        const fees = {
          numPils,
          numTransfers,
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
