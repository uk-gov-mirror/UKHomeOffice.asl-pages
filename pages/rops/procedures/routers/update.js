const { Router } = require('express');
const { form } = require('../../../common/routers');
const schema = require('../schema');

const defaultMiddleware = (req, res, next) => next();

module.exports = ({
  getValues = defaultMiddleware,
  addMultiple
} = {}) => {
  const app = Router();

  app.use(form({
    configure(req, res, next) {
      req.form.schema = schema(req, addMultiple);
      next();
    },
    getValues
  }));

  return app;
};
