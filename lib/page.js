const { createStore } = require('redux');
const api = require('./middleware/api');
const path = require('path');
const express = require('express');
const pdfRenderer = require('@asl/pdf-renderer');
const expressViews = require('express-react-views');
const sendResponse = require('./send-response');
const errorHandler = require('./error-handler');
const persistQuery = require('./middleware/persist-query');
const generateCsv = require('./middleware/csv');
const generatePdf = require('./middleware/pdf');
const formatBreadcrumbs = require('./middleware/breadcrumbs');
const { setUrl } = require('./actions');

module.exports = ({
  name,
  views,
  apiPath,
  crumbs,
  rootReducer,
  pdf,
  csv,
  root
}) => {
  const app = express();

  app.set('views', path.resolve(root, './views'));
  app.set('view engine', 'jsx');
  app.engine('jsx', expressViews.createEngine({
    transformViews: false
  }));

  app.use('/assets', express.static(path.resolve(root, './dist')));

  app.page = express.Router();

  app.use((req, res, next) => {
    res.store = createStore(rootReducer);
    res.locals.store = res.store;
    next();
  });

  app.use((req, res, next) => {
    res.store.dispatch(setUrl(req.originalUrl));
    next();
  });

  app.use(api(apiPath));
  app.use(app.page);

  app.use(formatBreadcrumbs(crumbs));

  app.use(persistQuery());

  app.get('/', (req, res, next) => {
    res.template = 'index';
    next();
  });

  csv && app.use(generateCsv());
  if (pdf) {
    app.use(pdfRenderer(pdf));
    app.use(generatePdf());
  }

  app.use(sendResponse());
  app.use(errorHandler())

  return app;
};
