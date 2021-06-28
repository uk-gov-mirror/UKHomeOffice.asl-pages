const { Router } = require('express');
const { get, omit, pick } = require('lodash');
const routes = require('./routes');
const { hasNhps, hasGeneticallyAltered, hasReUse, hasOtherSpecies } = require('./helpers');

module.exports = () => {
  const app = Router();

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
    res.locals.static.hasGeneticallyAltered = hasGeneticallyAltered(req);
    res.locals.static.hasEndangeredSpecies = get(req.project, 'granted.data.endangered-animals', false);
    res.locals.static.hasReUse = hasReUse(req);
    res.locals.static.species = get(req.project, 'granted.data.species', []);
    res.locals.static.hasOtherSpecies = hasOtherSpecies(req);
    next();
  });

  app.use((req, res, next) => {
    req.model = req.rop;
    // remove full project data from payload sent to the client
    req.model.project = omit(req.model.project, 'granted');
    res.locals.static.year = `${(new Date()).getFullYear()}`;
    res.locals.static.project = pick(req.model.project, 'title');
    res.locals.model = req.model;
    next();
  });

  return app;
};

module.exports.routes = routes;
