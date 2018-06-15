const { Router } = require('express');
const getEstablishment = require('../../common/middleware/get-establishment');
const getPlace = require('../middleware/get-place');

module.exports = () => {
  const app = Router();

  app.get('/', getEstablishment());
  app.get('/', getPlace({ parseItem: item => ({ ...item, nacwo: item.nacwo && item.nacwo.profile.name }) }));

  return app;
};
