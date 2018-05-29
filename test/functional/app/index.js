const ui = require('../../../ui');
const withuser = require('./withuser');
const fixtures = require('../fixtures');

const getPages = require('../helpers/pages');

module.exports = () => {
  const app = ui({
    auth: false,
    log: { level: 'silent' }
  });

  app.use((req, res, next) => {
    req.api = fixtures;
    next();
  });

  const pages = getPages();

  Object.keys(pages).forEach(page => {
    console.log(`Mounting ${page}`);
    app.use(`/${page}`, pages[page]);
  });

  return withuser(app);
};
