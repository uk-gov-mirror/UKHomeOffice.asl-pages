const { Router } = require('express');
const { getEstablishment } = require('../../common/middleware');
const { getPlace } = require('../middleware');

module.exports = () => {
  const app = Router();

  app.get('/', getEstablishment());
  app.get('/', getPlace({ parseItem: item => ({ ...item, nacwo: item.nacwo.profile.name }) }));

  return app;
};
