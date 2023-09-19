const { Router } = require('express');
const bodyParser = require('body-parser');
const { UnauthorisedError } = require('@asl/service/errors');
const { form } = require('../../../common/routers');
const schema = require('../../schema/upload-hba');
const FormData = require('form-data');
const { default: axios } = require('axios');
const { getActionAdjustedWording } = require('../views/adjusted-wording');

module.exports = (config) => {
  const app = Router({ mergeParams: true });

  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/', (req, res, next) => {
    if (req.task.data.meta.hbaToken) {
      return res.redirect(
        req.buildRoute('task.read', { suffix: 'confirm-hba' })
      );
    }
    next();
  });

  app.use((req, res, next) => {
    if (!req.user.profile.asruUser) {
      return next(
        new UnauthorisedError(
          'Only ASRU users can upload harm benefit analysis file'
        )
      );
    }
    next();
  });

  app.use(
    form({
      schema,
      locals(req, res, next) {
        res.locals.static.establishment = req.establishment;
        res.locals.static.task = req.task;
        req.form.values.action = getActionAdjustedWording(req.task.data.action, req.task.type);
        next();
      },
      process: async (req, res, next) => {
        const file = req.files?.upload?.[0];
        if (!file) {
          return next();
        }
        const formData = new FormData();

        // File parsed by multer from incoming request
        formData.append('file', file.buffer, file.originalname);

        try {
          const { data } = await axios.post(config.attachments, formData, {
            headers: { ...formData.getHeaders() }
          });
          req.form.values.hbaToken = data.token;
          req.form.values.hbaFilename = file.originalname;
          next();
        } catch (error) {
          return next(error);
        }
      }
    })
  );

  app.post('/', (req, res) => {
    res.redirect(req.buildRoute('task.read', { suffix: 'confirm-hba' }));
  });

  return app;
};
