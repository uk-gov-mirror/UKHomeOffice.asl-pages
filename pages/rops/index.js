const { Router } = require('express');
const { get, omit } = require('lodash');
const routes = require('./routes');
const {
  hasNhps,
  hasGeneticallyAltered,
  hasReUse,
  hasOtherSpecies,
  getSpecies,
  schedule2Applicable
} = require('./helpers');

module.exports = () => {
  const app = Router();

  app.use((req, res, next) => {
    req.breadcrumb('rops');
    next();
  });

  app.use((req, res, next) => {
    req.api(`/establishment/${req.establishmentId}/project/${req.projectId}/rops/${req.ropId}`)
      .then(({ json: { data, meta } }) => {
        req.rop = data;
        req.project = req.rop.project;
        req.version = req.rop.project.granted;
        req.establishment = meta.establishment;
      })
      .then(() => next())
      .catch(next);
  });

  app.use((req, res, next) => {
    res.locals.static.hasNhps = hasNhps(req);
    res.locals.static.schedule2Applicable = schedule2Applicable(req);
    res.locals.static.hasGeneticallyAltered = hasGeneticallyAltered(req);
    res.locals.static.hasEndangeredSpecies = get(req.project, 'granted.data.endangered-animals', false);
    res.locals.static.hasNMBAs = get(req.project, 'granted.data.nmbas-used', false);
    res.locals.static.hasReUse = hasReUse(req);
    res.locals.static.projectSpecies = get(req.project, 'granted.data.species', []);
    res.locals.static.species = getSpecies(req);
    res.locals.static.hasOtherSpecies = hasOtherSpecies(req);
    next();
  });

  app.use((req, res, next) => {
    req.model = req.rop;
    res.locals.static.year = req.rop.year;
    res.locals.static.lastYear = req.rop.year - 1;
    res.locals.static.project = omit(req.project, 'granted');
    res.locals.model = {
      ...req.model,
      project: omit(req.model.project, 'granted') // remove full project data from payload sent to the client
    };
    next();
  });

  return app;
};

module.exports.routes = routes;
