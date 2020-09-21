const { Router } = require('express');
const routes = require('./routes');
const content = require('./content');

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.param('year', (req, res, next, year) => {
    req.year = year;
    res.locals.static.year = year;
    next();
  });

  app.use((req, res, next) => {
    res.locals.pageTitle = `${content.fees.title} - ${req.establishment.name}`;
    next();
  });

  app.get('/', (req, res, next) => {
    Promise.resolve()
      .then(() => req.api(`/establishment/${req.establishmentId}/billing`))
      .then(response => {
        const year = response.json.meta.year;
        res.redirect(req.buildRoute('establishment.fees.overview', { year }));
      })
      .catch(next);
  });

  app.use('/:year', (req, res, next) => {
    // skip this request if it's an XHR request for table data
    if (req.get('accept') === 'application/json') {
      return next();
    }
    const query = { year: req.year };
    Promise.resolve()
      .then(() => req.api(`/establishment/${req.establishmentId}/billing`, { query }))
      .then(response => {
        const years = response.json.meta.years;
        const startDate = response.json.meta.startDate;
        const endDate = response.json.meta.endDate;
        const numPils = response.json.data.numberOfPils;
        const fees = response.json.data.fees;
        const personal = response.json.data.pils;
        const establishment = response.json.data.pel;
        const total = response.json.data.total;

        res.locals.static.fees = {
          years,
          numPils,
          fees,
          establishment,
          personal,
          total,
          startDate,
          endDate
        };
      })
      .then(() => next())
      .catch(next);
  });

  return app;
};

module.exports.routes = routes;
